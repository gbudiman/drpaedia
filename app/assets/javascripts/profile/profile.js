var profile = function() {
  debug = true;
  selected = 'default';
  profiles = {};
  config = {};

  var empty_default = {
    profiles: {
      default: {
        prefs: { advanced_acknowledged: false }
      }
    },
    config: { primary: 'default' }
  }

  var default_prefs = {
    prefs: { advanced_acknowledged: false }
  }

  var store = function() {
    data = {
      strain: pack_strain(),
      professions: pack_professions(),
      stats: pack_stats(),
      acq: pack_acq(),
      plan: pack_plan(),
      prefs: profiles[selected] == undefined ? default_prefs : profiles[selected].prefs
    }

    profiles[selected] = data;
  }

  var save_all = function() {
    if (dynaloader.get_gil('ok_to_save')) {
      store();
      $.jStorage.set('all', { profiles: profiles, config: config });
      if (debug) {
        console.log('Saving all...');
        console.log($.jStorage.get('all'));
      }
    }
  }

  var load = function() {
    var v = $.jStorage.get('all') || empty_default;
    profiles = v.profiles;
    config = v.config;
    selected = v.config.primary;

    dynaloader.set_gil('ok_to_save', false, reset);
    dynaloader.set_gil('ok_to_update_gui', false, apply);
    console.log('gil cleared');

    if (debug) {
      console.log('Loaded:');
      console.log(v);
    }

    return { profiles: profiles, config: config }
  }

  var reset = function() {
    strain_interface.set_gui(null);
    profession_basic_interface.reset();
    $('#skills-acquired').empty();
    $('#skills-planned').empty();
  }

  var apply = function() {
    //dynaloader.set_delegate('profile_apply', calc.recalculate_all, function() {
    var d = profiles[selected];
    if (d == undefined) return;
    strain_interface.set_gui(d.strain);

    if (d.professions != undefined) {
      $.each(d.professions.selected, function(x, _junk) {
        profession_basic_interface.add(x);
      })

      $.each(d.professions.forgotten, function(x, _junk) {
        profession_basic_interface.add(x);
        profession_basic_interface.forget(x);
      })
    }

    stats_interface.set(d.stats);
    $.each(d.acq, function(i, x) {
      apply_rightside(x, 'skills-acquired');
    })

    $.each(d.plan, function(i, x) {
      apply_rightside(x, 'skills-planned');
    })
  }

  var apply_rightside = function(entry, target) {
    if (entry.group != undefined) {
      if (target == 'skills-acquired') {
        tooling.copy_programmatically('tool-acq-group', target, { title: entry.group })
      } else if (target == 'skills-planned') {
        tooling.copy_programmatically('tool-separator', target, { title: entry.group })
      }
    } else if (entry.skill != undefined) {
      dragdrop.drop_selective(entry.skill, $('#' + target));
      var alt = entry.alt ? '<sup>+</sup>' : '';
      $('#' + entry.skill + '-cost').html(entry.cost + alt);
    } else if (entry.stat != undefined) {
      tooling.copy_programmatically('tool-stat-planner', target, { option: entry.stat, nominal: entry.nominal })
    } else if (entry.checkin != undefined) {
      tooling.copy_programmatically('tool-checkin-marker', target, { title: entry.checkin, nominal: entry.nominal })
    } else if (entry.prof != undefined) {
      tooling.copy_programmatically('tool-profession-planner', target, { option: entry.prof, nominal: entry.nominal, selected: entry.selected })
    }
  }

  var wipe = function() {
    $.jStorage.set('all', null);
    load();
    save_all();
  }

  var pack_strain = function() {
    return strain_interface.selected();
  }

  var pack_professions = function() {
    return {
      selected: profession_basic.selected(),
      forgotten: profession_basic.forgotten()
    }
  }

  var pack_stats = function() {
    return {
      hp: parseInt($('#stat-purchased-hp').val()),
      mp: parseInt($('#stat-purchased-mp').val()),
      inf: parseInt($('#stat-purchased-inf').val()),
    }
  }

  var pack_acq = function() {
    return pack_rightside($('#skills-acquired'));
  }

  var pack_plan = function() {
    return pack_rightside($('#skills-planned'));
  }

  var pack_rightside = function(obj) {
    var a = new Array();

    obj.children().each(function() {
      if ($(this).hasClass('tool-separator')) {
        a.push({group: $(this).find('.tool-text').text()});
      } else if ($(this).hasClass('tool-stat-planner')) {
        a.push({stat: $(this).find('.tool-stat').text(), 
                nominal: parseInt($(this).find('.stat-cost').text())});
      } else if ($(this).hasClass('tool-checkin-planner')) {
        a.push({checkin: $(this).find('.tool-text').text(),
                nominal: parseInt($(this).find('.tool-value').text())});
      } else if ($(this).hasClass('tool-prof-planner')) {
        a.push({prof: $(this).find('.tool-option').text(),
                selected: $(this).find('.tool-prof-select').find(':selected').text(),
                nominal: parseInt($(this).find('.tool-prof-xp').text())});
      } else {
        a.push({skill: $(this).attr('id'),
                cost: parseInt($(this).find('.skill-cost').text()),
                alt: $(this).find('sup').length > 0});
      }
    })

    return a;
  }

  var set_pref = function(key, value) {
    prefs[key] = value
  }

  return {
    load: load,
    store: store,
    get_all: function() { return profiles; },
    get_current: function() { return data; },
    save_all: save_all,
    set_pref: set_pref,
    wipe: wipe
  }
}()