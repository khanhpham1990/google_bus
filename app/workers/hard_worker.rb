class HardWorker
  include Sidekiq::Worker
  require 'net/http'

  def perform
    i = 1
    until i >= 160 do
      create_file_bus_station(i, true)
      create_file_bus_station(i, false)
      create_file_coordinate_routes(i, true)
      create_file_coordinate_routes(i, false)
      i += 1
    end
  end

  def create_file_bus_station(tuyen_id, luotdi)
    response = Typhoeus::Request.post("http://map.ebms.vn/Server.aspx?action=GetTuyen", :params => {:TuyenId => tuyen_id, :LuotDi => luotdi})
    if luotdi == true && !response.response_body.blank?
      File.open(Rails.root.to_s + "/public/data_maps/getAllBuses/#{luotdi}/GetTuyenBus_#{luotdi}#{tuyen_id}.json", "w:UTF-8") {|f| f.write(response.response_body.force_encoding("UTF-8"))}
    end
    if luotdi == false && !response.response_body.blank?
      File.open(Rails.root.to_s + "/public/data_maps/getAllBuses/#{luotdi}/GetTuyenBus_#{luotdi}#{tuyen_id}.json", "w:UTF-8") {|f| f.write(response.response_body.force_encoding("UTF-8"))}
    end
  end

  def create_file_coordinate_routes(tuyen_id, luotdi)
    response = Typhoeus::Request.post("http://map.ebms.vn/Server.aspx?action=GetFullRoute", :params => {:tuyenid => tuyen_id, :luotdi => luotdi})
    if luotdi == true && !response.response_body.blank?
      File.open(Rails.root.to_s + "/public/data_maps/getFullRoutes/#{luotdi}/GetFullRoute_#{luotdi}#{tuyen_id}.txt", "w:UTF-8") {|f| f.write(response.response_body.force_encoding("UTF-8"))}
    end
    if luotdi == false && !response.response_body.blank?
      File.open(Rails.root.to_s + "/public/data_maps/getFullRoutes/#{luotdi}/GetFullRoute_#{luotdi}#{tuyen_id}.txt", "w:UTF-8") {|f| f.write(response.response_body.force_encoding("UTF-8"))}
    end
  end
end
