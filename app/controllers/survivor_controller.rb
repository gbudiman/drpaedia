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
end
