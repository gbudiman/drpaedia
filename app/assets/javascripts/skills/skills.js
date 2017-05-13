var skills = (function() {
  var data = {};
  var strain = null;
  var professions = {};
  var skill_hash = {};

  var build = function() {
    data = {};
    var r = dynaloader.raw();
    skill_hash = r.skill_list;

    $.each(r.skill_cat, function(k, v) {
      if (r.skill_group[k] != undefined) {
        var type;
        var prepend = '';

        if (k.match(/lore/i)) {
          type = 'lore';
        } else if (k.match(/psionic/i)) {
          type = 'psionics';
          if (k.match(/basic/i)) {
            prepend = 'Psionics Basic - ';  
          } else if (k.match(/interm/i)) {
            prepend = 'Psionics Intermediate - ';
          } else if (k.match(/adv/i)) {
            prepend = 'Psionics Advanced - ';
          }
          
        }

        $.each(r.skill_group[k], function(sub_k, sub_v) {
          data[prepend + sub_k] = {
            shorthand: r.skill_list[sub_k],
            type: type,
            conditions: v
          }
        })
      } else {
        data[k] = {
          shorthand: r.skill_list[k],
          type: 'normal',
          conditions: v
        }
      }
    })

    $.each(r.concentration_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'conc',
        conditions: v
      }
    })

    skill_interface.build(data);
    update_availability(false);
  }

  var constraint_satisfied = function(d) {
    var is_satisfied = false;
    var possible_costs = {};
    var is_open = false;

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

    $.each(professions, function(profession, _junk) {
      if (d.conditions[profession] != undefined) {
        is_satisfied = true;
        possible_costs[d.conditions[profession].cost] = true;
      }
    })

    return {
      is_satisfied: is_satisfied,
      possible_costs: possible_costs,
      is_open: is_open
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
    professions = Object.assign({}, profession_basic.selected());
  }

  var get_data = function() { return data; }

  var update_availability = function(reset_all) {
    get_config();
    if (reset_all) { skill_interface.reset_all(); }
    $.each(data, function(k, v) {
      var constraint = constraint_satisfied(v);
      if (constraint.is_satisfied) {
        skill_interface.display(v.shorthand, constraint.possible_costs, constraint.is_open);
      }
    })

    skill_interface.apply_filters();
  }

  return {
    build: build,
    data: get_data,
    update_availability: update_availability
  }
})()