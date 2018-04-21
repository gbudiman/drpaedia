# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'javascripts')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'stylesheets')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( application.css
                                                  application.js
                                                  style.css 
                                                  configbar/configbar.css 
                                                  typeaheadjs.css
                                                  typeahead.bundle.min.js
                                                  generic.js
                                                  js.cookie.js
                                                  filterview/filterview.js 
                                                  velocity.min.js
                                                  configbar/configbar.js 
                                                  dynaloader/dynaloader.js 
                                                  dynaloader/manager.js
                                                  layout/layout.js
                                                  notifier/notifier.js
                                                  notifier/style.css
                                                  skills/calc.js
                                                  skills/dragdrop.js 
                                                  skills/popup.js
                                                  skills/preq.js
                                                  skills/skill_beautifier.js
                                                  skills/skill_interface.js
                                                  skills/skills.js 
                                                  skills/style.css 
                                                  stats/stats_interface.js
                                                  strains/strain_interface.js
                                                  strains/strains.js 
                                                  strains/style.css 
                                                  tooling/tooling.js 
                                                  tooling/style.css
                                                  professions/adv.js
                                                  professions/basic.js
                                                  professions/conc.js
                                                  professions/interface_adv.js
                                                  professions/interface_basic.js
                                                  professions/interface_conc.js 
                                                  professions/style.css
                                                  profile/character_sheet.js
                                                  profile/drop_simulator.js
                                                  profile/profile_interface.js
                                                  profile/profile.js
                                                  profile/remote_interface.js
                                                  profile/remote.js 
                                                  profile/style.css
                                                  bootstrap-select.min.js
                                                  bootstrap-select.min.css
                                                  bootstrap-editable.min.js
                                                  bootstrap-editable.css
                                                  bootstrap-notify.min.js
                                                  jstorage.min.js
                                                  AgentGirl.js
                                                  SParser.js
                                                  printThis.js
                                                  bootstrap-toggle.min.js
                                                  bootstrap-toggle.min.css
                                                  animate.css
                                                  calendar/highcharts.js
                                                  calendar/highcharts-more.js
                                                  calendar/calendar-charting.js
                                                  visual/visual.js
                                                  visual/bootstrap-table.min.js
                                                  visual/bootstrap-table-fixed-columns.js
                                                  visual/bootstrap-table.min.css
                                                  visual/bootstrap-table-fixed-columns.css )
