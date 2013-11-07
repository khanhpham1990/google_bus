class HomeController < ApplicationController
  layout 'google_map'
  def index
  end

  def bus_way

  end

  def bus_routes
    render layout: 'text_layout'
  end
end
