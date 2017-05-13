var strains = (function() {
  var data = {};

  var build = function() {
    var r = dynaloader.raw();
    $.each(r.strains, function(i, x) {
      data[x] = {};
    })

    $.each(r.strain_specs, function(k, v) { data[k].specs = v; })
    $.each(r.strain_restriction, function(k, v) { data[k].restriction = v; })
    $.each(r.strain_stats, function(k, v) { data[k].stats = v; })

    strain_interface.build();
  }

  var get_data = function() {
    return data;
  }

  return {
    build: build,
    data: get_data
  }
})()