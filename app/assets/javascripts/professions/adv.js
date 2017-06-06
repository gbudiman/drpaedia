var profession_adv = (function() {
  var data;
  var update_timeout = setTimeout(null, 0);

  var build = function() {
    profession_adv_interface.build_modal();

    data = {};
    $.each(dynaloader.raw()['profession_advanced'], function(key, raw) {
      data[key] = new SParser(raw);
    })

    profession_adv_interface.render(data);
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
      //var o = $('#setup-profession input[value="' + name + '"]');

      // if (value == false) {
      //   // disable
      //   o.prop('disabled', true);
      //   if (o.prop('checked') && ok_to_trigger_advanced_profession_removal) {
      //     console.log(name + ' has been deselected due to unmet constraint');
      //     $('#alert-deselection').show();
      //     $('#alert-deselection-text').text('Advanced Profession ' + name + ' has been deselected due to unmet constraints');
      //     $('#profession-selector').multiselect('deselect', name, true);
      //   }

      //   if (!o.parent().hasClass('text-muted')) {
      //     o.parent().addClass('text-muted');
      //   }
      // } else {
      //   o.prop('disabled', false)
      //    .parent().removeClass('text-muted');
      // }
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
      } else {
        //enable_ap_select_button(name, true);
        target
          .addClass('faded')
          .find('.btn-advanced-profession').hide();

        enable_advanced_profession_selector(name, false);
      }
      
      profession_adv_interface.display_readable(s, target.find('div.adv-requirement'), name);
    });
  }

  return {
    build: build,
    data: function() { return data; },
    update: update
  }
})()