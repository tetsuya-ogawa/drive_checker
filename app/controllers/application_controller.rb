class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate

  include Session

  helper_method :logged_in?, :current_user

  private

  def authenticate
    return if logged_in?
    redirect_to '/auth/google_oauth2'
  end
end
