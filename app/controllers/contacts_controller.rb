class ContactsController < ApplicationController
  layout 'contact_us'
  def new
    @contact = Contact.new
  end

  def create
    render 'new' if params[:contact].blank?
    @contact = Contact.new(params[:contact])
  end
end
