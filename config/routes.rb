Rails.application.routes.draw do
  root 'shelves#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :books
      resources :shelves
      resources :thinkers do
        resources :influences
      end
      resources :influences
    end
  end

  # resources :shelves

  resources :searches


  resources :influences do
   resources :comments
  end

  get "/shelves", to: "shelves#index"
  get "*path", to: 'shelves#index'
end
