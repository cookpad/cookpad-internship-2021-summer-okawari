class PickupLocation < ApplicationRecord
  has_many :orders
end
