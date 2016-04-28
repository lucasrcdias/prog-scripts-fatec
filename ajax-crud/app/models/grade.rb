class Grade < ActiveRecord::Base
  validates :value, presence: true
  
  belongs_to :subject
end
