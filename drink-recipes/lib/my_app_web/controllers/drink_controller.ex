defmodule MyAppWeb.DrinkController do
  use MyAppWeb, :controller

  def index(conn, _params) do
    drinks = File.read!("priv/static/drinks.json") |> Jason.decode!()
    json(conn, drinks)
  end
end
