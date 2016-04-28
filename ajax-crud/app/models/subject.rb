class Subject < ActiveRecord::Base
  validates :name, presence: true

  has_many :grades, dependent: :destroy

  def average
    return 0 if grades.blank?

    (grades.map(&:value).reduce(:+) / grades.count).round(2)
  end
end
