# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ADVERBS = %w(とても すごく 大変 感動の 涙が出るほど)
ADJECTIVES = %w(おいしい 旨い ハラショーな 美味な 満足できる)
FOOD = %w(トマト きゅうり にんじん パスタ 生クリーム)
def random_description(food)
  "#{ADVERBS.sample}#{ADJECTIVES.sample}#{food}"
end

Category.destroy_all
Category.create!(
  name: "野菜"
)

Product.destroy_all
120.times do |i|
  food = FOOD.sample
  Product.create!(
    name: "#{food}#{i+1}",
    description: random_description(food),
    price: 50 * (i+1),
    image_path: "/images/products/#{(i%80)+1}.jpg",
    category_id: 1
  )
end

PickupLocation.destroy_all
PickupLocation.create!(name: "WeWork みなとみらい")
%w(
  ドコカラナイス
  エイトテン
).each do |location_name|
  5.times do |i|
    PickupLocation.create!(name: "#{location_name}#{i}")
  end
end

User.destroy_all
User.create!(
  name: "toma-to",
  pickup_location_id: 1,
)
