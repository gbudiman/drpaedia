var profession_adv = (function() {
  var data;
  var update_timeout = setTimeout(null, 0);
  var available = {};
  var selected = {};

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

    clearTimeout(update_timeout);
    update_timeout = setTimeout(function() {
      var ag = new AgentGirl(get_profile_data());

      compute_advanced_profession_constraints(ag);
    }, 250);
  }

  var get_profile_data = function() {
    var h = {};
    var p = profile.get_current();
    var lookup = skills.get_all_code();

    h.hp = p.stats.hp;
    h.mp = p.stats.mp;
    h.professions = Object.keys(p.professions.selected);
    h.strain = p.strain;
    h.xp_sum = parseInt($('#xp-total-acquired').text()) + parseInt($('#xp-total-planned').text());
    h.lore_count = 0;
    h.psi1_count = 0;
    h.psi2_count = 0;
    h.psi3_count = 0;
    h.skills = new Array();

    $.each(p.acq.concat(p.plan), function(_junk, x) {
      if (x.skill != undefined) {
        var skill_code = x.skill;
        var skill_name = lookup[skill_code];

        h.skills.push(skill_name);
        if (skill_name.match(/^Lore/)) {
          h.lore_count++;
        } else if (skill_name.match(/^Psi I -/)) {
          h.psi1_count++;
        } else if (skill_name.match(/^Psi II -/)) {
          h.psi2_count++;
        } else if (skill_name.match(/^Psi III -/)) {
          h.psi3_count++;
        }
      }
    })

    return h;
  }

  var compute_advanced_profession_constraints = function(ag) {
    var enable_advanced_profession_selector = function(name, value) {
      var o = $('#advanced-list').find('button[data-adv="' + name + '"]');
      if (value) {
        o.show();
      } else {
        o.hide();
      }
    }

    $.each(data, function(name, obj) {
      var s = obj.test(ag);
      var target = $('#advanced-list').find('div[data-adv="' + name + '"]');

      if (s.result) {
        target
          .removeClass('faded')
          .find('.btn-advanced-profession').show();

        enable_advanced_profession_selector(name, true);
        available[name] = true;
      } else {
        //enable_ap_select_button(name, true);
        target
          .addClass('faded')
          .find('.btn-advanced-profession').hide();

        enable_advanced_profession_selector(name, false);
        available[name] = false;
      }
      
      profession_adv_interface.display_readable(s, target.find('div.adv-requirement'), name);
    });

    profession_adv_interface.update_selector(available);
  }

  var is_profession = function(x) {
    return data[x] != undefined;
  }

  var set = function(x) {
    selected = {};
    selected[x] = true;
  }

  return {
    build: build,
    data: function() { return data; },
    get_available: function() { return available; },
    is_profession: is_profession,
    set: set,
    selected: function() { return selected; },
    update: update
  }
})()