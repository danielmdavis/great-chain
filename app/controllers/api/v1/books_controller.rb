class Api::V1::BooksController < ApiController

  def index
    render json: Book.all
  end

  def search
    topic = params[:query]
    parser = Parser.new
    parser.search(topic)
    render json: { data: parser.data }

  end


end
