class InfluencesController < ApplicationController

  def index
  end

  def show
    @influence = Influence.find(params[:id])
    @comments = @influence.comments
    @comment = Comment.new
  end

  def new
    @comment = Comment.new
  end

end
