GraphqlPlayground::Rails.configure do |config|
  config.headers = {
    'X-User-Name' => ->(view_context) { "toma-to" }
  }
  config.title = "Playground"
  config.csrf = true
  config.playground_version = "latest"
  config.settings = {
    "schema.polling.enable": false
  }
end
