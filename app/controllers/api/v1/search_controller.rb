class Api::V1::SearchController < ApiController

  def index
    topic = params[:query]
    parser = Parser.new
    parser.search

    data = parser.search["GoodreadsResponse"]["search"]["results"]["work"]


    render json: { data: data }

  end

end
