class Api::V1::ThinkersController < ApiController

  def index
    render json: Thinker.all
  end


end
