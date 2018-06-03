Rails.application.routes.draw do
  root 'shelves#index'
  devise_for :users

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :books
      resources :shelves
      resources :influences
      resources :searches, only: [:index]
      get "/searches/search", to: "searches#search"

      resources :thinkers do
        resources :influences
      end
    end
  end

  resources :shelves




  resources :influences do
   resources :comments
  end

  get "/influences", to: "influences#index"
  get "/shelves", to: "shelves#index"
  get "*path", to: 'shelves#index'
end
