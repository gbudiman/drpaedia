class Survivors::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    req = request.env['omniauth.auth']

    res = Survivor.handshake(provider: req[:provider],
                             expiration: req[:expires_at],
                             uid: req[:uid],
                             friendly_name: req[:info][:name])

    session['devise.facebook_data'] = req
    session['current_user'] = res

    if res.id == nil
      render json: {
        handshake: 'error'
      }
    else
      render 'survivor/callback_autoclose_loggedin'
    end
  end
end