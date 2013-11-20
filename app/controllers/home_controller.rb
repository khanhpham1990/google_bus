class HomeController < ApplicationController
  layout 'google_map'
  def index
    return render 'index', layout: 'application'
  end

  def bus_way
    HardWorker.perform_async
    render 'bus_way' if params[:choose_routes_bus].blank? && params[:choose_true_or_false].blank? and return

    select_routes = params[:choose_routes_bus]
    checked_true_or_false = params[:choose_true_or_false]
    choose_method_set_marker = params[:flag]

    if choose_method_set_marker != "true"
      set_coordinate_bus_routes = []
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
    if choose_method_set_marker == "true"
      collect_coordinate_position_map = []
      if checked_true_or_false == true
        @data_coordinate_position = File.read(Rails.root.to_s + "/db/data_maps/getAllBuses/true/GetTuyenBus_true#{select_routes.to_i}.json")
      else
        @data_coordinate_position = File.read(Rails.root.to_s + "/db/data_maps/getAllBuses/false/GetTuyenBus_false#{select_routes.to_i}.json")
      end
      respond_to do |format|
        format.json { render :json => @data_coordinate_position }
      end
    end
  end

  # Action process choose two point start and destination random in google map, after find bus way following the shortest
  def bus_routes
    return render 'bus_routes', layout: 'bus_routes'
  end
end
