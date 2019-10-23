class Facility < AactRecord
  include BelongsToStudy

  has_many :facility_contacts, dependent: :restrict_with_exception
  has_many :facility_investigators, dependent: :restrict_with_exception

  geocoded_by :address

  def location_name
    "#{name}, #{city} #{state} #{zip} #{country}"
  end

  def location
    return @location if @location
    @location = Location.find_by(name: location_name)
    res = Geocoder.search(location_name).first
    if res
      @location = Location.create(
        name: location_name,
        latitude: res.coordinates.first,
        longitude: res.coordinates.last,
        partial_match: res.partial_match,
        location_type: res.types
      )
    else
      @location = Location.create(name: location_name)
    end
  end

  def latitude
    return nil if location.partial_match
    location.latitude
  end

  def longitude
    return nil if location.partial_match
    location.longitude
  end

  def description
    "#{country}: #{name}, #{city} #{state} #{zip} (#{recruitment_status})"
    #  Some studies have thousands and it takes too long to query each contact
    #  "#{country}: #{name}, #{city} #{state} #{zip} #{primary_contact} (#{recruitment_status})"
  end

  def recruitment_status
    status.presence || "status unknown"
  end

  def primary_contact
    # facility_contacts.select{|fc|fc.contact_type.downcase=='primary'}.first.try(:contact_info)
  end
end
