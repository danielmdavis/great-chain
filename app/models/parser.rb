require 'httparty'
require 'pry'
class Parser
  attr_reader :data

  def initialize
    @data = []
  end

  def search(query)

    response = HTTParty.get("https://www.goodreads.com/search.xml?key=B8epnsvG4JVbFEGCw5FlA&q=#{query}")

    response.each do |book|
      Book.create(
        name: book
      )

end
