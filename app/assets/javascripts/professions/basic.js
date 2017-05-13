var profession_basic = (function() {
  var all = {};
  var restricted = {};
  var selected = {};
  var forgotten = {};
  var limit = 3;

  var add = function(x) {
    selected[x] = true;
    profession_basic_interface.update_profession_added(x);
    verify_count();
    skills.update_availability(false);
  }

  var forget = function(x) {
    delete selected[x];
    forgotten[x] = true;
    verify_count();
    skills.update_availability(true);
  }

  var remove = function(x) {
    delete selected[x];
    profession_basic_interface.update_profession_removed(x);
    verify_count();
    skills.update_availability(true);
  }

  var unforget = function(x) {
    selected[x] = true;
    delete forgotten[x];
    verify_count();
    skills.update_availability(false);
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

  var reset_limit = function() {
    limit = 3;
  }

  var update_strain_change = function() {
    restricted = strain_interface.selected().restriction;
    $.each(restricted, function(k, v) {
      remove(k);
    })
    profession_basic_interface.update_strain_change();
  }

  var verify_count = function() {
    var within_limit = Object.keys(selected).length <= limit;
    var overlimit = Object.keys(selected).length - limit;

    profession_basic_interface.disable_limit_warning(within_limit, overlimit);
  }

  return {
    add: add,
    forget: forget,
    remove: remove,
    unforget: unforget,
    all: get_all,
    build: build,
    restricted: get_restricted,
    selected: get_selected,
    update_strain_change: update_strain_change
    
  }
})()