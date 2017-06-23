class SurvivorController < ApplicationController
  include SessionHelper

  def upstream
    profile_data = JSON.parse params[:profile_data]
    Survivor.find(session['current_user']['id']).sync(data: profile_data)
  end
end
