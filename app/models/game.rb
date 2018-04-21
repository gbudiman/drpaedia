class Game < ApplicationRecord
  @@workload = {
    #socal: :parse_socal,
    #washington: :parse_washington,
    #colorado: :parse_colorado,
    #oregon: :parse_oregon,
    #new_jersey: :parse_new_jersey,
    #new_mexico: :parse_new_mexico,
    #ohio: :parse_ohio,
    #georgia: :parse_georgia,
    #mass: :parse_mass,
    #virginia: :parse_virginia,
    #new_york: :parse_new_york,
    #penn: :parse_penn,
    #oklahoma: :parse_oklahoma,
    #texas: :parse_texas,
    indiana: :parse_indiana,
  }
  @@mech = Mechanize.new
  @@year = Time.now.year

  def self.parse
    @@workload.each do |chapter, func|
      Game.send(func)
    end
  end

private
  def self.parse_socal
    @@mech.get('http://www.dystopiarisingsocal.com/events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'socal',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_washington
    @@mech.get('http://www.dystopiarisingwa.com/events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'washington',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_georgia
    @@mech.get('https://dystopiarisinggeorgia.com/calendar-of-events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'georgia',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_mass
    @@mech.get('http://www.dystopiarisingma.com/calendar-of-events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'mass',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_virginia
    @@mech.get('http://www.dystopiarisingva.com/events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'virginia',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_new_york
    @@mech.get('https://www.dystopiarisingny.com/new-events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'new_york',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_penn
    @@mech.get('https://www.dystopiarisingpenn.com/new-events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'penn',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_oklahoma
    @@mech.get('http://www.dystopiarisingok.com/events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'oklahoma',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_texas
    @@mech.get('http://www.idratherbeinbravo.com/events/') do |page|
      page.search('li.eventlist-meta-item').each do |li|
        li.search('.event-date:first').each do |x|
          Game.find_or_initialize_by(chapter: 'texas',
                                     start: Date.parse(x.text)).save!
        end
      end
    end
  end

  def self.parse_colorado
    @@mech.get('http://www.dystopiarisingco.com/events/') do |page|
      page.search('.sqs-block-content').each do |bct|
        bct.search('li').each do |li|
          date_match = li.text.match(/(\w+)\s+(\d+)/)
          if date_match
            date = Date.parse("#{date_match[1]} #{date_match[2]}, #{@@year}")
            Game.find_or_initialize_by(chapter: 'colorado',
                                       start: date).save!
          end
        end
      end
    end
  end

  def self.parse_new_mexico
    @@mech.get('https://www.dystopiarisingnm.com/upcoming-events/') do |page|
      page.search('.sqs-block-content').each do |bct|
        bct.search('li').each do |li|
          date_match = li.text.match(/(\w+)\s+(\d+)/)
          if date_match
            date = Date.parse("#{date_match[1]} #{date_match[2]}, #{@@year}")
            Game.find_or_initialize_by(chapter: 'new_mexico',
                                       start: date).save!
          end
        end
      end
    end
  end

  def self.parse_ohio
    @@mech.get('https://www.dystopiarisingohio.com/events-and-location/') do |page|
      page.search('.sqs-block-content').each do |bct|
        bct.search('p').each do |li|
          date_match = li.text.match(/(\w+)\s+(\d+)\-/)
          if date_match
            date = Date.parse("#{date_match[1]} #{date_match[2]}, #{@@year}")
            Game.find_or_initialize_by(chapter: 'ohio',
                                       start: date).save!
          end
        end
      end
    end
  end

  def self.parse_oregon
    @@mech.get('https://dystopiarisingoregon.com/events/') do |page|
      page.search('p').each do |ps|
        text = ps.text
        if text.match(/\w+\.?\s+\d+/)
          text.split(/\,/).each do |e|
            e_match = e.match(/(\w+)\.?\s+(\d+)\-/)
            if e_match
              date = Date.parse("#{e_match[1]} #{e_match[2]}, #{@@year}")
              Game.find_or_initialize_by(chapter: 'oregon',
                                         start: date).save!
            end
          end
        end
      end
    end
  end

  def self.parse_new_jersey
    @@mech.get('http://www.dystopiarisingnj.com/locationdates/') do |page|
      year_state = nil

      page.search('h1, h2').each do |h|
        year_match = h.text.match(/(\d+) schedule/i)
        month_match = h.text.match(/(\w+)\s+(\d+)/)

        if year_match
          year_state = year_match[1].to_i
        elsif month_match and year_state != nil
          date = Date.parse("#{month_match[1]} #{month_match[2]}, #{year_state}")
          Game.find_or_initialize_by(chapter: 'new_jersey',
                                     start: date).save!
        end

      end
    end
  end

  def self.parse_indiana
    @@mech.get('http://www.dystopiarisingindiana.com/calendar/') do |page|
      year_state = nil

      page.search('p').each do |h|
        year_match = h.text.match(/^(\d+)$/i)
        month_match = h.text.match(/(\w+)\s+(\d+)\-/)

        if year_match
          year_state = year_match[1].to_i
        elsif month_match and year_state != nil
          date = Date.parse("#{month_match[1]} #{month_match[2]}, #{year_state}")
          Game.find_or_initialize_by(chapter: 'indiana',
                                     start: date).save!
        end

      end
    end
  end
end