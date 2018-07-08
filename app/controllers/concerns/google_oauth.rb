require 'google/apis/drive_v3'

module GoogleOauth
  extend ActiveSupport::Concern

  def drive_service(account)
    Google::Apis::DriveV3::DriveService.new.tap do |me|
      me.authorization = authorization(account)
    end
  end

  private

  def authorization(account)
    Google::Auth::UserRefreshCredentials.new(client_id: ENV['GOOGLE_CLIENT_ID'],
                                             client_secret: ENV['GOOGLE_CLIENT_SECRET'],
                                             refresh_token: account.refresh_token,
                                             scope: Google::Apis::DriveV3::AUTH_DRIVE_METADATA_READONLY)
  end
end