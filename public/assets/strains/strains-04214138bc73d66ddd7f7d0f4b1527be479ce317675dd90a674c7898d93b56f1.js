var strains = (function() {
  var data = {};
  var lut = {};

  var build = function() {
    var r = dynaloader.raw();
    $.each(r.strains, function(i, x) {
      data[x] = {};
    })

    $.each(r.strain_specs, function(k, v) { 
      data[k].specs = v; 
      $.each(v, function(_junk, strain_skills) {
        $.each(strain_skills, function(_junk, strain_skill) {
          lut[strain_skill] = true;
        })
      });
    })
    $.each(r.strain_restriction, function(k, v) { data[k].restriction = v; })
    $.each(r.strain_stats, function(k, v) { data[k].stats = v; })

    strain_interface.build();
  }

  var get_data = function() {
    return data;
  }

  var get_innate = function(strain) {
    return data[strain].specs.advantages.concat(data[strain].specs.disadvantages);
  }

  var is_strain_skill = function(k) {
    return lut[k] != undefined;
  }

  return {
    build: build,
    data: get_data,
    get_innate: get_innate,
    is_strain_skill: is_strain_skill
  }
})()
;
