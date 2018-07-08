class Api::V1::FilesController < ApplicationController

  include GoogleOauth

  def index
    next_page_token = params[:next_page_token]
    file_list = drive_service(current_account)
                    .list_files(fields: 'next_page_token, files(id, name, owners, permissions, webViewLink, capabilities, mimeType, parents)',
                                page_token: next_page_token,
                                spaces: 'drive')
    render json: { files: file_list.files.map{ |file| file_to_hash(file) }, next_page_token: file_list.next_page_token }
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
