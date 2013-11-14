class HomeController < ApplicationController
  layout 'google_map'
  def index
  end

  def bus_way
    HardWorker.perform_async
    render 'contact' if params[:choose_routes_bus].blank? && params[:choose_true_or_false].blank? and return

    set_coordinate_bus_routes = []
    select_routes = params[:choose_routes_bus]
    checked_true_or_false = params[:choose_true_or_false]
    @data_bus_routes = ""
    if checked_true_or_false == true
      @data_bus_routes = File.read(Rails.root.to_s + "/db/data_maps/getAllRoutes/true/GetFullRoute_true#{select_routes.to_i}.txt")
    else
      @data_bus_routes = File.read(Rails.root.to_s + "/db/data_maps/getAllRoutes/false/GetFullRoute_false#{select_routes.to_i}.txt")
    end
    set_coordinate_bus_routes = @data_bus_routes.split(" ")
    respond_to do |format|
      format.json { render :json => set_coordinate_bus_routes }
    end
  end

  def bus_routes
  end
end
