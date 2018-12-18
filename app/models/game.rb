class Game < ApplicationRecord
  @@workload = {
    norcal: :parse_norcal,
    socal: :parse_socal,
    washington: :parse_washington,
    colorado: :parse_colorado,
    oregon: :parse_oregon,
    new_jersey: :parse_new_jersey,
    new_mexico: :parse_new_mexico,
    ohio: :parse_ohio,
    georgia: :parse_georgia,
    mass: :parse_mass,
    virginia: :parse_virginia,
    new_york: :parse_new_york,
    penn: :parse_penn,
    oklahoma: :parse_oklahoma,
    texas: :parse_texas,
    indiana: :parse_indiana,
    kentucky: :parse_kentucky,
    florida: :parse_florida,
    arkansas: :parse_arkansas,
    wisconsin: :parse_wisconsin
  }
  @@mech = Mechanize.new
  @@mech.user_agent_alias = 'Linux Firefox'
  @@year = Time.now.year
  @@region = {
    national: { national: true },
    west_coast: { socal: true, oregon: true, washington: true, norcal: true },
    central: { arkansas: true, colorado: true, new_mexico: true, oklahoma: true, texas: true },
    south: { florida: true, georgia: true },
    east_coast: { mass: true, new_jersey: true, new_york: true, penn: true, virginia: true },
    midwest: { indiana: true, kentucky: true, ohio: true },
    north: { wisconsin: true }
  }
  @@chapters = {
    national: ['Nat', 'National', :national],
    # arkansas: ['AR', 'Arkansas'],
    # socal: ['SoCal', 'Southern California'],
    # colorado: ['CO', 'Colorado'],
    # florida: ['FL', 'Florida'],
    # georgia: ['GA', 'Georgia'],
    # indiana: ['IN', 'Indiana'],
    # kentucky: ['KY', 'Kentucky'],
    # mass: ['MA', 'Massachusetts'],
    # new_jersey: ['NJ', 'New Jersey'],
    # new_mexico: ['NM', 'New Mexico'],
    # new_york: ['NY', 'New York'],
    # ohio: ['OH', 'Ohio'],
    # oklahoma: ['OK', 'Oklahoma'],
    # oregon: ['OR', 'Oregon'],
    # penn: ['PA', 'Pennsylvania'],
    # texas: ['TX', 'Texas'], 
    # virginia: ['VA', 'Virginia'],
    # washington: ['WA', 'Washington'],
    # wisconsin: ['WI', 'Wisconsin'],

    norcal: ['NorCal', 'Northern California', :west_coast],
    socal: ['SoCal', 'Southern California', :west_coast],
    oregon: ['OR', 'Oregon', :west_coast],
    washington: ['WA', 'Washington', :west_coast],

    arkansas: ['AR', 'Arkansas', :central],
    colorado: ['CO', 'Colorado', :central],
    new_mexico: ['NM', 'New Mexico', :central],
    oklahoma: ['OK', 'Oklahoma', :central],
    texas: ['TX', 'Texas', :central], 

    florida: ['FL', 'Florida', :south],
    georgia: ['GA', 'Georgia', :south],
    
    mass: ['MA', 'Massachusetts', :east_coast],
    new_jersey: ['NJ', 'New Jersey', :east_coast],
    new_york: ['NY', 'New York', :east_coast],
    penn: ['PA', 'Pennsylvania', :east_coast],
    virginia: ['VA', 'Virginia', :east_coast],
    
    indiana: ['IN', 'Indiana', :midwest],
    kentucky: ['KY', 'Kentucky', :midwest],
    ohio: ['OH', 'Ohio', :midwest],
    wisconsin: ['WI', 'Wisconsin', :north],
    
  }

  def self.fetch_all
    res = {}
    cat = []
    inv = {}

    @@chapters.keys.reverse.each_with_index do |chapter, index|
      inv[chapter] = index
      cat.push(@@chapters[chapter.to_sym][0])
    end

    Game.all.select(:chapter, :start).each do |r|
      res[@@chapters[r.chapter.to_sym][2]] ||= {}
      region = res[@@chapters[r.chapter.to_sym][2]]
      region[:data] ||= []

      region[:data].push({
        x: r.start.to_time.to_i * 1000,
        y: inv[r.chapter.to_sym],
        name: @@chapters[r.chapter.to_sym][1]
      })
    end

    return { category: cat, data: res }
  end

  def self.parse
    @@workload.each do |chapter, func|
      Game.send(func)
    end
  end

  def self.init_national_events
    ['April 26, 2018', 'July 6, 2018', 'September 13, 2018', 'April 11, 2019'].each do |d|
      Game.find_or_initialize_by(chapter: 'national',
                                 start: Date.parse(d)).save!
    end
  end

  def self.get_chapters
    return @@workload.keys
  end

private
  def self.parse_norcal
    @@mech.get('https://www.dystopiarisingnocal.com/location-dates/') do |page|
      page.search('div.sqs-block-content').each do |div|
        year = nil

        div.children.each do |y_obj|
          text = y_obj.text

          year_head = text.match(/(\d+) schedule/i)
          month_head_0 = text.match(/((\w+)\s+(\d+)|(\w+)\s+\-\s+(\d+))/)
          

          if year_head
            year = year_head[1].to_i
          end

          if month_head_0
            begin
              Game.find_or_initialize_by(chapter: 'norcal', 
                                         start: Date.parse("#{month_head_0[2] || month_head_0[4]} #{month_head_0[3] || month_head_0[5]}, #{year}")).save!
            rescue ArgumentError
            end
          end
        end
      end
    end

    return 0
  end

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
          ap date_match
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

  def self.parse_kentucky
    @@mech.get('http://www.dystopiarisingky.com/calendar/') do |page|
      page.search('.eventlist-meta-date').each do |li|
        r = li.text.split(/\-/)
        date = Date.parse(r[0])
        Game.find_or_initialize_by(chapter: 'kentucky',
                                   start: date).save!
      end
    end
  end

  def self.parse_florida
    @@mech.get('http://www.dystopiarisingflorida.com/site-schedule/') do |page|
      page.search('p').each do |li|
        if li.text.match(/\w+\s+\d+\w+\-/)
          li.inner_html.split('<br>').each do |d|
            d_match = d.match(/(\w+)\s(\d+)\w+\-(\w+\s)?\d+\w+\,\s+(\d+)/)
            if d_match
              date = Date.parse("#{d_match[1]} #{d_match[2]}, #{d_match[4]}")
              Game.find_or_initialize_by(chapter: 'florida',
                                         start: date).save!
            end
          end
        end
      end
    end
  end

  def self.parse_arkansas
    @@mech.get('https://www.dystopiarisingar.com/events/') do |page|
      
      page.search('.sqs-block-content').each do |bct|
        year_state = nil

        h1 = bct.search('h1')
        if h1.length > 0
          year_state = nil
          bct.children.each do |ch|
            year_match = ch.text.match(/^(\d+)$/)
            month_match = ch.text.match(/(\w+)\s(\d+)/)

            if year_match
              year_state = year_match[1].to_i
            elsif month_match
              date = Date.parse("#{month_match[1]} #{month_match[2]}, #{year_state}")
              Game.find_or_initialize_by(chapter: 'arkansas',
                                         start: date).save!
            end
          end
        end
      end
    end
  end

  def self.parse_wisconsin
    @@mech.get('http://steelhorsecrossing.com/location-and-site/') do |page|
      state = nil
      page.search('.sqs-block-content').children.each do |bct|
        yearmatch = bct.text.match(/(\d+)\s+dates/i)
        if yearmatch
          state = yearmatch[1].to_i
        end

        if state and (mstate = bct.text.match(/(\w+)\s+(\d+)/))
          date = Date.parse("#{mstate[1]} #{mstate[2]}, #{state}")
          Game.find_or_initialize_by(chapter: 'wisconsin', start: date).save!
        end
      end
    end
  end
end
