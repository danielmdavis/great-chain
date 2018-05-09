class Api::V1::ShelvesController < ApiController

  def index
    render json: Shelf.all
  end


end
