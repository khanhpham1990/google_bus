class ContactsController < ApplicationController
  layout 'contact_us'
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:message])
    binding.pry
  end
end
