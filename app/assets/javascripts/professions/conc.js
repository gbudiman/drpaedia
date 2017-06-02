var profession_conc = (function() {
  var all = {};
  var selected = {};
  var limit = 2;

  var add = function(x) {
    selected[x] = true;
    profession_conc_interface.update_profession_added(x);
    verify_count();
    skills.update_availability(false);
  }

  var remove = function(x) {
    delete selected[x];
    profession_conc_interface.update_profession_removed(x);
    verify_count();
    skills.update_availability(true);
  }

  var reset = function() {
    selected = {};
    limit = 2;
  }

  var verify_count = function() {
    var within_limit = Object.keys(selected).length <= limit;
    var overlimit = Object.keys(selected).length - limit;

    profession_conc_interface.disable_limit_warning(within_limit, overlimit);
    calc.recalculate_purchased_profession();
    profile.save_all();
  }

  var build = function() {
    var r = dynaloader.raw()['profession_concentration_group']
    $.each(r, function(g, sg) {
      $.each(sg, function(_junk, x) {
        all[x] = {};
      })
    })

    profession_conc_interface.build(r);
  }

  var is_profession = function(x) {
    return all[x] != undefined;
  }

  return {
    add: add,
    build: build,
    is_profession: is_profession,
    remove: remove,
    reset: reset,
    selected: function() { return selected; }
  }
})()