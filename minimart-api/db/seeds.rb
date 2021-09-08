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
CATEGORIES = %w(野菜 麺類 スイーツ)

def category_map(food_name)
  case food_name
  when "トマト", "きゅうり", "にんじん" then
    return Category.find_by(name: "野菜").id
  when "パスタ" then
    return Category.find_by(name: "麺類").id
  when "生クリーム" then
    return Category.find_by(name: "スイーツ").id
  end
end

def random_description(food)
  "#{ADVERBS.sample}#{ADJECTIVES.sample}#{food}"
end

Category.destroy_all
CATEGORIES.each do |category_name|
  Category.create!(name: category_name)
end

Product.destroy_all
30.times do |i|
  food_name = FOOD.sample
  category_id = category_map(food_name)
  Product.create!(
    name: "#{food_name}#{i+1}",
    description: random_description(food_name),
    price: 50 * (i+1),
    image_path: "/images/products/#{(i%80)+1}.jpg",
    category_id: category_id
  )
end

PickupLocation.destroy_all
first = PickupLocation.create!(name: "WeWork みなとみらい")
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
  pickup_location_id: first.id,
)
