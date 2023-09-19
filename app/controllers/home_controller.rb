class HomeController < ApplicationController
  def index
    @welcome_message = (Array.new(20) { Faker::Company.bs }).join(" ")
  end
end
