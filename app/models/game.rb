class Game < ApplicationRecord
  @@workload = {
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
  @@chapters = {
    national: ['Nat', 'National'],
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

    
    socal: ['SoCal', 'Southern California'],
    oregon: ['OR', 'Oregon'],
    washington: ['WA', 'Washington'],

    arkansas: ['AR', 'Arkansas'],
    colorado: ['CO', 'Colorado'],
    new_mexico: ['NM', 'New Mexico'],
    oklahoma: ['OK', 'Oklahoma'],
    texas: ['TX', 'Texas'], 

    florida: ['FL', 'Florida'],
    georgia: ['GA', 'Georgia'],
    
    mass: ['MA', 'Massachusetts'],
    new_jersey: ['NJ', 'New Jersey'],
    new_york: ['NY', 'New York'],
    penn: ['PA', 'Pennsylvania'],
    virginia: ['VA', 'Virginia'],
    
    indiana: ['IN', 'Indiana'],
    kentucky: ['KY', 'Kentucky'],
    ohio: ['OH', 'Ohio'],
    wisconsin: ['WI', 'Wisconsin'],
    
  }

  def self.fetch_all
    res = []
    cat = []
    inv = {}

    @@chapters.keys.reverse.each_with_index do |chapter, index|
      inv[chapter] = index
      cat.push(@@chapters[chapter.to_sym][0])
    end

    Game.all.select(:chapter, :start).each do |r|
      res.push({
        x: r.start.to_time.to_i * 1000,
        y: inv[r.chapter.to_sym],
        name: @@chapters[r.chapter.to_sym][1]
      })
      #res.push([r.start.to_time.to_i, @@chapters[r.chapter.to_sym][0]])
      #res.push([r.start.to_time.to_i, 0])

    end

    return { category: cat, data: res }
  end

  def self.parse
    @@workload.each do |chapter, func|
      Game.send(func)
    end
  end

  def self.init_national_events
    ['April 26, 2018'].each do |d|
      Game.find_or_initialize_by(chapter: 'national',
                                 start: Date.parse(d)).save!
    end
  end

  def self.get_chapters
    return @@workload.keys
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
      page.search('.sqs-block-content').each do |bct|
        h2 = bct.search('h2')
        if h2.length > 0
          year_state = h2.text.to_i

          bct.search('p').each do |par|
            if par.text.match(/\w+\s+\d+/)
              par.inner_html.split('<br>').each do |d|
                d_match = d.match(/(\w+)\s+(\d+)\-/)
                if d_match
                  date = Date.parse("#{d_match[1]} #{d_match[2]}, #{year_state}")
                  Game.find_or_initialize_by(chapter: 'wisconsin',
                                             start: date).save!
                end
              end
            end
          end
        end
      end
    end
  end
end
