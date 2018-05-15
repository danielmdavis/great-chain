class Api::V1::InfluencesController < ApiController

  def index
    render json: Book.all
  end

  def create

    # Influence.create!(
    #   teacher:
    #   student:
    # )

  end

end
