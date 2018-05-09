class InfluencesController < ApplicationController


  def show
    @influence = Influence.find(params[:id])
    @comments = @influence.comments
  end

end
