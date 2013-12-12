class HomeController < ApplicationController
  include HomeHelper
  layout 'google_map'
  def index
    return render 'index', layout: 'application'
  end

  def bus_way
    # HardWorker.perform_async
    # HardWorker.perform_at(12.weeks.from_now)
    render 'bus_way' if params[:choose_routes_bus].blank? && params[:choose_true_or_false].blank? and return

    select_routes = params[:choose_routes_bus]
    checked_true_or_false = params[:choose_true_or_false]
    choose_method_set_marker = params[:flag]

    if choose_method_set_marker != "true"
      set_coordinate_bus_routes = []
      @data_bus_routes = ""
      if checked_true_or_false == true
        @data_bus_routes = read_file_routes(select_routes, checked_true_or_false)
      else
        @data_bus_routes = read_file_routes(select_routes, checked_true_or_false)
      end
      set_coordinate_bus_routes = @data_bus_routes.split(" ")
      respond_to do |format|
        format.json { render :json => set_coordinate_bus_routes }
     end
    end
    if choose_method_set_marker == "true"
      collect_coordinate_position_map = []
      if checked_true_or_false == true
        @data_coordinate_position = read_file_station(select_routes,checked_true_or_false)
      else
        @data_coordinate_position = read_file_station(select_routes, checked_true_or_false)
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

  # Action return coordinate position station nearest with position start and end
  def getStationNearest
    coordinate_lat = params[:lattitude].to_f
    coordinate_lng = params[:longtitude].to_f
    distance_input = params[:distance].to_f
  end

  def about_us
    return render 'about_us', layout: 'tp_about_us'
  end
end
