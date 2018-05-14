require 'httparty'

class Api::V1::SearchesController < ApiController

  def index
    render json: @data
  end

  def search

    query = params["_json"]
    query = "prolegomena"

    binding.pry
    # response = HTTParty.get("https://www.goodreads.com/search.xml?key=#{ENV["GR_KEY"]}&q=#{query}")
    response = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=#{query}")
    # response = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=prolegomena")

    @data = response["GoodreadsResponse"]["search"]["results"]["work"]
    formatted_books = []
    @data.each do |book|
      book_hash = {
        name: book["best_book"]["title"],
        thinker: book["best_book"]["author"]["name"],
        year: book["original_publication_year"],
        id: book["best_book"]["id"]
      }
      formatted_books << book_hash
    end
    @data = formatted_books



    render json: @data


  end

end
