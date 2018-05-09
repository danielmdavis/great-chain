Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :books
      resources :shelves
      resources :thinkers
      resources :influences
    end
  end

end
