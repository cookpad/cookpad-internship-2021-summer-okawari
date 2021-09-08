class User < ApplicationRecord
  belongs_to :pickup_location
  has_many :orders
end
