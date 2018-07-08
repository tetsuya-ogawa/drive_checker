class Api::V1::FilesController < ApplicationController

  include GoogleOauth

  def index
    session = login_with_oauth(current_account)
    render json: { files: session.files.map{ |file| file_to_hash(file) } }
  end

  private

  def file_to_hash(file)
    {}.tap do |me|
      me[:id] = file.id
      me[:name] = file.name
      me[:parents] = file.parents
      me[:owners] = file.owners&.map(&:to_h)
      me[:permissions] = file.permissions&.map(&:to_h)
      me[:mine_type] = file.mime_type
      me[:web_view_link] = file.web_view_link
      me[:capabilities] = file.capabilities.to_h
    end
  end
end
