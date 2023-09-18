(1..5).each do |i|
  User.create({
    email: "user#{i}@example.com",
    display_name: Faker::Name.name,
    password: "password",
    password_confirmation: "password"
  })
end
