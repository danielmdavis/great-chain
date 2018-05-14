class ShelvesController < ApplicationController
  def index
  end

  def search
    topic = params[:query]
    parser = Parser.new

    data = parser.search["GoodreadsResponse"]["search"]["results"]["work"]
    formatted_books = []
    data.each do |book|
      book_hash = {
        name: book["best_book"]["title"],
        thinker: book["best_book"]["author"]["name"],
        year: book["original_publication_year"],
        id: book["best_book"]["id"]
      }
      formatted_books << book_hash
    end
    render json: { books: formatted_books }
  end

  def show
  end

end
