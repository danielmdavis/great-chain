class Api::V1::BooksController < ApiController

  def index
    render json: Book.all
  end

  def create
    data = params["_json"]
    data.each do |book|
      # if Thinker.find_by_name(book["thinker"]).present?

        # Book.create!(
        #   name: book["name"],
        #   thinker: Thinker.find_by_name(book["thinker"]),
        #   year: book["year"],
        #   id: book["id"],
        # image: book["image"],
        #   shelf_id: 1
        # )
      # else
      ### THIS ALONE DOESN'T WORK because it means I can't add further books from the same thinker !! duh
        this_thinker = Thinker.create!(id: book["thinker_id"], name: book["thinker"])
          Book.create!(
            name: book["name"],
            thinker: this_thinker,
            year: book["year"],
            id: book["id"],
            image: book["image"],
            shelf_id: 1
          )
      # end
    end
  end

end
