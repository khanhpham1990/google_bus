class Contact < MailForm::Base
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming
  include ActionView::Helpers::TextHelper
  attr_accessor :name, :email, :address, :message
  validates :name, presence: true, length: { minimum: 4 }


  validates :email, presence: true,
    :format => { :with => /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/ }

  validates :message, presence: true, length: { minimum: 10 }

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def deliver
    return false unless valid?
    Pony.mail({
      :from => %("#{name}" <#{email}>),
      :reply_to => email,
      :subject => "Website busRoutes",
      :body => message,
      :html_body => simple_format(message)
    })
  end

  def persisted?
    false
  end
end
