class Contact < MailForm::Base
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming
  attr_accessor :name, :email, :address, :message
  validates :name, presence: true, length: { minimum: 4 }

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :email, presence: true

  validates :message, presence: true, length: { minimum: 10 }

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def deliver
    return false unless valid?
  end

  def persisted?
    false
  end
end
