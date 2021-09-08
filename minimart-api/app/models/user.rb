class User < ApplicationRecord
  belongs_to :pickup_location
  has_many :order
end
