Rails.application.routes.draw do
  devise_for :survivors, controllers: { omniauth_callbacks: 'survivors/omniauth_callbacks' }

  root                                                   to: 'tree#index'
  #get           '/visual',                               to: 'tree#visual'
  get           '/calendar',                             to: 'tree#calendar'
  get           '/calendar/events',                      to: 'tree#fetch_events'
  post          '/sync/upstream',                        to: 'survivor#upstream'
  post          '/sync/force_upstream',                  to: 'survivor#force_upstream'
  get           '/sync/downstream',                      to: 'survivor#downstream'
  get           '/session/destroy',                      to: 'session#destroy'
  get           '/session/current',                      to: 'session#current'
  get           '/survivor/search',                      to: 'survivor#search'
  get           '/profile/shared',                       to: 'survivor#get_shared_profile'
  get           '/profile/list_guests',                  to: 'survivor#list_guest_profiles'
  get           '/profile/fetch',                        to: 'survivor#fetch_profile'
  post          '/survivor/name/edit',                   to: 'survivor#edit_name'
  post          '/profile/share',                        to: 'survivor#share_profile'
  post          '/profile/unshare',                      to: 'survivor#unshare_profile'
  get           '/skills/debug',                         to: 'skill#debug'
  get           '/skills/fetch',                         to: 'skill#fetch'
  #get          '/survivors/auth/facebook/callback',      to: 'session#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
