Rails.application.routes.draw do
  get 'user_appearances/index'
  devise_for :users
  get 'home/index'
  root "home#index"

  get "user_appearances", to: "user_appearances#index", as: "user_appearances"
end
