class ContactMailer < ActionMailer::Base
  default from: "from@example.com"
  default to: "you@youremail.dev"

  def new_message(message)
    @message = message
    mail(:name => "#{message.name}")
  end
end
