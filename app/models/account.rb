class Account
  include Mongoid::Document
  include Mongoid::Timestamps

  field :uid, type: String
  field :name, type: String
  field :image, type: String
  field :refresh_token, type: String
end
