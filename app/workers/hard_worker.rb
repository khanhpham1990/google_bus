class HardWorker
  include Sidekiq::Worker

  def perform
    puts 'Doing hard work'
  end
end
