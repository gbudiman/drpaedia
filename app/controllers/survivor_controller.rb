class SurvivorController < ApplicationController
  include SessionHelper
  skip_before_action :verify_authenticity_token

  @@null_profile = {
    config: {
      timestamp: 0
    }
  }

  def sanitize_profile_data d
    return d == 'null' ? @@null_profile 
                       : JSON.parse(d).deep_symbolize_keys
  end

  def force_upstream
    profile_data = sanitize_profile_data(params[:profile_data])

    response = Survivor.find(session['current_user']['id']).sync(data: profile_data, force_upstream: true)

    render json: {
      response: response
    }
  end

  def upstream
    #profile_data = JSON.parse(params[:profile_data] == 'null' ? '' : params[:profile])
    profile_data = sanitize_profile_data(params[:profile_data])

    fresh_login = params[:fresh_login]

    if session['current_user'] == nil
      render json: {
        response: 'disconnected'
      }
    else
      response = Survivor.find(session['current_user']['id']).compose_downstream

      if fresh_login == 'true'
        response = Survivor.find(session['current_user']['id']).compose_downstream

        render json: {
          response: 'check',
          comparison: response
        }
      elsif fresh_login == 'false'
        response = Survivor.find(session['current_user']['id']).sync(data: profile_data)

        render json: {
          response: response
        }
      end
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
    multicast = Multicast.find_or_initialize_by(profile_id: profile.id, survivor_id: guest_id)

    if multicast.id == nil
      multicast.save

      if multicast.id != nil
        render json: { success: 'created', id: multicast.id }
      else
        render status: 500, json: { success: 'failed' }
      end
    else
      multicast.save
      render json: { success: 'exist', id: multicast.id }
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
