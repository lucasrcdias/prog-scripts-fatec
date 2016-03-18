Rails.application.routes.draw do
  resources :subjects
  root to: 'ajax_crud#index'
end
