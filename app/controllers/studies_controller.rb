class StudiesController < ApplicationController
  before_action :get_study, only: [:show, :edit]

  def search
    if params[:search].present?
      search_studies
    else
      get_studies
    end
  end

  def show
    get_study
  end

  def index
    get_studies
  end

  private

  def get_study
    @nct_id=params[:id]
    @study=Retriever.get_study(@nct_id)
    @tags=Tag.where('nct_id=?',params[:id])
    @study.reviews = Review.where('nct_id = ?',@nct_id)
    @study.tags = @tags
    @study.average_rating = (@study.reviews.size == 0 ? 0 : @study.reviews.average(:rating).round(2))
  end

  def get_studies
    session_studies=UserSessionStudy.where('user_id=?',current_user.id)
    if session_studies.size > 0
      @studies=session_studies.collect{|s|
        study=JSON.parse(s.serialized_study, object_class: OpenStruct).table
        study.reviews = Review.where('nct_id = ?',study.nct_id)
        study.reviews = [] if study.reviews.nil?
        study.average_rating = (study.reviews.size == 0 ? 0 : study.reviews.average(:rating).round(2))
        study.prime_address = ''
        study
      }
    else
      set_default_query_string
      search_studies
    end
  end

  def search_studies
    UserSessionStudy.where('user_id=?',current_user.id).destroy_all
    @studies=Retriever.get(params['search'])
    set_session_studies
  end

  def set_session_studies
    @studies.each{|s|
      UserSessionStudy.new({:user_id=>current_user.id,:nct_id=>s.nct_id,:serialized_study=>s.to_json}).save!
    }
  end

  def set_default_query_string
    params['search']=current_user.default_query_string if params['search'].nil? and !current_user.default_query_string.nil?
  end

end
