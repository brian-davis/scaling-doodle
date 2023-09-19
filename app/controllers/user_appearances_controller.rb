class UserAppearancesController < ApplicationController
  def index
    @users = User.all
  end
end
