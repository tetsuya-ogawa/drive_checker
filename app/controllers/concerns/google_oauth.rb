module GoogleOauth
  extend ActiveSupport::Concern

  def login_with_oauth(account)
    GoogleDrive.login_with_oauth(auth_token(account).token)
  end

  private

  def auth_token(account)
    client = OAuth2::Client.new(
        ENV['GOOGLE_CLIENT_ID'],
        ENV['GOOGLE_CLIENT_SECRET'],
        site: 'https://accounts.google.com',
        token_url: '/o/oauth2/token',
        authorize_url: '/o/oauth2/auth'
    )
    OAuth2::AccessToken.from_hash(client, { refresh_token: account.refresh_token, expires_at: 3600 }).refresh!
  end
end