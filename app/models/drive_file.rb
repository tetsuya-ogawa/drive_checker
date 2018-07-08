class DriveFile
  include Mongoid::Document
  include Mongoid::Timestamps

  field :id, type: String
  field :name, type: String
  field :parents, type: Array
  field :owners, type: Array
  field :permissions, type: Array
  field :mime_type, type: String
  field :web_view_link, type: String
  field :capabilities, type: Hash
  field :created_time, type: DateTime
  field :modified_time, type: DateTime
end
