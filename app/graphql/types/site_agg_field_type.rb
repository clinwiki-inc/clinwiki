module Types
  class SiteAggFieldType < Types::BaseObject
    field :name, String, null: false
    field :rank, Integer, null: true
    field :auto_suggest, Boolean, null: true
    field :display, FieldDisplayType, null: false
    field :preselected, SiteSelectType, null: false
    field :visible_options, SiteSelectType, null: false

    def display
      object[:display]
    end

    def visible_options
      object[:visibleOptions]
    end
  end
end
