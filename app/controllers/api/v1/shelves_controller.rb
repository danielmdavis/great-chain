class Api::V1::ShelvesController < ApiController

  def index
    render json: Shelf.all
  end


  def show
    shelf_key = Shelf.find(params[:id])
    render json: Book.where(shelf_id: shelf_key)
  end

end
