Rails.application.routes.draw do
  get  '/auth/:provider/callback' => 'sessions#callback'
  post '/auth/:provider/callback'  => 'sessions#callback'
  get  '/auth/failure' => 'sessions#failure'
  get  '/logout' => 'sessions#destroy'
  root 'top#index'
  resources :files, only: %i[index show]

  namespace :api, { format: :json } do
    namespace :v1 do
      resources :files, only: :index
    end
  end
end
