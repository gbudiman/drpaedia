var dynaloader = (function() {
  var raw_data = {};
  var proc_data = {};
  var delegate = {};
  var global_interlock = {
    ok_to_save: false,
    ok_to_update_gui: false,
    ok_to_animate: false
  }

  var set_gil = function(key, value, func) {
    if (!Array.isArray(key)) {
      keys = [key];
    } else {
      keys = key;
    }

    $.each(keys, function(i, x) {
      global_interlock[x] = value;
    })
    

    if (func != undefined) {
      var negated = !value;
      func();

      $.each(keys, function(i, x) {
        global_interlock[x] = negated;
      })
    }
  }

  var get_gil = function(key) {
    return global_interlock[key];
  }

  var load_remote = function() {
    $.when(get_json('advanced_cat'),
           get_json('concentration_cat'),
           get_json('profession_advanced'),
           get_json('profession_concentration_group'),
           get_json('profession_concentration_hierarchy'),
           get_json('profession_concentrations'),
           get_json('profession_extension'),
           get_json('professions'),
           get_json('skill_cat'),
           get_json('skill_countered'),
           get_json('skill_counters'),
           get_json('skill_group'),
           get_json('skill_list'),
           get_json('skill_mp_cost'),
           get_json('strain_restriction'),
           get_json('strain_specs'),
           get_json('strain_stats'),
           get_json('strains')).done(function() {
      dynaloader.set_gil('ok_to_save', false);
      dynaloader.set_gil('ok_to_update_gui', false);
      strains.build();
      profession_basic.build();
      profession_conc.build();
      skills.build();
      filterview.attach();
      stats_interface.attach();
      tooling.attach();  
      profile.load();
      profile_interface.build();

      dynaloader.set_gil('ok_to_save', true);
      dynaloader.set_gil('ok_to_update_gui', true);
      dynaloader.set_gil('ok_to_animate', true);

      skills.update_availability();
    })
  }

  var get_json = function(path) {
    return $.getJSON('/' + path + '.json', function(d) {
      raw_data[path] = d;
    })
  }

  var get_raw_data = function() {
    return raw_data;
  }

  return {
    load_remote: load_remote,
    raw: get_raw_data,
    set_gil: set_gil,
    get_gil: get_gil,
    get_all_gil: function() { return global_interlock; }
  }
})()