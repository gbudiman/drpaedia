Rails.application.routes.draw do
  devise_for :survivors, controllers: { omniauth_callbacks: 'survivors/omniauth_callbacks' }

  root                                                   to: 'tree#index'
  post          '/sync/upstream',                        to: 'survivor#upstream'
  get           '/sync/downstream',                      to: 'survivor#downstream'
  get           '/session/destroy',                      to: 'session#destroy'
  get           '/session/current',                      to: 'session#current'
  post          '/survivor/name/edit',                   to: 'survivor#edit_name'
  #get          '/survivors/auth/facebook/callback',      to: 'session#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
