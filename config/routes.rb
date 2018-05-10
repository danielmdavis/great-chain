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

  resources :influences do
    resources :comments
  end

end
