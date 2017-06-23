require 'rails_helper'


RSpec.describe Multicast, type: :model do
  before :each do
    @s0 = Survivor.create(provider: 'dummy', friendly_name: 's0')
    @s1 = Survivor.create(provider: 'dummy', friendly_name: 's1')

    @p0 = Profile.create(survivor_id: @s0.id, data: {}.to_json, name: 'ztest')
    @m0 = Multicast.create(profile_id: @p0.id, survivor_id: @s1.id)
  end

  context 'sanity check' do
    it 'should have corrent rowcounts' do
      expect(Multicast.all.count).to eq 1
      expect(Profile.all.count).to eq 1
      expect(Survivor.all.count).to eq 2
    end
  end

  context 'when a profile is deleted' do
    it 'should cascade deletion to multicast' do
      @m0.destroy
      expect { Multicast.find(@m0.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  context 'when a survivor owning a profile is deleted' do
    it 'should cascade deletion to profile and multicast' do
      @s0.destroy
      expect { Multicast.find(@m0.id) }.to raise_error(ActiveRecord::RecordNotFound)
      expect { Profile.find(@p0.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  context 'when a guest survivor is deleted' do
    it 'should cascade deletion to multicast only' do
      @s1.destroy
      expect(Profile.all.count).to eq 1
      expect { Multicast.find(@m0.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
