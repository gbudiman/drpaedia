class SessionController < ApplicationController
  def destroy
    sign_out
    session['current_user'] = nil

    render 'survivor/callback_autoclose_loggedout'
  end

  def current
    current_user = Survivor.find(session['current_user']['id'])
    session['current_user']['friendly_name'] = current_user.friendly_name
    
    render json: {
      signed_in: session['devise.facebook_data'] == nil ? false : true,
      friendly_name: session['current_user']['friendly_name']
    }
  end
end
