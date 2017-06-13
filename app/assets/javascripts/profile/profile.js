var profile = function() {
  var old_profile = '';
  var debug = true;
  var selected = 'default';
  var profiles = {};
  var config = {};
  var deleted = {};
  var previous_primary = null;

  var postprocess_cost = {};

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

  var get_old_cookies = function() {
    return Cookies.getJSON();
  }

  var port_old_cookies = function() {
    var test_cookie = '26|26|Diesel Jocks|Cook,Fishmonger,Sniper,Marksman|AJ,AQ,AU,BH,BO,BP,BU,BX,BZ,CB,CK,CO,CQ,CR,CT,CZ,PA,PB,PC,DH,GC,GG,GH,GJ,GK,GN,GV,HC,HG|GD|1|AU9,GD6|1';
    var cookies = get_old_cookies();
    var transform = function(data) {
      var splits = data.split('|')
      var hp = parseInt(splits[0]);
      var mp = parseInt(splits[1]);
      var strain = splits[2].trim();
      var professions = {
        advanced: {},
        concentration: {},
        forgotten: {},
        selected: {}
      }
      var acqs = {};
      var plans = {};
      
      $.each(splits[3].trim().split(','), function(_junk, _x) {
        var x = _x.trim();
        if (profession_basic.is_profession(x)) {
          professions.selected[x] = true;
        } else if (profession_conc.is_profession(x)) {
          professions.concentration[x] = true;
        } else if (profession_adv.is_profession(x)) {
          professions.advanced[x] = true;
        }
      })

      $.each(splits[4].trim().split(','), function(_junk, x) {
        if (x.length < 2) return true;
        acqs[x] = {
          alt: false,
          skill: x
        }
      });

      $.each(splits[5].trim().split(','), function(_junk, x) {
        if (x.length < 2) return true;
        plans[x] = {
          alt: false,
          skill: x
        }
      });

      var adv_ack = (parseInt(splits[6]) == 1) ? true : false;
      var inf = parseInt(splits[8])

      $.each(splits[7].trim().split(','), function(_junk, x) {
        var skill_id = x.slice(0, 2);
        var skill_cost = parseInt(x.slice(2));

        if (skill_id.length < 2) return true;

        if (acqs[skill_id] != undefined) {
          acqs[skill_id].alt = true;
          acqs[skill_id].cost = skill_cost;
        } else if (plans[skill_id] != undefined) {
          plans[skill_id].alt = true;
          plans[skill_id].cost = skill_cost;
        }
      })

      if (strain.length == 0) strain = 'No Selection';
      var converted = {
        stats: { hp: hp, mp: mp, inf: inf },
        strain: strain,
        prefs: { advanced_acknowledged: adv_ack },
        acq: new Array(),
        plan: new Array(),
        professions: professions
      }

      $.each(acqs, function(x, data) {
        converted.acq.push(data);
      })

      $.each(plans, function(x, data) {
        converted.plan.push(data);
      })

      return converted;
    }

    var converted = transform(test_cookie);
    profiles['new3'] = converted;
    switch_to('new3');

    if (cookies.drpedia != undefined) {
      
      $.each(cookies.drpedia.split(','), function(_junk, header) {
        transform(cookies[heaader.trim()]);
      })
      
    }
  }

  var get_first_available = function() {
    var f = Object.keys(profiles)[0];
    return f;
  }

  var get_primary = function() {
    return config.primary;
  }

  var get_current_professions = function() {
    var s = profiles[selected].professions;
    return Object.assign({}, s.selected, s.concentration, s.advanced);
  }

  var set_primary = function(x) {
    config.primary = x;
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
    //var caller = arguments.callee.caller.toString();
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

  var force_save_all = function() {
    $.jStorage.set('all', { profiles: profiles, config: config });
  }

  var save_all_delayed = function(expected) {
    // console.log(expected + ' <> ' + selected);
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
    old_profile = new_value;
  }

  var load = function() {
    var v = $.jStorage.get('all');// || empty_default;
    var first_save = false;
    if (v == null) {
      v = empty_default;
      first_save = true;
    }
    profiles = v.profiles;
    config = v.config;
    selected = v.config.primary;

    if (first_save) {
      force_save_all();
    }

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
    profession_conc_interface.reset();
    profession_adv_interface.reset();
    skill_interface.reset_to_pool();
    $('#skills-acquired').empty();
    $('#skills-planned').empty();
    calc.recalculate_all();
  }

  var switch_to = function(new_value) {
    old_profile = selected;
    selected = new_value;
    dynaloader.set_gil('ok_to_sort', false);
    dynaloader.set_gil('ok_to_save', false, reset);
    dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);
    dynaloader.set_gil('ok_to_sort', true);
    skill_interface.sort_pool();

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

      $.each(d.professions.concentration, function(x, _junk) {
        profession_conc_interface.add(x);
      })

      $.each(d.professions.advanced, function(x, _junk) {
        profession_adv_interface.set_gui(x);
      })
    }

    stats_interface.set(d.stats);
    $.each(d.acq, function(i, x) {
      var post = apply_rightside(x, 'skills-acquired');
      if (post) {
        postprocess_cost[x.skill] = x.cost;
      }
    })

    $.each(d.plan, function(i, x) {
      var post = apply_rightside(x, 'skills-planned');
      if (post) {
        postprocess_cost[x.skill] = x.cost;
      }
    })

    apply_advanced_lock();

    tooling.compute_group($('#skills-acquired'));
    tooling.compute_group($('#skills-planned'));

    filterview.apply_all();
    skills.update_availability();

    profession_conc_interface.validate_existing();
    profession_basic.verify_count();
    calc.recalculate_all();
  }

  var apply_advanced_lock = function() {
    var ack = profiles[selected].prefs.advanced_acknowledged;
    profession_adv_interface.hide_unlock(ack);

    if (ack == false) {
      profession_adv_interface.set_list_gui(ack);
    }
  }

  var apply_rightside = function(entry, target) {
    var postprocess = null;

    if (entry.group != undefined) {
      if (target == 'skills-acquired') {
        tooling.copy_programmatically('tool-acq-group', target, { title: entry.group, is_collapsed: entry.is_collapsed })
      } else if (target == 'skills-planned') {
        tooling.copy_programmatically('tool-separator', target, { title: entry.group, is_collapsed: entry.is_collapsed })
      }
    } else if (entry.skill != undefined) {
      dragdrop.drop_selective(entry.skill, $('#' + target));
      //var alt = entry.alt ? '<sup>+</sup>' : '';
      //$('#' + entry.skill + '-cost').html(entry.cost + alt);
      if (entry.alt) {
        postprocess = entry.cost
      }
    } else if (entry.stat != undefined) {
      tooling.copy_programmatically('tool-stat-planner', target, { option: entry.stat, nominal: entry.nominal })
    } else if (entry.checkin != undefined) {
      tooling.copy_programmatically('tool-checkin-planner', target, { title: entry.checkin, nominal: entry.nominal })
    } else if (entry.prof != undefined) {
      tooling.copy_programmatically('tool-profession-planner', target, { option: entry.prof, nominal: entry.nominal, selected: entry.selected })
    }

    return postprocess;
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
      forgotten: profession_basic.forgotten(),
      concentration: profession_conc.selected(),
      advanced: profession_adv.selected()
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
      } else if ($(this).hasClass('skill')) {
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

  var set_acknowledge = function(val) {
    profiles[selected].prefs.advanced_acknowledged = val;
    save_all();
  }

  var get_all_skills = function() {
    var h = {};
    $.each(pack_acq().concat(pack_plan()), function(junk, x) {
      if (x.skill != undefined) {
        h[skills.get_name(x.skill)] = true;
      }
    })

    return h;
  }

  var has_skill = function(name) {
    var all_skills = get_all_skills()
    var names = Array.isArray(name) ? name : [name];
    var result = false;

    $.each(names, function(_junk, n) {
      result = result || (all_skills[n] != undefined);
    })

    return result;
  }

  return {
    apply: apply,
    copy_current_to: copy_current_to,
    create_empty: create_empty,
    load: load,
    store: store,
    get_all: function() { return profiles; },
    get_deleted: function() { return deleted; },
    get_current: function() { return profiles[selected]; },
    get_current_professions: get_current_professions,
    get_all_skills: get_all_skills,
    has_skill: has_skill,
    get_postprocess_cost: function() { return postprocess_cost; },
    get_current_name: function() { return selected; },
    get_old_name: function() { return old_profile; },
    get_master: function() { return $.jStorage.get('all'); },
    get_deleted: function() { return deleted; },
    get_primary: get_primary,
    set_primary: set_primary,
    rename: rename,
    port_old_cookies: port_old_cookies,
    save_all: save_all,
    save_all_delayed: save_all_delayed,
    set_pref: set_pref,
    soft_delete: soft_delete,
    undelete: undelete,
    set_acknowledge: set_acknowledge,
    switch_to: switch_to,
    wipe: wipe
  }
}()