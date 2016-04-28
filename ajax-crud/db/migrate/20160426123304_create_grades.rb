class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.decimal :value, precision: 14, scale: 2
      t.belongs_to :subject, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
