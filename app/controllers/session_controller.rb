class SessionController < ApplicationController
  def destroy
    sign_out
    session['current_user'] = nil

    render 'survivor/callback_autoclose_loggedout'
  end

  def current
    render json: {
      signed_in: session['devise.facebook_data'] == nil ? false : true
    }
  end
end
