var profile = function() {
  old_profile = '';
  debug = true;
  selected = 'default';
  profiles = {};
  config = {};
  deleted = {};
  previous_primary = null;

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

  var copy_current_to = function(new_value) {
    profiles[new_value] = profiles[selected];
    $.jStorage.set('all', { profiles: profiles, config: config });
    if (debug) console.log($.jStorage.get('all'));
  }

  var create_empty = function(new_value) {
    profiles[new_value] = default_prefs;
    if (config.primary == undefined) config.primary = new_value;
    switch_to(new_value);
    save_all();
  }

  var get_first_available = function() {
    var f = Object.keys(profiles)[0];
    return f;
  }

  var get_primary = function() {
    return config.primary;
  }

  var set_primary = function(x) {

    config.primary = x;
    console.log(x);
    console.log(config);
    save_all();
  }

  var soft_delete = function(name) {
    deleted[name] = profiles[name];
    delete profiles[name];

    if (Object.keys(profiles).length == 0) {
      create_empty('default');
    }

    if (name == config.primary) {
      config.primary = get_first_available() || 'default';
      previous_primary = name;
    }

    if (name == selected) {
      switch_to(config.primary);
    }


    save_all();
  }

  var undelete = function(name) {
    profiles[name] = deleted[name];
    delete deleted[name];
    if (previous_primary != null) {
      config.primary = previous_primary;
    }

    save_all();
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
    var caller = arguments.callee.caller.toString();
    if (dynaloader.get_gil('ok_to_save')) {
      // console.log(caller);
      store();
      $.jStorage.set('all', { profiles: profiles, config: config });
      if (debug) {
        console.log('Saving all...');
        console.log($.jStorage.get('all'));
      }
    }
  }

  var save_all_delayed = function(expected) {
    console.log(expected + ' <> ' + selected);
    if (expected == selected) {
      save_all();
    }
  }

  var rename = function(new_value) {
    profiles[new_value] = profiles[selected];
    delete profiles[selected];
    if (config.primary == selected) {
      config.primary = new_value;
    }

    selected = new_value;
    $.jStorage.set('all', { profiles: profiles, config: config });
    if (debug) console.log($.jStorage.get('all'));
    profile_interface.update_selected(new_value);
  }

  var load = function() {
    var v = $.jStorage.get('all') || empty_default;
    profiles = v.profiles;
    config = v.config;
    selected = v.config.primary;

    switch_to(selected);
    //dynaloader.set_gil('ok_to_save', false, reset);
    //dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);

    if (debug) {
      console.log('Loaded:');
      console.log(v);
    }

    return { profiles: profiles, config: config }
  }

  var reset = function() {
    strain_interface.set_gui(null);
    profession_basic_interface.reset();
    skill_interface.reset_to_pool();
    $('#skills-acquired').empty();
    $('#skills-planned').empty();
  }

  var switch_to = function(new_value) {
    old_profile = selected;
    selected = new_value;
    dynaloader.set_gil('ok_to_save', false, reset);
    dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);
    old_profile = selected;
    profile_interface.update_selected(selected);
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

    tooling.compute_group($('#skills-acquired'));
    tooling.compute_group($('#skills-planned'));
  }

  var apply_rightside = function(entry, target) {
    if (entry.group != undefined) {
      if (target == 'skills-acquired') {
        tooling.copy_programmatically('tool-acq-group', target, { title: entry.group, is_collapsed: entry.is_collapsed })
      } else if (target == 'skills-planned') {
        tooling.copy_programmatically('tool-separator', target, { title: entry.group, is_collapsed: entry.is_collapsed })
      }
    } else if (entry.skill != undefined) {
      dragdrop.drop_selective(entry.skill, $('#' + target));
      var alt = entry.alt ? '<sup>+</sup>' : '';
      $('#' + entry.skill + '-cost').html(entry.cost + alt);
    } else if (entry.stat != undefined) {
      tooling.copy_programmatically('tool-stat-planner', target, { option: entry.stat, nominal: entry.nominal })
    } else if (entry.checkin != undefined) {
      tooling.copy_programmatically('tool-checkin-planner', target, { title: entry.checkin, nominal: entry.nominal })
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
        //console.log($(this));
        var attr = $(this).attr('data-group-is-collapsed') || 'false';
        var is_collapsed = attr == 'false' ? false : true;
        a.push({group: $(this).find('.tool-text').text(),
                is_collapsed: is_collapsed});
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
    apply: apply,
    copy_current_to: copy_current_to,
    create_empty: create_empty,
    load: load,
    store: store,
    get_all: function() { return profiles; },
    get_current: function() { return data; },
    get_current_name: function() { return selected; },
    get_old_name: function() { return old_profile; },
    get_master: function() { return $.jStorage.get('all'); },
    get_deleted: function() { return deleted; },
    get_primary: get_primary,
    set_primary: set_primary,
    rename: rename,
    save_all: save_all,
    save_all_delayed: save_all_delayed,
    set_pref: set_pref,
    soft_delete: soft_delete,
    undelete: undelete,
    switch_to: switch_to,
    wipe: wipe
  }
}()