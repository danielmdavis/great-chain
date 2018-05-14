require 'httparty'
require 'pry'
class Parser
  attr_reader :data

  def initialize
    @data = []
  end

  def search
    # response = HTTParty.get("https://www.goodreads.com/search.xml?key=#{ENV["GR_KEY"]}&q=#{query}")
    # response = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=#{query}")
    response = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=prolegomena")
  end
end
