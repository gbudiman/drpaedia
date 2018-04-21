require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'should parse chapters correctly' do
    Game.parse

    Game.get_chapters.each do |chapter|
    	g = Game.where(chapter: chapter)
    	puts "#{chapter} => #{g.length}"
    	expect(g.count).to be > 0
    end
  end
end
