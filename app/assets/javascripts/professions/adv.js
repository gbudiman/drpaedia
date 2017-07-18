var profession_adv = (function() {
  var data;
  var update_timeout = setTimeout(null, 0);
  var available = {};
  var selected = {};
  var limit = 3;

  var build = function() {
    profession_adv_interface.build_modal();

    data = {};
    $.each(dynaloader.raw()['profession_advanced'], function(key, raw) {
      data[key] = new SParser(raw);
    })

    profession_adv_interface.render(data);
    profession_adv_interface.build_selector(data);
  }

  var update = function() {
    if (!dynaloader.get_gil('ok_to_update_gui')) return;
    var p = profile.get_current();

    if (p == undefined) return;
    if (!p['prefs'].advanced_acknowledged) return;

    clearTimeout(update_timeout);
    update_timeout = setTimeout(function() {
      var profile = get_profile_data();
      if (profile == null) return;

      var ag = new AgentGirl(get_profile_data());
      compute_advanced_profession_constraints(ag);
    }, 250);
  }

  var get_profile_data = function() {
    var h = {};
    var p = profile.get_current();
    var lookup = skills.get_all_code();

    if (p.stats == undefined) return null;

    h.hp = p.stats.hp;
    h.mp = p.stats.mp;
    h.professions = Object.keys(p.professions.selected);
    h.strain = p.strain;
    h.xp_sum = parseInt($('#xp-total-acquired').text()) + parseInt($('#xp-total-planned').text());
    h.lore_count = 0;
    h.psionic_basic = 0;
    h.psionic_intermediate = 0;
    h.psionic_advanced = 0;
    h.skills = new Array();

    $.each(p.acq.concat(p.plan), function(_junk, x) {
      if (x.skill != undefined) {
        var skill_code = x.skill;
        var skill_name = lookup[skill_code];

        h.skills.push(skill_name);
        if (skill_name.match(/^Lore/)) {
          h.lore_count++;
        } else if (skill_name.match(/^Psi I -/)) {
          h.psionic_basic++;
        } else if (skill_name.match(/^Psi II -/)) {
          h.psionic_intermediate++;
        } else if (skill_name.match(/^Psi III -/)) {
          h.psionic_advanced++;
        }
      }
    })

    return h;
  }

  var compute_advanced_profession_constraints = function(ag) {
    $.each(data, function(name, obj) {
      var s = obj.test(ag);
      var target = $('#advanced-list').find('div[data-adv="' + name + '"]');

      if (s.result) {
        target.removeClass('faded');

        profession_adv_interface.enable_select_button(name, true);
        available[name] = true;
      } else {
        target.addClass('faded');

        profession_adv_interface.enable_select_button(name, false);
        available[name] = false;
      }
      
      profession_adv_interface.display_readable(s, target.find('div.adv-requirement'), name);
    });

    profession_adv_interface.update_selector(available);
    validate_existing();
  }

  var validate_existing = function() {
    missing = new Array();

    $.each(selected, function(key, _junk) {
      if (!available[key]) {
        //console.log('notify: ' + key);
        missing.push(key);
        //notifier.adv_preq_missing(key);
      } else {
        //notifier.adv_preq_missing('');
      }
    })

    notifier.adv_preq_missing(missing.join(', '));
  }

  var is_profession = function(x) {
    return data[x] != undefined;
  }

  var reset = function() {
    selected = {};
    profile.save_all();
  }

  var set = function(x) {
    if (selected[x]) {
      delete selected[x];
    } else {
      selected[x] = true;
    }

    validate_count();
    profile.save_all();
    return selected[x] == undefined ? false : true;
  }

  var validate_count = function() {
    var count = Object.keys(selected).length;
    var overlimit = count - limit;

    profession_adv_interface.update_overlimit(overlimit);
  }

  return {
    build: build,
    data: function() { return data; },
    get_available: function() { return available; },
    is_profession: is_profession,
    is_selected: function(x) { return selected[x]; },
    reset: reset,
    set: set,
    selected: function() { return selected; },
    update: update,
    validate_existing: validate_existing
  }
})()