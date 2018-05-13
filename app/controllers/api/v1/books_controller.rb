class Api::V1::BooksController < ApiController

  def index
    render json: Book.all
  end

  def create
    data = params["_json"]
    
    data.each do |book|
      if Thinker.where(name: book["thinker"]).exists?
        Book.create(
          name: book["name"],
          thinker: Thinker.where(name: book["thinker"]),
          year: book["year"],
          id: book["id"]
        )
      else
        this_thinker = Thinker.create(id: Thinker.all.length, name: book["thinker"])
          Book.create(
            name: book["name"],
            thinker: this_thinker,
            year: book["year"],
            id: book["id"]
          )
      end
    end
  end
end
