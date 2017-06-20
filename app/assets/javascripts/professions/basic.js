var profession_basic = (function() {
  var all = {};
  var restricted = {};
  var selected = {};
  var forgotten = {};
  var planned = {};
  var limit = 3;

  var add = function(x, _is_planned) {
    var is_planned = _is_planned == undefined ? false : _is_planned;

    if (is_planned) {
      planned[x] = true;
    } else {
      selected[x] = true;
    }
    profession_basic_interface.update_profession_added(x);

    if (!is_planned) {
      verify_count();
    }

    skills.update_availability(false);
  }

  var forget = function(x) {
    delete selected[x];
    forgotten[x] = true;
    verify_count();
    skills.update_availability(true);
  }

  var apply_plan = function(x) {
    if (planned[x] != undefined) {
      delete planned[x];
      selected[x] = true;
    }
  }

  var remove = function(x) {
    remove_delegate_update(x);
    verify_count();
    skills.update_availability(true);
  }

  var remove_delegate_update = function(x) {
    delete selected[x];
    delete forgotten[x];
    delete planned[x];
    profession_basic_interface.update_profession_removed(x);
  }

  var unforget = function(x) {
    selected[x] = true;
    delete forgotten[x];
    verify_count();
    skills.update_availability(false);
  }

  var reset = function() {
    restricted = {};
    selected = {};
    forgotten = {};
    limit = 3;
  }

  var adjust_limit = function(x) {
    limit = x;
  }

  var build = function() {
    var r = dynaloader.raw();
    $.each(r.professions, function(i, x) {
      all[x] = {};
    })

    profession_basic_interface.build('basic');
  }

  var get_all = function() {
    return all;
  }

  var get_restricted = function() {
    return restricted;
  }

  var get_selected = function() {
    return selected;
  }

  var is_profession = function(x) {
    return all[x] != undefined;
  }

  var reset_limit = function() {
    limit = 3;
  }

  var update_strain_change = function() {
    var new_strain = strain_interface.selected();
    //if (new_strain == 'No Selection') {
    if (strains.data()[new_strain] == undefined) {
      restricted = {};
    } else {
      restricted = strains.data()[strain_interface.selected()].restriction; //strain_interface.selected().restriction;
    }

    $.each(restricted, function(k, v) {
      remove_delegate_update(k);  
    })
    verify_count();
    skills.update_availability(true);

    profession_basic_interface.update_strain_change();
    tooling.update_planned_prof_list();
  }

  var verify_count = function() {
    var extra = special_case();
    var within_limit = Object.keys(selected).length <= limit + extra;
    var overlimit = Object.keys(selected).length - limit - extra;

    profession_basic_interface.disable_limit_warning(within_limit, overlimit);
    notifier.basic_overlimit(overlimit);
    profession_adv.update();
    calc.recalculate_purchased_profession();
    tooling.update_planned_prof_list();
    profile.save_all();
  }

  var special_case = function() {
    var has_special_2 = profile.has_skill(['Duality', 'Memories of Many']);
    var has_special_1 = profile.has_skill('Gun-Fu');

    if (has_special_2) return 2;
    if (has_special_1) return 1;
    return 0;
  }

  var get_purchaseable = function() {
    var s = {};

    $.each(all, function(k, v) {
      s[k] = true;
    })

    $.each(Object.assign({}, selected, forgotten, restricted), function(k, v) {
      delete s[k];
    })

    return s;
  }

  var get_forgettable = function() {
    return selected;
  }

  var get_valid_conc = function() {
    var h = {};
    var d = dynaloader.raw()['profession_concentration_hierarchy'];

    $.each(selected, function(basic, _junk) {
      h[d[basic]] = true;
    })

    return h;
  }

  var plan_clear = function() {
    planned = {};
  }

  return {
    add: add,
    apply_plan: apply_plan,
    forget: forget,
    remove: remove,
    unforget: unforget,
    all: get_all,
    build: build,
    reset: reset,
    is_profession: is_profession,
    restricted: get_restricted,
    selected: get_selected,
    planned: function() { return planned; },
    forgotten: function() { return forgotten; },
    update_strain_change: update_strain_change,
    get_purchaseable: get_purchaseable,
    get_forgettable: get_forgettable,
    get_valid_conc: get_valid_conc,
    verify_count: verify_count
  }
})()