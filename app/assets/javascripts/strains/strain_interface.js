var strain_interface = (function() {
  var selected_strain = null;

  var attach = function() {
    $('#strain-dd').on('changed.bs.select', function() {
      var new_value = $('#strain-dd').val();
      set(new_value);
    })
  }

  var build = function() {
    var raw = '<option class="default-no-selection">No Selection</option>';

    $.each(strains.data(), function(k, v) {
      raw += '<option>' + k + '</option>';
    })


    $('#strain-dd').append(raw);
    $('#strain-dd').selectpicker('refresh');
    attach();
  }

  var get_selected_strain = function() {
    return selected_strain;
  }

  var reset = function() {
    selected_strain = null;
  }

  var set = function(x) {
    selected_strain = x;
    profession_basic.update_strain_change();
    skills.update_availability(true);

    var stats = strains.data()[x].stats;
    stats_interface.update(stats.hp, stats.mp, stats.infection);
  }

  return {
    attach: attach,
    build: build,
    reset: reset,
    selected: get_selected_strain,
    set: set
  }
})()