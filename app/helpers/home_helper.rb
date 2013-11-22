module HomeHelper
  def read_file_station (select_routes, checked_true_or_false)
    data_coordinate_position = File.read(Rails.root.to_s + "/db/data_maps/getAllBuses/#{checked_true_or_false}/GetTuyenBus_#{checked_true_or_false}#{select_routes.to_i}.json")
  end

  def read_file_routes(select_routes, checked_true_or_false)
    data_bus_routes = File.read(Rails.root.to_s + "/db/data_maps/getAllRoutes/#{checked_true_or_false}/GetFullRoute_#{checked_true_or_false}#{select_routes.to_i}.txt")
  end
end
