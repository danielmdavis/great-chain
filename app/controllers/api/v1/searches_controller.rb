require 'httparty'

class Api::V1::SearchesController < ApiController

  def index
    render json: data
  end

  def search
    query = params["q"]
    response = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=#{query}")

    data = response["GoodreadsResponse"]["search"]["results"]["work"]
    formatted_books = []
    data.each do |book|
      book_hash = {
        name: book["best_book"]["title"],
        thinker: book["best_book"]["author"]["name"],
        year: book["original_publication_year"],
        id: book["best_book"]["id"],
        image:  book["best_book"]["image_url"]
      }
      formatted_books << book_hash
    end
    data = formatted_books

    render json: data
  end

end
