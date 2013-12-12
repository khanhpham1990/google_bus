class ContactsController < ApplicationController
  layout 'contact_us'
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contact])

    if @contact.deliver
      redirect_to root_path
    else
      render :new
    end
  end
end
