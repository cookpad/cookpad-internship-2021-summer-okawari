class Category < ApplicationRecord
  # 今回はproductsをひきたい要望があるのでかく
  has_many :products
end
