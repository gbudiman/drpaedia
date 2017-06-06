var skills = (function() {
  var data = {};
  var strain = null;
  var professions = {};
  var skill_hash = {};

  var build = function() {
    data = {};
    var r = dynaloader.raw();

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
          data[prepend + sub_k] = {
            shorthand: r.skill_list[sub_k],
            type: type,
            conditions: v,
            psi_level: psi_level
          }

          skill_hash[r.skill_list[sub_k]] = prepend + sub_k;
        })
      } else {
        data[k] = {
          shorthand: r.skill_list[k],
          type: 'normal',
          conditions: v
        }

        skill_hash[r.skill_list[k]] = k;
      }
    })

    $.each(r.concentration_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'conc',
        conditions: v
      }

      skill_hash[r.skill_list[k]] = k;
    })

    $.each(r.advanced_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'adv',
        conditions: v
      }

      skill_hash[r.skill_list[k]] = k;
    })

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
      is_satisfied = true;
      possible_costs[3] = true;
    }

    if (strain_match(d.conditions.innate_disadvantage)) {
      is_disadvantaged = true;
    }

    $.each(professions, function(profession, _junk) {
      if (d.conditions[profession] != undefined) {
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
    }
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
                                profession_adv.selected());

    return {
      strain: strain,
      professions: professions
    }
  }

  var get_data = function() { return data; }
  var get_hash = function(id) { return skill_hash[id]; }
  var get_cost = function(skill, key) {
    var g = data[skill].conditions;

    if (g[key] == null) {
      if (g.innate != undefined) { return 3; }
    }

    return g[key].cost;
  }
  var get_all_possible_costs = function(skill) {
    return constraint_satisfied(data[skill]).possible_costs;
  }

  var animate_pool_loading = function(func) {
    if (!dynaloader.get_gil('ok_to_animate')) {
      func();
    } else {

      $('#skill-pool').animate({
        opacity: 0.5
      }, 50, function() { 
        func();
        $('#skill-pool').css('opacity', 1);
      });
    }
    
  }

  var update_availability = function(reset_all) {
    //dynaloader.set_delegate('initial_load', calc.recalculate_all, function() {
    animate_pool_loading(function() {
      dynaloader.set_gil('ok_to_update_gui', false, function() {
        get_config();
        skill_popup.hide();
        var to_pool = new Array();
        if (reset_all) { skill_interface.reset_all(); }
        $.each(data, function(k, v) {
          var constraint = constraint_satisfied(v);
          if (constraint.is_satisfied) {
            skill_interface.display(v.shorthand, constraint.possible_costs, constraint.is_open);
          } else {
            //console.log(k + ' is no longer satisfied');
            skill_interface.remove(v.shorthand);
            to_pool.push(v.shorthand);
          }
        })

        // console.log(to_pool);
        // $.each(to_pool, function(i, x) {
        //   console.log('dropping to pool');
        //   dragdrop.drop_to_pool(x);
        // })

        dragdrop.drop_to_pool(to_pool);
        

        skill_interface.apply_filters();
      })

      //console.log(' !!! UA.sort() ');
      skill_interface.sort_pool();
      //console.log(' !!! update completed');
      //tooling.auto_indent($('#skills-acquired'));
      //tooling.auto_indent($('#skills-planned'));
      tooling.auto_indent_all();
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

  return {
    build: build,
    constraint_satisfied: constraint_satisfied,
    data: get_data,
    get_config: get_config,
    get_cost: get_cost,
    get_all_possible_costs: get_all_possible_costs,
    get_code: function(x) { return data[x].shorthand; },
    get_all_code: function() { return skill_hash; },
    get_name: function(x) { return skill_hash[x]; },
    has_tier: has_tier,
    hash: get_hash,
    update_availability: update_availability,
    validate: validate
  }
})()