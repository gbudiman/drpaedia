class SurvivorController < ApplicationController
  include SessionHelper
  skip_before_action :verify_authenticity_token

  @@null_profile = {
    config: {
      timestamp: 0
    }
  }

  def upstream
    #profile_data = JSON.parse(params[:profile_data] == 'null' ? '' : params[:profile])
    profile_data = params[:profile_data] == 'null' ? @@null_profile 
                                                   : JSON.parse(params[:profile_data]).deep_symbolize_keys

    if session['current_user'] == nil
      render json: {
        response: 'disconnected'
      }
    else
      response = Survivor.find(session['current_user']['id']).sync(data: profile_data)

      render json: {
        response: response
      }
    end
  end

  def downstream
    render json: {
      response: Survivor.find(session['current_user']['id']).compose_downstream
    }
  end

  def edit_name
    #ap params
    begin 
      Survivor.find(session['current_user']['id']).update(friendly_name: params[:value])
      render json: { success: true, new_value: params[:value] }
    rescue ActiveRecord::RecordNotUnique
      render status: 500, plain: 'That name has been used'
    end
  end

  def search
    render json: Survivor.find(session['current_user']['id']).search(query: params[:q])
  end

  def share_profile
    survivor_id = session['current_user']['id']
    profile_name = params[:profile_name]
    guest_id = params[:guest_id].to_i

    profile = Profile.find_by(survivor_id: survivor_id, name: profile_name)
    multicast = Multicast.find_or_create_by(profile_id: profile.id, survivor_id: guest_id)

    if multicast
      render json: { success: true, id: multicast.id }
    else
      render status: 500, json: { success: false }
    end
  end

  def unshare_profile
    Multicast.find(params[:id].to_i).destroy

    render json: { success: true }
  end

  def get_shared_profile
    render json: Survivor.find(session['current_user']['id']).get_shared_profile
  end

  def list_guest_profiles
    render json: Multicast.list_guest_profiles(guest_id: session['current_user']['id'])
  end

  def fetch_profile
    render json: Profile.find(params[:id].to_i)
  end
end
