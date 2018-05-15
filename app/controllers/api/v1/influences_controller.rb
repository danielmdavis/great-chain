class Api::V1::InfluencesController < ApiController

  def index
    render json: Book.all
  end

  def create
    data = params["_json"]

    unique = data[0].to_s + data[1].to_s
    Influence.create!(
      teacher_id: data[0],
      student_id: data[1],
      id: unique
    )

  end

end
