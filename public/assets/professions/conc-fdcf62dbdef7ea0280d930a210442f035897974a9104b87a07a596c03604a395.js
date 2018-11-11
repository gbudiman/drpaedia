var profession_conc = (function() {
  var all = {};
  var selected = {};
  var planned = {};
  var limit = 2;

  var add = function(x, _is_planned) {
    var is_planned = _is_planned == undefined ? false : _is_planned;

    if (is_planned) {
      planned[x] = true;
    } else {
      selected[x] = true;
    }

    profession_conc_interface.update_profession_added(x);

    if (!is_planned) {
      verify_count();
    }

    skills.update_availability(false);
  }

  var apply_plan = function(x) {
    if (planned[x] != undefined) {
      delete planned[x];
      selected[x] = true;
    }
  }

  var remove = function(x) {
    delete selected[x];
    delete planned[x];

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
    notifier.conc_overlimit(overlimit);
    calc.recalculate_purchased_profession();
    tooling.update_planned_prof_list();
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

  var get_purchaseable = function() {
    var config = stats_interface.get_config();
    var valids = profession_basic.get_valid_conc();
    var result = {};

    if (Object.keys(selected).length >= 2) {
      return {'Limit reached': true}
    }

    $.each(all, function(conc, _junk) {
      if (selected[conc] != undefined) return true;
      var invalid = profession_conc_interface.validate_conc(conc, config, valids);

      if (Object.keys(invalid).length == 0) {
        result[conc] = true;
      }
    })

    return result;
  }

  return {
    add: add,
    apply_plan: apply_plan,
    build: build,
    get_purchaseable: get_purchaseable,
    is_profession: is_profession,
    remove: remove,
    reset: reset,
    selected: function() { return selected; },
    planned: function() { return planned; }
  }
})();
