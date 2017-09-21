var skills = (function() {
  var data = {};
  var strain = null;
  var professions = {};
  var skill_hash = {};
  var counters = {};
  var countered = {};
  var planned = {};
  var by_profession = {};

  var cache_available = {};
  var cache_update = {};

  var add_to_cache = function(x) {
    if (cache_available[x] == undefined) {
      cache_update[x] = true;
      //console.log('adding ' + x);
    }
  }

  var overwrite_cache = function() {
    Object.assign(cache_available, cache_update);
  }

  var get_by_profession = function(x) {
    if (by_profession[x] == undefined) {
      build_by_profession(x);
    }

    return by_profession[x];
  }

  var build_by_profession = function(x) {
    by_profession[x] = {};

    $.each(data, function(k, d) {
      if (d.conditions[x] != undefined) {
        by_profession[x][get_code(k)] = true;
      }
    })
  }

  var build = function() {
    data = {};
    var r = dynaloader.raw();
    var mp = r.skill_mp_cost;

    $.each(r.skill_cat, function(k, v) {
      if (r.skill_group[k] != undefined) {
        var type;
        var prepend = '';
        var psi_level = -1;

        if (k.match(/lore/i)) {
          type = 'lore';
        } else if (k.match(/psionic/i)) {
          type = 'psionics';
          if (k.match(/basic/i)) {
            prepend = 'Psi I - ';  
            psi_level = 1;
          } else if (k.match(/interm/i)) {
            prepend = 'Psi II - ';
            psi_level = 2;
          } else if (k.match(/adv/i)) {
            prepend = 'Psi III - ';
            psi_level = 3;
          }
          
        }


        $.each(r.skill_group[k], function(sub_k, sub_v) {
          var w = data[prepend + sub_k];

          if (w == undefined) {
            data[prepend + sub_k] = {
              shorthand: r.skill_list[sub_k],
              type: type,
              conditions: v,
              psi_level: psi_level,
              mp_cost: mp[sub_k]
            }
          } else {
            var mod = data[prepend + sub_k].conditions;

            $.each(v, function(mk, mv) {
              if (!mk.match(/^innate/)) {
                mod[mk] = mv;
              }
            })
          }

          skill_hash[r.skill_list[sub_k]] = prepend + sub_k;
        })
      } else {
        data[k] = {
          shorthand: r.skill_list[k],
          type: 'normal',
          conditions: v,
          mp_cost: mp[k],
          unique: Object.keys(v).filter(x => !x.match(/innate/)).length == 1
        }

        skill_hash[r.skill_list[k]] = k;
      }
    })

    $.each(r.skill_group['NPC'], function(k, _junk) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'npc',
        conditions: { open: 0 },
        mp_cost: 0
      }

      skill_hash[r.skill_list[k]] = k;
    })

    $.each(r.concentration_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'conc',
        conditions: v,
        mp_cost: mp[k]
      }

      skill_hash[r.skill_list[k]] = k;
    })

    $.each(r.advanced_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'adv',
        conditions: v,
        mp_cost: mp[k]
      }

      skill_hash[r.skill_list[k]] = k;
    })

    data['Lore - Animals - Aquatic'].type = 'lore';
    data['Lore - Mon Histories'].type = 'lore';
    
    counters = r.skill_counters;
    countered = r.skill_countered;
    

    filterview.build_cache();
    skill_interface.build(data);
    update_availability(false);
    skill_popup.attach();
    dragdrop.attach();
  }

  var constraint_satisfied = function(d) {
    var is_satisfied = false;
    var possible_costs = {};
    var is_open = false;
    var is_disadvantaged = false;
    var satisfied_profession = {};

    if (d.conditions.open != undefined) { 
      is_satisfied = true; 
      possible_costs[d.conditions.open] = true;
      is_open = true;
    }

    if (strain_match(d.conditions.innate_disabled)) {
      return {
        is_satisfied: false
      }
    }

    if (strain_match(d.conditions.innate)) {
      satisfied_profession['open'] = true;
      is_satisfied = true;
      possible_costs[3] = true;
    }

    if (strain_match(d.conditions.innate_disadvantage)) {
      is_disadvantaged = true;
    }

    $.each(professions, function(profession, _junk) {
      if (d.conditions[profession] != undefined) {
        satisfied_profession[profession] = true;
        is_satisfied = true;
        possible_costs[d.conditions[profession].cost] = true;
      }
    })

    if (is_disadvantaged) {
      var cached = Object.keys(possible_costs);
      possible_costs = {};
      $.each(cached, function(i, x) {
        possible_costs[x * 2] = true;
      })
    }

    return {
      is_satisfied: is_satisfied,
      possible_costs: possible_costs,
      is_open: is_open,
      is_disadvantaged: is_disadvantaged,
      satisfied_profession: satisfied_profession
    }
  }

  var evaluate_planned = function(init) {
    var get_planned_professions = function() {
      var metaplan = {};
      //planned = {};

      $('#skills-planned').find('.tool-prof-select').each(function() {
        var p = $(this).val();
        //planned[p] = {};
        metaplan[p] = {};
      })

      return metaplan;
    }

    var clear_current_plan = function() {
      var metaplan = init == undefined ? get_planned_professions() : init;

      $.each(planned, function(k, v) {
        if (metaplan[k] == undefined) {
          if (profession_basic.is_profession(k)) {
            profession_basic.remove(k);
          } else if (profession_conc.is_profession(k)) {
            profession_conc.remove(k)
          }
        }
      })

      skill_interface.unmark_planned(planned);
      planned = metaplan;
    }

    clear_current_plan();
    //get_planned_professions();

    $.each(planned, function(k, v) {
      if (profession_basic.is_profession(k)) {
        profession_basic.add(k, true);
      } else if (profession_conc.is_profession(k)) {
        profession_conc.add(k, true);
      }

      planned[k] = get_by_profession(k);
    })

    skill_interface.mark_planned(planned);
  }

  var apply_plan = function(x) {
    skill_interface.unmark_profession(planned[x]);
    delete planned[x];
  }

  var strain_match = function(a) {
    var is_found = false;
    $.each(a, function(i, x) {
      if (x == strain) {
        is_found = true;
        return false;
      }
    })

    return is_found;
  }

  var get_config = function() {
    strain = strain_interface.selected();
    professions = Object.assign({}, 
                                profession_basic.selected(), 
                                profession_conc.selected(),
                                profession_adv.selected(),
                                profession_basic.planned(),
                                profession_conc.planned())
    
    return {
      strain: strain,
      professions: professions
    }
  }

  var get_data = function() { return data; }
  var get_hash = function(id) { return skill_hash[id]; }
  var get_cost = function(skill) {
    var g = data[skill].conditions;
    var min = 99999;
    $.each(g, function(key, val) {
      if (typeof(val) == 'object') {
        var current_min = val.cost;
        if (current_min < min) min = current_min;
      }
    })

    return min;
  }

  var get_mp = function(skill) {
    return data[skill].mp_cost;
  }

  var get_all_possible_costs = function(skill) {
    return constraint_satisfied(data[skill]).possible_costs;
  }

  var get_interaction = function(x) {
    return {
      counters: counters[x],
      countered: countered[x]
    }
  }

  var animate_pool_loading = function(func) {
    func();
    var do_postprocess = function() {
      $.each(profile.get_postprocess_cost(), function(id, val) {
        $('#' + id + '-cost')
          .html(val + '<sup>+</sup>');
      })
    }

    if (!dynaloader.get_gil('ok_to_animate')) {
      func();
      do_postprocess();
      calc.recalculate_all();
    } else {

      $('#skill-pool').velocity({
        opacity: 0.5
      }, 250, function() { 
        func();
        do_postprocess();
        calc.recalculate_all();
        $('#skill-pool').css('opacity', 1);
      });
    }
    
  }

  var is_accessible_by_profession = function(skill, profession) {
    return data[skill].conditions[profession];
  }

  var is_accessible_by_strain = function(skill, strain) {
    if (data[skill].conditions.innate.indexOf(strain) != -1) {
      var innate_preq = data[skill].conditions.innate_preq;

      if (innate_preq) {
        return innate_preq[strain];
      } else {
        return 'strain_accessible';
      }
    }
  }

  var update_strain_specific_lore = function(strain) {
    var aquatic = data['Lore - Animals - Aquatic'].shorthand;
    var monhist = data['Lore - Mon Histories'].shorthand;
    filterview.cascade_two_lore_cache(aquatic, strain == 'Saltwise' ? false : true);
    filterview.cascade_two_lore_cache(monhist, strain == 'Genjian' ? false : true);
  }

  var update_availability = function(reset_all, _only_materialized) {
    if (dynaloader.get_gil('ok_to_update_gui') == false) return;
    var only_materialized = _only_materialized == undefined ? false : _only_materialized;

    var make_inverted_professions = function() {
      var inv = {};
      var pos = 0;
      $.each(professions, function(k, _junk) {
        if (profession_basic.is_profession(k)) {
          inv[k] = pos;
          pos++;
        }
      })

      return inv;
    }

    var apply_profession_signets = function(basic_profs) {
      var length = Object.keys(basic_profs).length + 1;
      var cell_length = 100.00 / length;
      var bs_col_factor = 'width: ' + cell_length + '%';

      $.each(basic_profs, function(k, v) {
        var offset = 'left: ' + cell_length * (v + 1) + '%';
        var style = 'style="' + bs_col_factor + '; ' + offset + '; float: left; position: relative"';

        var anchor = $('#config-bar').find('span.basic-prof-name:contains("' + k + '")').parent();
        var signet = '<div class="row signet-clear"></div>'
                   + '<div class="config-signet signet-' + v + '" '
                   +   style
                   + '/>'
                   + '<div class="row signet-clear"></div>';

        anchor.find('div.config-signet').remove();
        anchor.find('div.signer-clear').remove();
        anchor.append(signet);
      })
      
    }

    var batch_render = function(queue) {
      var qkeys = Object.keys(queue);
      var key_length = qkeys.length;
      var inv = make_inverted_professions();

      apply_profession_signets(inv);

      for (var i = 0; i < key_length; i++) {
        var shorthand = qkeys[i];
        var val = queue[shorthand];

        switch (val.mode) {
          case 'display': 
            skill_interface.display(shorthand, 
                                    val.costs, 
                                    val.is_open, 
                                    val.satisfied_profession, 
                                    inv);
            break;
          case 'remove':
            skill_interface.remove(shorthand);
            break
        }
      }
    }

    //dynaloader.set_delegate('initial_load', calc.recalculate_all, function() {
    return new Promise(function(resolve, reject) {
      animate_pool_loading(function() {
        dynaloader.set_gil('ok_to_update_gui', false, function() {
          manager.log(' -- UA begin');
          var h = get_config();
          var to_pool = new Array();
          var render_queue = {};

          skill_popup.hide();
          
          if (reset_all) skill_interface.reset_all(); 

          $.each(data, function(k, v) {
            var constraint = constraint_satisfied(v);

            if (constraint.is_satisfied) {
              //skill_interface.display(v.shorthand, constraint.possible_costs, constraint.is_open);

              //add_to_cache(skills.get_code(k));
              render_queue[v.shorthand] = {
                mode: 'display',
                costs: constraint.possible_costs,
                is_open: constraint.is_open,
                satisfied_profession: constraint.satisfied_profession
              }
            } else {
              //console.log(k + ' is no longer satisfied');
              //skill_interface.remove(v.shorthand);

              render_queue[v.shorthand] = { mode: 'remove' }
              to_pool.push(v.shorthand);
            }
          })

          // console.log(to_pool);
          // $.each(to_pool, function(i, x) {
          //   console.log('dropping to pool');
          //   dragdrop.drop_to_pool(x);
          // })

          batch_render(render_queue);
          dragdrop.drop_to_pool(to_pool);
          

          skill_interface.apply_filters();
          //overwrite_cache();

          resolve(true);
          //console.log(' -- UA completed');
        })

        //console.log(' !!! UA.sort() ');
        skill_interface.sort_pool();
        //console.log(' !!! update completed');
        //tooling.auto_indent($('#skills-acquired'));
        //tooling.auto_indent($('#skills-planned'));
        tooling.auto_indent_all();
        resolve(false);
        validate();
      })
    })
  }

  var has_tier = function(skill) {
    return skill.match(/\s(I|II|III|IV|V)$/);
  }

  var is_open = function(skill) {
    return data[skill].conditions.open != undefined;
  }

  var validate = function() {

    //if (dynaloader.has_delegations('initial_load')) { return; }
    if (!dynaloader.get_gil('ok_to_update_gui')) return;
    var all = skill_interface.get_all_unselected();
    var all_valid = true
    var messages = {};

    get_config();
    $.each(all, function(k, _junk) {
      var valid_prof_t = validate_by_profession(data[k].conditions, all);
      var valid_strain_t = validate_by_strain(data[k].conditions, all);

      messages[k] = new Array();
      if (!valid_prof_t.cond) {
        if (!is_open(k)) {
          messages[k].push(valid_prof_t.message);
        }
      }

      if (!valid_strain_t.cond) {
        //messages[k] = Object.assign(messages[k] || '', valid_strain_t.message);
        if (valid_strain_t.message.length > 0) {
          messages[k].push(valid_strain_t.message);
        }
      }

      //console.log(k + ' -> ' + valid_strain_t.cond + ' || ' + valid_prof_t.cond);

      all_valid = all_valid && (valid_strain_t.cond || valid_prof_t.cond);  

      if (valid_strain_t.cond || valid_prof_t.cond) {
        delete messages[k];
      }
    })

    notifier.skill_preq_missing(all_valid, messages);
    notifier.psis_preq_missing();
  }

  var validate_by_profession = function(obj, all) {
    var cond = false;
    var message = {};
    $.each(professions, function(p, _junk) {
      if (obj[p] != undefined) {
        var eval = validate_condition(obj[p].preq, all);

        cond = cond || eval.cond;
        message = eval.missing;
      }
    });

    $.each(Object.keys(message), function(_junk, skill_name) {
      var constraint = constraint_satisfied(data[skill_name]);

      if (constraint.is_satisfied == false) {
        delete message[skill_name];
      }
    })

    return {
      cond: cond,
      message: message
    }
  }

  var validate_by_strain = function(obj, all) {
    var cond = false;
    var strain_found = false;

    $.each(obj.innate, function(i, x) {
      if (x == strain) {
        strain_found = true;
        return false;
      }
    })

    if (!strain_found) { return { cond: false, message: '' }}
    if (obj.innate_preq == undefined) { return { cond: true, message: '' }};
    $.each(obj.innate_preq, function(s, v) {
      var eval = validate_condition(v, all);
      cond = cond || eval.cond;
      message = eval.missing;
    })

    return {
      cond: cond,
      message: message
    }
  }

  var validate_condition = function(preq, all) {
    if (preq == null) { return {cond: true, missing: {} }; }
    var cond = preq.predicate == 'and' ? true : false;
    var missing = {};

    $.each(preq.list, function(k, _junk) {
      if (all[k] == undefined) {
        if (preq.predicate == 'and') { cond = cond && false; }
        else if (preq.predicate == 'or') { cond = cond || false; }

        missing[k] = true;
      } else {
        if (preq.predicate == 'and') { cond = cond && true; }
        else if (preq.predicate == 'or') { cond = cond || true; }
      }
    })

    return {
      cond: cond,
      missing: missing
    }
  }

  var get_code = function(x) {
    return data[x].shorthand;
  }

  return {
    build: build,
    constraint_satisfied: constraint_satisfied,
    data: get_data,
    evaluate_planned: evaluate_planned,
    get_config: get_config,
    get_cost: get_cost,
    get_mp: get_mp,
    get_all_possible_costs: get_all_possible_costs,
    get_code: get_code,
    get_all_code: function() { return skill_hash; },
    get_name: function(x) { return skill_hash[x]; },
    get_delta: function() { return cache_update; },
    apply_plan: apply_plan,
    get_by_profession: get_by_profession,
    get_interaction: get_interaction,
    has_tier: has_tier,
    hash: get_hash,
    is_accessible_by_profession: is_accessible_by_profession,
    is_accessible_by_strain: is_accessible_by_strain,
    update_strain_specific_lore: update_strain_specific_lore,
    update_availability: update_availability,
    validate: validate
  }
})()