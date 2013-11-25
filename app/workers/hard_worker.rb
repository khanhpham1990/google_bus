class HardWorker
  include Sidekiq::Worker

  def perform
    i = 0
    until i <= 160 do
      create_file_bus_station(i, true)
      create_file_bus_station(i,false)
      i += 1
    end
    binding.pry
  end

  def create_file_bus_station(tuyen_id, luotdi)
    response = Typhoeus::Request.post("http://map.ebms.vn/Server.aspx?action=GetTuyen", :params => {:TuyenId => tuyen_id, :LuotDi => luotdi})
    if luotdi == true
      File.open(Rails.root.to_s + "/public/data_maps/getAllBuses/#{luotdi}/GetTuyenBus_#{luotdi}#{tuyen_id}.json", "w") {|f| f.write(JSON.parse(response.response_body))}
    else
      File.open(Rails.root.to_s + "/public/data_maps/getAllBuses/#{luotdi}/GetTuyenBus_#{luotdi}#{tuyen_id}.json", "w") {|f| f.write(JSON.parse(response.response_body))}
    end
  end

  def write_file_to_public
  end
end
