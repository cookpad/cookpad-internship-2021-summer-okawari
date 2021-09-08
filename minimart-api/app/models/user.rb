class User < ApplicationRecord
  belongs_to :pickup_location
  # belongs_to :pickup_location, class_name: 'PickupLocation', foreign_key: 'pickup_location_id'
end
