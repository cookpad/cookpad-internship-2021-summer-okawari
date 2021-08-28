Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"

  if Rails.env.development?
    mount GraphqlPlayground::Rails::Engine, at: "/", graphql_path: "/graphql"
  end
end
