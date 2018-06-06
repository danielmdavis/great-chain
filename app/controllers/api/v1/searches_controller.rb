require 'httparty'

class Api::V1::SearchesController < ApiController

  def index
    render json: data
  end

  def search
    query = params["q"]
    book_call = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=#{query}")
    data = book_call["GoodreadsResponse"]["search"]["results"]["work"]
    formatted_books = []
    data.each do |book|
      thinker_id = book["best_book"]["author"]["id"]
      thinker_call = HTTParty.get("https://www.goodreads.com/author/show/#{thinker_id}?format=xml&key=B8epnsvG4JVbFEGCw5FlA")
      book_hash = {
        name: book["best_book"]["title"],
        thinker: book["best_book"]["author"]["name"],
        year: book["original_publication_year"],
        id: book["best_book"]["id"],
        thinker_id: book["best_book"]["author"]["id"]
        image:  book["best_book"]["image_url"],
        # thinker_image: thinker_call["GoodreadsResponse"]["author"]["image_url"],
        # thinker_year: thinker_call["GoodreadsResponse"]["author"]["born_at"][0,4],
        # thinker_bio: thinker_call["GoodreadsResponse"]["author"]["about"],
        # thinker_influences: thinker_call["GoodreadsResponse"]["author"]["influences"]
      }
      formatted_books << book_hash
    end
    data = formatted_books

    render json: data
  end

end
