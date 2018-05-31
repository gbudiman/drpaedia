class TreeController < ApplicationController
  @@version = '0.9.20'

  def index
    @version = @@version
    if session['current_user'] == nil
      ap 'Session is nil'
      @is_logged_in = false
    else
      ap 'Has session data'
      @is_logged_in = true
    end
  end

  def visual
  end

  def calendar
  end

  def fetch_events
    render json: Game.fetch_all
  end

  def privacy
    @version = @@version
  end
end
