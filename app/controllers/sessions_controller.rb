class SessionsController < ApplicationController
  def callback
    # /auth/google_oauth2 にアクセスして成功したらここに来る
    auth = request.env['omniauth.auth']
    # auth情報を元にユーザをDB登録
    # sessionにユーザIDを保持

    redirect_to root_path
  end

  def destroy
    reset_session
    redirect_to root_path
  end

  def failure
    redirect_to root_path
  end
end
