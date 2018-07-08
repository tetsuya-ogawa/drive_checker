class Api::V1::FilesController < ApplicationController
  def index
    render json: { files: DriveFile.limit(20) }
  end
end
