require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'should parse chapters correctly' do
    Game.parse

    ap Game.all.pluck(:chapter, :start)
  end
end
