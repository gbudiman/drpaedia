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
    response = Survivor.find(session['current_user']['id']).sync(data: profile_data)

    render json: {
      response: response
    }
  end

  def downstream
    render json: {
      response: Survivor.find(session['current_user']['id']).compose_downstream
    }
  end
end
