var dynaloader = (function() {
  var raw_data = {};
  var proc_data = {};

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
      strains.build();
      profession_basic.build();
      skills.build();
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
    raw: get_raw_data
  }
})()