class SessionsController < ApplicationController

  skip_before_action :authenticate, only: :callback

  def callback
    # /auth/google_oauth2 にアクセスして成功したらここに来る
    auth = request.env['omniauth.auth']
    if account = Account.find_by(uid: auth['uid']) rescue nil
      account.update(account_params)
    else
      account = Account.create(account_params)
    end
    create_session(account)
    redirect_to root_path
  end

  def destroy
    destroy_session
    redirect_to root_path
  end

  def failure
    redirect_to root_path
  end

  private

  def account_params
    {}.tap do |me|
      auth = request.env['omniauth.auth']
      me['uid'] = auth['uid']
      me['name'] = auth['info']['name']
      me['image'] = auth['info']['image']
      me['refresh_token'] = auth['credentials']['refresh_token']
    end
  end
end
