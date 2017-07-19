class SkillController < ApplicationController
  

  def debug
  end

  def fetch
    @@data = JSON.parse(File.read(Rails.root.join('public', 'skill_desc.json')))
    skills = params[:skill_codes]

    if skills == 'all'
      render json: @@data
    else
    end
  end
end
