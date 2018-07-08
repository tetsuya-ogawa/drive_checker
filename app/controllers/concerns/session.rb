module Session
  extend ActiveSupport::Concern

  def create_session(account)
    session[:uid] = account.uid
  end

  def destroy_session
    session.delete :uid
  end

  def current_account
    @current_account ||= Account.find_by(uid: uid) rescue nil
  end

  def logged_in?
    !current_account.nil?
  end

  private

  def uid
    session[:uid]
  end
end