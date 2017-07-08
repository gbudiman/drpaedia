class TreeController < ApplicationController
  def index
    if session['current_user'] == nil
      ap 'Session is nil'
      @is_logged_in = false
    else
      ap 'Has session data'
      @is_logged_in = true
    end
  end
end
