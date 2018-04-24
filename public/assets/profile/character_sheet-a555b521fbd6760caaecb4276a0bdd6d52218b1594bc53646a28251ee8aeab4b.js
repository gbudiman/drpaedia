var character_sheet = (function() {
  var _data;
  var _config;

  var attach = function() {
    $('#character-sheet').modal({
      show: false,
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    })

    $('#generate-character-sheet').on('click', function() {
      generate();
      return false;
    })

    $('#cs-print').on('click', function() {
      $('#character-sheet').printThis({
        printContainer: false
      });
    })

    $('#cs-check-planned').on('click', evaluate_filter);
    $('#cs-check-pool').on('click', evaluate_filter);
    $('#cs-check-lore').on('click', evaluate_filter);
  }

  var evaluate_filter = function() {
    var show_planned = $('#cs-check-planned').prop('checked');
    var show_pool = $('#cs-check-pool').prop('checked');
    var show_lore = $('#cs-check-lore').prop('checked');

    show_planned ? $('#cs-planned').show() : $('#cs-planned').hide();
    show_pool ? $('#cs-graphical').show() : $('#cs-graphical').hide();
    show_lore ? $('#cs-lores').show() : $('#cs-lores').hide();
  }

  var generate_stats = function() {
    _data.hp_base = parseInt($('#stat-base-hp').text());
    _data.hp_addition = parseInt($('#stat-purchased-hp').val());
    _data.hp_total = parseInt($('#stat-sum-hp').text());
    _data.mp_base = parseInt($('#stat-base-mp').text());
    _data.mp_addition = parseInt($('#stat-purchased-mp').val());
    _data.mp_total = parseInt($('#stat-sum-mp').text());
    _data.infection = parseInt($('#stat-base-inf').text());
    _data.infection_reduction = parseInt($('#stat-purchased-inf').val());
    _data.infection_total = parseInt($('#stat-sum-inf').text());
    _data.xp_profession = parseInt($('#xp-prof-acquired').text());
    _data.xp_skills = parseInt($('#xp-skills-acquired').text());
    _data.xp_total = parseInt($('#xp-total-acquired').text());
    _data.profile_name = profile.get_current_name();
  }

  var generate_skills = function(type) {
    if (type == 'pool') {

      $('#skill-pool').find('div').each(function() {
        var $this = $(this);
        if ($this.hasClass('skill-infancy')) return true;
        //var skill_name = $this.find('span.skill-name').text();
        var xp_cost = parseInt($this.find('span.skill-cost').text());
        var skill_id = $this.attr('id');
        var skill_name = skills.get_name(skill_id);

        if (skill_name == undefined) return true;

        _data.skills[type][skill_name] = {
          xp: xp_cost,
          mp: skills.get_mp(skill_name)
        }
      })
    } else {
      _data.skills[type] = profile.get_skill_list(type);
    }
    // $('#' + type + '-list').find('li[skill-name]').not('.faded').each(function() {
    //   var that = $(this);
    //   var skill_name = that.attr('skill-name');
    //   _data.skills[type][skill_name] = {
    //     xp: parseInt(that.find('.skill-cost-badge').text().trim()),
    //     mp: skill_mp_cost.get(skill_name)
    //   }
    // })
  }

  var generate_strain_skills = function() {
    var strain = profile.get_current()['strain'];
    $.each(strains.get_innate(strain), function(i, x) {
      _data.skills.innate[x] = { xp: 'ns', mp: 0 }
    })
    // $('#strain-specs').find('span').each(function() {
    //   _data.skills.innate[$(this).text().trim()] = { xp: 'ns', mp: 0 };
    // })
  }

  var generate = function(config) {
    _data = {
      skills: {
        innate: {},
        acquired: {},
        planned: {},
        pool: {}
      }
    }

    _config = {
      strain: profile.get_strain(),
      professions: profile.get_current_professions()
    }

    generate_stats();
    generate_skills('acquired');
    generate_skills('planned');
    generate_skills('pool');
    generate_strain_skills();

    write();
    evaluate_filter();

    $('#character-sheet').modal('show');
  }

  var skill_row_maker = function(name, mp, xp) {
    return '<tr>'
         +   '<td>' + name + '</td>'
         +   '<td class="align-right">' + mp + '</td>'
         +   '<td class="align-right">' + xp + '</td>'
         + '</tr>';
  }

  var two_col_row = function(a, b) {
    return '<tr>'
         +   '<td>' + a + '</td>'
         +   '<td>' + b + '</td>'
         + '</tr>';
  }

  var write_xp_usage = function() {
    s = two_col_row('XP - stats', _data.hp_addition + _data.mp_addition)
      + two_col_row('XP - skills', _data.xp_skills)
      + two_col_row('XP - professions', _data.xp_profession)
      + two_col_row('XP - total', _data.xp_total);

    $('#cs-profs').append(s);
  }

  var write_skill_pool = function() {
    var n, l;

    $.each(_data.skills['pool'], function(name, d) {
      if (name.match(/^Lore - /)) {
        l += skill_row_maker(name, d.mp, d.xp);
      } else {
        n += skill_row_maker(name, d.mp, d.xp);
      }
    })

    $('#cs-graphical').append(n);
    $('#cs-lores').append(l);
  }

  var write_skills = function(source, target) {
    var s;

    var keys = Object.keys(_data.skills[source]).sort();

    //$.each(_data.skills[source], function(name, d) {
    $.each(keys, function(i, name) {
      d = _data.skills[source][name];
      s += skill_row_maker(name, d.mp, d.xp);
    })

    $('#' + target).append(s);
  }

  var write_strain = function() {
    $('#cs-profs').append('<tr><td>Strain</td><td>' + _config.strain + '</td></tr>');
  }

  var write_professions = function() {
    var count = 0;
    $.each(_config.professions, function(x, _junk) {
      $('#cs-profs').append('<tr><td>Profession ' + ++count + '</td><td>' + x + '</td></tr>');
    })
  }

  var write_character_name = function() {
    $('#cs-profs').append(two_col_row('Name', _data.profile_name));
  }

  var write_timestamp = function() {
    $('#cs-profs').append(two_col_row('Date', new Date().toLocaleDateString()));
  }

  var write = function() {
    $('#cs-stat-hp-base').text(_data.hp_base);
    $('#cs-stat-hp-addition').text(_data.hp_addition);
    $('#cs-stat-hp-total').text(_data.hp_total);
    $('#cs-stat-mp-base').text(_data.mp_base);
    $('#cs-stat-mp-addition').text(_data.mp_addition);
    $('#cs-stat-mp-total').text(_data.mp_total);
    $('#cs-stat-ip-base').text(_data.infection);
    $('#cs-stat-ip-reduction').text(_data.infection_reduction * -1);
    $('#cs-stat-ip-total').text(_data.infection_total);

    $('#cs-acquired').find('tbody').empty();
    $('#cs-planned').find('tbody').empty();
    $('#cs-graphical').find('tbody').empty();
    $('#cs-profs').find('tbody').empty();
    $('#cs-lores').find('tbody').empty();
    
    write_skills('innate', 'cs-acquired');
    write_skills('acquired', 'cs-acquired');
    write_skills('planned', 'cs-planned');
    write_skill_pool();
    write_timestamp();
    write_character_name();
    write_strain();
    write_professions();
    write_xp_usage();
  }

  return {
    attach: attach,
    generate: generate
  }
})();
