class Api::V1::InfluencesController < ApiController

  def index
    render json: Book.all
  end

  def create
    data = params["_json"]
    binding.pry
    Influence.create!(
      teacher:
      student:
    )

  end

end
