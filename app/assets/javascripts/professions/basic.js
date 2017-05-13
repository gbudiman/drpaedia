var profession_basic = (function() {
  var all = {};
  var restricted = {};
  var selected = {};

  var add = function(x) {
    selected[x] = true;
  }

  var remove = function(x) {
    delete selected[x];
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

  var update = function() {
    restricted = strain_interface.selected.restriction;
  }

  return {
    add: add,
    remove: remove,
    all: get_all,
    build: build,
    selected: get_selected,
    restricted: get_restricted,
    update: update
  }
})()