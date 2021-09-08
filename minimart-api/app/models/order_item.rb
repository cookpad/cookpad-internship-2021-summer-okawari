class OrderItem < ApplicationRecord
  # belongs_to :order
  belongs_to :product

  def amount
    product.price * quantity
  end
end
