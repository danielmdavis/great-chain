class Api::V1::ShelvesController < ApiController

  def index
    render json: Book.all
  end


end
