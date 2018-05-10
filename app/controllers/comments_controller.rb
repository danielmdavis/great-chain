class CommentsController < ApplicationController


  def show


  end

  def new
    @comment = Comment.new
  end

  def create
    @influence = Influence.find(params[:influence_id])
    @comment = Comment.new(params.require(:comment).permit(:description, :vote, :influence_id))
    @comment.influence = @influence
    @comment.user = current_user
    @comment.save
    redirect_to root_path
  end


end
