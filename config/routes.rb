Rails.application.routes.draw do
  get  '/auth/:provider/callback' => 'sessions#callback'
  post '/auth/:provider/callback'  => 'sessions#callback'
  get  '/auth/failure' => 'sessions#failure'
  get  '/logout' => 'sessions#destroy'
  root 'top#index'
  resources :files, only: %i[index show]
end
