# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( style.css 
                                                  configbar/configbar.css 
                                                  filterview/*.js 
                                                  calc/*.js
                                                  configbar/*.js 
                                                  dynaloader/*.js 
                                                  notifier/*.js
                                                  notifier/*.css
                                                  skills/*.js skills/*.css 
                                                  stats/*.js
                                                  strains/*.js strains/*.css 
                                                  tooling/*.js tooling/*.css
                                                  professions/*.js professions/*.css 
                                                  profile/*.js profile/*.css
                                                  bootstrap-select.min.*
                                                  bootstrap-editable.*
                                                  bootstrap-notify.*
                                                  jstorage.*
                                                  animate.css)
