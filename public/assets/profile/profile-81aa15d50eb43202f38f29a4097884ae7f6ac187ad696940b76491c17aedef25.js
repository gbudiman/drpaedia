var profile = function() {
  var old_profile = '';
  var debug = true;
  var selected = 'default';
  var profiles = {};
  var config = {};
  var deleted = {};
  var previous_primary = null;

  var postprocess_cost = {};

  var remote_timeout = setTimeout(null, 0);

  var is_read_only = false;
  var injected_profile = null;
  var read_only_warned = false;

  var sanitized = false;

  var empty_default = {
    profiles: {
      default: {
        prefs: { advanced_acknowledged: false }
      }
    },
    config: { primary: 'default',
              normally_synced: false }
  }

  var default_prefs = {
    prefs: { advanced_acknowledged: false }
  }

  var set_normally_synced = function(val) {
    config.normally_synced = val;
    save_all();
  }

  var sync = function(data) {
    deleted = {};
    config = data.config;
    selected = config.primary;
    profiles = data.profiles;

    $.jStorage.set('all', { profiles: profiles, config: config });
    switch_to(selected);
    profile_interface.update_list();
    profile_interface.update_selected(selected);
  }

  var copy_current_to = function(new_value) {
    profiles[new_value] = profiles[selected];
    //$.jStorage.set('all', { profiles: profiles, config: config });
    //if (debug) manager.log($.jStorage.get('all'));
    save_all();
  }

  var create_empty = function(new_value) {
    profiles[new_value] = default_prefs;
    if (config.primary == undefined) config.primary = new_value;

    $('#skill-pool').velocity({
      opacity: 0.5
    }, 50, function() {
      switch_to(new_value);
      profile_interface.update_list();
      profile_interface.update_selected(new_value);
      save_all();
    })
  }

  var get_old_cookies = function() {
    return Cookies.getJSON();
  }

  var port_old_cookies = function() {
    var test_cookie = '26|26|Diesel Jocks|Cook,Fishmonger,Sniper,Marksman|AJ,AQ,AU,BH,BO,BP,BU,BX,BZ,CB,CK,CO,CQ,CR,CT,CZ,PA,PB,PC,DH,GC,GG,GH,GJ,GK,GN,GV,HC,HG|GD|1|AU9,GD6|1';
    var test_c2 = '51|52|Mericans|Publican,Ring Leader,Scavenger,Civil Servant|AP,BF,BH,BK,BL,BP,BS,BY,CC,CE,CJ,CZ,PA,PB,PC,PD,DH,FW,GC,GD|XK|0|GC6|0';
    var cookies = get_old_cookies();
    var transform = function(data) {
      var splits = data.split('|')
      var hp = parseInt(splits[0] || 0);
      var mp = parseInt(splits[1] || 0);
      var strain = (splits[2] || '').trim();
      var professions = {
        advanced: {},
        concentration: {},
        forgotten: {},
        selected: {}
      }
      var acqs = {};
      var plans = {};
      
      $.each((splits[3] || '').trim().split(','), function(_junk, _x) {
        var x = (_x || '').trim();
        if (profession_basic.is_profession(x)) {
          professions.selected[x] = true;
        } else if (profession_conc.is_profession(x)) {
          professions.concentration[x] = true;
        } else if (profession_adv.is_profession(x)) {
          professions.advanced[x] = true;
        }
      })

      $.each((splits[4] || '').trim().split(','), function(_junk, x) {
        if (x.length < 2) return true;
        acqs[x] = {
          alt: false,
          skill: x
        }
      });

      $.each((splits[5] || '').trim().split(','), function(_junk, x) {
        if (x.length < 2) return true;
        plans[x] = {
          alt: false,
          skill: x
        }
      });

      var adv_ack = (parseInt(splits[6] || 0) == 1) ? true : false;
      var inf = parseInt(splits[8] || 0);

      $.each((splits[7] || '').trim().split(','), function(_junk, x) {
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

      converted.acq = converted.acq.reverse();
      converted.plan = converted.plan.reverse();

      return converted;
    }
    // profiles['new3'] = transform(test_cookie);
    // profiles['new4'] = transform(test_c2);
    // set_primary('new3');
    // $.jStorage.set('all', { profiles: profiles, config: config });

    // //switch_to('new4');
    // switch_to('new3');
    // profile_interface.update_list();
    // profile_interface.update_selected('new3');

    //profile_interface.update_selected();
    if (cookies.drpedia != undefined) {
      var existing_profiles = cookies.drpedia.split(',');
      var latch_header = null;

      $.each(existing_profiles, function(_junk, header) {
        profiles[header] = transform(cookies[header.trim()]);
        latch_header = header;
      });

      if (latch_header != null) {
        set_primary(latch_header);
      }

      $.jStorage.set('all', { profiles: profiles, config: config });
      switch_to(latch_header);
      profile_interface.update_list();
      profile_interface.update_selected(latch_header);

      Cookies.remove('drpedia');
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
      $('#skill-pool').velocity({
        opacity: 0.5
      }, 50, function() {
        switch_to(config.primary);
        save_all();
      })
    } else {
      save_all();
    }
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
    if (dynaloader.get_gil('ok_to_save') && dynaloader.get_gil('ok_to_delayed_save')) {
      if (is_read_only) {
        if (!read_only_warned) {
          notifier.notify_read_only();
        }
        
        read_only_warned = true;
        return;
      }

      var caller = arguments.callee.caller.toString();
      store();
      config.timestamp = Date.now();

      if (!sanitized) {
        $.each(profiles, function(profile, data) {
          if (data.prefs.normally_synced != undefined) {
            delete data.prefs.normally_synced;
          }

          sanitized = true;
        })
      }
      

      $.jStorage.set('all', { profiles: profiles, config: config });
      if (debug) {
        manager.log('Saving all...');
        manager.log($.jStorage.get('all'));
      }

      clearTimeout(remote_timeout);
      remote_timeout = setTimeout(function() {
        manager.log('sending request to server');
        remote._simulate_upload(remote.get_fresh_login());
      }, 1000);
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
    //$.jStorage.set('all', { profiles: profiles, config: config });
    //if (debug) manager.log($.jStorage.get('all'));
    save_all();
    profile_interface.update_selected(new_value);
    old_profile = new_value;
  }

  var load = function() {
    var v = $.jStorage.get('all');// || empty_default;
    var first_save = false;
    if (v == null) {
      v = empty_default;
      first_save = true;
      tour.start();
    }
    profiles = v.profiles;
    config = v.config;
    selected = v.config.primary;

    if (first_save) {
      force_save_all();
    }

    if (debug) {
      manager.log('Loaded:');
      manager.log(v);
    }

    if (config.normally_synced && remote.is_connected() == false) {
      //$('#link-to-fb').trigger('click');
    }
    
    switch_to(selected);
    //dynaloader.set_gil('ok_to_save', false, reset);
    //dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);

    return { profiles: profiles, config: config }
  }

  var precheck = function() {
    var v = $.jStorage.get('all');
    if (v == null) return true;

    var normally_synced = v.config.normally_synced;

    if (normally_synced) {
      var is_logged_in = $('#is-logged-in').attr('data-value');
      manager.log('sync status: ' + is_logged_in);

      if (is_logged_in == 'false') {
        window.location.replace('/survivors/auth/facebook');
        return false;
      }
    }

    return true;
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

  var inject = function(data) {
    injected_profile = data;
  }

  var switch_to = function(new_value, _read_only) {
    if (_read_only == undefined || _read_only == false) {
      is_read_only = false;
      //profile_interface.enable_editable_name(true);
    } else {
      is_read_only = true;
      read_only_warned = false;
      //profile_interface.enable_editable_name(false);
    }

    old_profile = selected;
    selected = new_value;

    dynaloader.set_gil('ok_to_delayed_save', false);
    dynaloader.set_gil('ok_to_sort', false);
    dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, reset);
    dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);
    dynaloader.set_gil('ok_to_sort', true);
    dynaloader.set_gil('ok_to_save', false, function() {
      skills.update_availability();
      skill_interface.sort_pool();
    })
    
    old_profile = selected;
    profile_interface.update_selected(selected, is_read_only);

    setTimeout(function() {
      dynaloader.set_gil('ok_to_delayed_save', true);
    }, 500);
  }

  var precompute_planned_professions = function(d) {
    var h = {};

    $.each(d, function(i, x) {
      if (x.prof != undefined) {
        h[x.selected] = {};
      }
    })

    skills.evaluate_planned(h)
  ;}

  var apply = function() {
    //dynaloader.set_delegate('profile_apply', calc.recalculate_all, function() {
    var d = is_read_only ? injected_profile : profiles[selected];
    postprocess_cost = {};

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
    skills.get_config();
    $.each(d.acq, function(i, x) {
      var post = apply_rightside(x, 'skills-acquired');
      if (post) postprocess_cost[x.skill] = x.cost;
    })

    precompute_planned_professions(d.plan);

    $.each(d.plan, function(i, x) {
      var post = apply_rightside(x, 'skills-planned');
      if (post) postprocess_cost[x.skill] = x.cost;
    })

    apply_advanced_lock();

    tooling.compute_group($('#skills-acquired'));
    tooling.compute_group($('#skills-planned'));

    filterview.apply_all();
    skills.update_availability(true);
    skills.validate();

    profession_conc_interface.validate_existing();
    profession_basic.verify_count();
    calc.recalculate_all();
  }

  var apply_advanced_lock = function() {
    var ack = (is_read_only ? injected_profile : profiles[selected]).prefs.advanced_acknowledged;
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
      dragdrop.drop_selective(entry.skill, $('#' + target), 'append');
      //var alt = entry.alt ? '<sup>+</sup>' : '';
      //$('#' + entry.skill + '-cost').html(entry.cost + alt);
      if (entry.alt) {
        var gap_cost = skills.get_all_possible_costs(skills.get_name(entry.skill));
        if (Object.keys(gap_cost).length >= 1) {
          postprocess = entry.cost
          //console.log(postprocess);
        }
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
    //load();
    //save_all();
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
                alt: $(this).find('.skill-cost').find('sup').length > 0});
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

  var get_acquired_skills_with_cost = function() {
    var h = {};
    $.each(pack_acq(), function(junk, x) {
      if (x.skill != undefined) {
        h[skills.get_name(x.skill)] = x;
      }
    })

    return h;
  }

  var simulate_profession_drop = function(x) {
    drop_simulator.attach();

    if (Object.keys(profession_conc.selected()).length > 0 || Object.keys(profession_adv.selected()).length > 0) {
      $('#modal-drop-simulator-body').text('Profession Drop Simulator does not support simulation when you already have Profession Concentration or Advanced Profession');
      $('#modal-drop-execute').hide();
      $('#modal-drop-simulator').modal('show');
      return;
    } else {
      $('#modal-drop-execute').show();
    }

    var enumerate_delta = function(s, oc, c) {
      var _s = {
        name: s,
        original_cost: oc
      }

      if (c.length == 0) {
        _s.status = 'refunded';
        _s.amount = oc;
      } else {
        // var min_dropped = Math.min.apply(null, Object.keys(c));
        // if (oc < min_dropped) {
        //   _s.status = 'taxed';
        //   _s.amount = min_dropped - oc;
        // }
        _s.sub = new Array();
        _s.global_satisfied = false;
        _s.min_cost = null;

        $.each(c, function(_junk, condition) {
          var sub = {};
          //console.log(condition);
          sub.origin = condition[2];
          if (sub.origin == 'Strain') {
            sub.origin += ': ' + get_strain();
          }

          if (condition[2] == 'Strain') {
            sub.predicate = 'strain';
            _s.global_satisfied = true;
            _s.min_cost = condition[0];
            _s.local_cost = condition[0];
          } else if (condition[1] == 'open') {
            sub.predicate = 'open';
            _s.global_satisfied = true;
            _s.min_cost = condition[0];
            _s.local_cost = condition[0];
          } else if (condition[1] != null) {
            //sub.predicate = condition[1].predicate;
            //sub.list = Object.keys(condition[1].list);

            var predicate = condition[1].predicate;
            var list = Object.keys(condition[1].list);
            var logic = null;

            _s.local_cost = condition[0];
            sub.predicate = predicate;
            sub.list = {};

            if (predicate == 'and') {
              logic = true;
            } else if (predicate == 'or') {
              logic = false;
            }

            $.each(list, function(_junk, l) {
              sub.list[l] = has_skill(l);

              if (predicate == 'and') {
                logic = logic && sub.list[l];
              } else if (predicate == 'or') {
                logic = logic || sub.list[l];
              }
            })

            sub.satisfied = logic;

            if (sub.satisfied) {
              sub.cost = condition[0];

              if (_s.min_cost == null) {
                _s.min_cost = sub.cost;
              } else {
                if (sub.cost < _s.min_cost) {
                  _s.min_cost = sub_cost;
                }
              }
            }

            _s.global_satisfied = _s.global_satisfied || sub.satisfied;
          } else {
            _s.global_satisfied = true;
            _s.min_cost = condition[0];
            _s.local_cost = condition[0];
          }

          _s.sub.push(sub);
        })

        if (_s.global_satisfied && _s.min_cost > oc) {
          _s.status = 'taxed';
          _s.amount = _s.min_cost - oc;
        }
      }

      //console.log(_s);

      var report = _s.name + "\n";
      $.each(_s.sub, function(_junk, d) {
        if (d.predicate == 'open') {
          report += 'Open ' + _s.local_cost;
        } else if (d.predicate == undefined) {
          report += '<< Unchanged >> ' + _s.local_cost;
        } else {
          var px = d.predicate == 'or' ? ' | ' : ' & ';
          var element = new Array();
          $.each(d.list, function(name, has_it) {
            element.push(name + ' (' + (has_it ? 'OK' : 'NO') + ')');
          })
          report += d.origin + ': ' + element.join(px) + ': ' + _s.local_cost + '\n';


        }

        
      })

      if (!_s.global_satisfied) {
        report += 'Refunded ' + oc;
      } else {
        if (_s.status == 'taxed') {
          report += 'Taxed ' + _s.amount;
        }
      }
      
      //console.log(report);

      return _s;
    };

    var write_report = function(r) {
      var anchor = $('#modal-drop-simulator-body');
      var t = '';
      var w = '';
      var summary = '';
      var tally = 0;

      anchor.empty();

      //console.log(r);

      $.each(r, function(_junk, entry) {
        w += '<tr>'
          +    '<td class="skillsim-highlight">' + entry.name + '</td>'
          +    '<td class="skillsim-original-cost">' + entry.original_cost + '</td>'
          +    '<td></td>'
          + '</tr>';

        $.each(entry.sub, function(_junk, d) {
          if (d.predicate == 'open') {
            w += '<tr class="sub-list">'
              +    '<td>Open</td>' 
              +    '<td>' + entry.local_cost + '</td>'
              +    '<td></td>'
              +  '</tr>';
          } else if (d.predicate == undefined) {

          } else {
            var px = d.predicate == 'or' ? ' OR ' : ' AND ';
            var element = new Array();
            $.each(d.list, function(name, has_it) {
              element.push(name + ' (' + (has_it ? '<span class="glyphicon glyphicon-ok" style="color: green"/>' 
                                                 : '<span class="glyphicon glyphicon-remove" style="color: red"/>') + ')');
            })
            w += '<tr class="sub-list">'
              +    '<td>' + d.origin
              +      ((element.length > 0) ? ': ' : '')
              +      element.join(px)
              +    '</td>'
              +    '<td>' + entry.local_cost + '</td>'
              +    '<td></td>'
              +  '</tr>';
          }
          
        })

        if (!entry.global_satisfied) {
          w += '<tr class="outcome-refunded">'
            +    '<td>Refunded</td>'
            +    '<td></td>'
            +    '<td>' + entry.original_cost + '</td>'
            +  '</tr>';

          tally += entry.original_cost;
        } else {
          if (entry.status == 'taxed') {
            w += '<tr class="outcome-taxed">'
              +    '<td>Taxed</td>'
              +    '<td></td>'
              +    '<td>' + entry.amount + '</td>'
              +  '</tr>';

            tally -= entry.amount;
          }
        }

        
      })


      if (tally < 0) {
        summary += '<tr class="tally-negative">'
          +    '<td>Requires additional XP</td>'
          +    '<td></td>'
          +    '<td class="tally-numeric">' + Math.abs(tally) + '</td>'
          +  '</tr>';
      } else {
        summary += '<tr class="tally-positive">'
          +    '<td>XP refunded</td>'
          +    '<td></td>'
          +    '<td class="tally-numeric">' + tally + '</td>'
          +  '</tr>';
      }
      $('#modal-drop-summary').empty().append(
        '<table class="table">'
        + summary
        + '</table>'
      );


      $('#modal-drop-profession').text(x);
      t += '<table class="table table-condensed">'
        +    '<thead>'
        +      '<tr>'
        +        '<th>Skill</th>'
        +        '<th>Cost</th>'
        +        '<th>&Delta;</th>'
        +      '</tr>'
        +    '</thead>'
        +    '<tbody>'
        +      w
        +    '</tbody>'
        +  '</table>';

      anchor.append(t);
      $('#modal-drop-simulator').modal('show');

    }

    var rems = Object.assign({}, get_current_professions());
    var deleted = x;
    var acquired_skills = get_acquired_skills_with_cost();
    var reports = new Array();
    delete rems[x];

    $.each(acquired_skills, function(skill, data) {
      var original_cost = data.cost;
      var costs = new Array();

      $.each(rems, function(profession, _junk) {
        var accessible = skills.is_accessible_by_profession(skill, profession);

        if (accessible) {
          //costs[accessible.cost] = accessible.preq;
          costs.push([accessible.cost, accessible.preq, profession]);
        }
      })

      if (Object.keys(costs).length == 0) {
        var by_strain = skills.is_accessible_by_strain(skill, get_strain());

        if (by_strain) {
          costs.push([3, by_strain == 'strain_accessible' ? null : by_strain, 'Strain']);
        } else {
          var open = skills.is_accessible_by_profession(skill, 'open')
          if (open) {
            //costs[open] = null;
            costs.push([open, 'open', 'Open'])
          }
        }
        
      }

      //console.log(skill);
      // console.log(costs);
      //console.log('---');

      reports.push(enumerate_delta(skill, original_cost, costs));
    })

    write_report(reports);
  }

  var get_skill_list = function(x) {
    var h = {};
    var pack = (x == 'planned' ? pack_plan() : pack_acq());

    $.each(pack, function(junk, x) {
      if (x.skill != undefined) {
        var skill_name = skills.get_name(x.skill);
        h[skill_name] = {
          xp: x.cost,
          mp: skills.get_mp(skill_name)
        }
      }
    });

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

  var get_root = function() {
    var h_root = $.jStorage.get('all');

    return {
      transmit: h_root,
      metadata: compute_metadata(h_root)
    }
  }

  var compute_metadata = function(h) {
    var metadata = {};

    var compute_acq = function(v) {
      var acq = v.acq;
      var stats = v.stats;
      var professions = v.professions;
      var strain = v.strain;
      var is_remnant = strain == 'Remnants';
      var basic_prof = Object.keys(professions.selected).length - 1;

      if (is_remnant) {
        basic_prof -= 1;
      }

      if (basic_prof < 0) basic_prof = 0;

      var xp = 0;

      $.each(acq, function(i, x) {
        if (x.cost != undefined) xp += x.cost;
      })

      xp += stats.hp;
      xp += stats.mp;
      xp += Object.keys(professions.advanced).length * 10;
      xp += Object.keys(professions.concentration).length * 30;
      xp += Object.keys(professions.forgotten).length * 10;
      xp += basic_prof * 10;

      return xp;
    }

    $.each(h.profiles, function(key, val) {
      if (val.acq == undefined) {
        metadata[key] = {
          acq: 0,
          plan: 0,
          professions: {},
          hp: 0,
          mp: 0,
          inf: 0,
          strain: 'No Selection',
          xp: 0
        }
      } else {
        metadata[key] = {
          acq: val.acq.length,
          plan: val.plan.length,
          professions: Object.assign({}, val.professions.advanced,
                                         val.professions.concentration,
                                         val.professions.selected),
          hp: val.stats.hp,
          mp: val.stats.mp,
          inf: val.stats.inf,
          strain: val.strain,
          xp: compute_acq(val)
        }
      }
    })

    return metadata;
  }

  var get_strain = function() {
    return pack_strain();
  }

  return {
    apply: apply,
    copy_current_to: copy_current_to,
    create_empty: create_empty,
    load: load,
    store: store,
    get_root: get_root,
    compute_metadata: compute_metadata,
    get_all: function() { return profiles; },
    get_deleted: function() { return deleted; },
    get_current: function() { return profiles[selected]; },
    get_current_professions: get_current_professions,
    get_all_skills: get_all_skills,
    get_acquired_skills_with_cost: get_acquired_skills_with_cost,
    get_skill_list: get_skill_list,
    has_skill: has_skill,
    get_postprocess_cost: function() { return postprocess_cost; },
    get_current_name: function() { return selected; },
    get_old_name: function() { return old_profile; },
    get_master: function() { return $.jStorage.get('all'); },
    get_deleted: function() { return deleted; },
    get_strain: get_strain,
    get_primary: get_primary,
    inject: inject,
    set_primary: set_primary,
    rename: rename,
    port_old_cookies: port_old_cookies,
    save_all: save_all,
    save_all_delayed: save_all_delayed,
    set_pref: set_pref,
    set_normally_synced: set_normally_synced,
    simulate_profession_drop: simulate_profession_drop,
    soft_delete: soft_delete,
    sync: sync,
    undelete: undelete,
    set_acknowledge: set_acknowledge,
    switch_to: switch_to,
    wipe: wipe,
    precheck: precheck
  }
}()
;
