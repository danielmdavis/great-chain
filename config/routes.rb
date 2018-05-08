Rails.application.routes.draw do
  root "shelves#index"

  devise_for :user

  resources :user
  resources :shelves
  resources :books
  resources :thinkers
  resources :influence
  resources :comments

  get "*path", to: 'shelves#index'
end
