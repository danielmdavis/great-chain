Rails.application.routes.draw do
  root "shelf#index"

  resources :users
  resources :shelves
  resources :books
  resources :thinkers
  resources :influence
  resources :comments
end
