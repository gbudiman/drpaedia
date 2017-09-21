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

    profession_basic_interface.trigger_filterview(x, true);
    profession_basic.update_strain_change();
    profession_adv.update();
    skills.update_strain_specific_lore(x);
    skills.update_availability(true);

    if (strains.data()[x]) {
      var stats = strains.data()[x].stats;
      stats_interface.update(stats.hp, stats.mp, stats.infection);
    } else {
      stats_interface.update(0, 0, 0);
    }
  }

  var set_gui = function(_x) {
    var x = _x == null ? 'No Selection' : _x;
    $('#strain-dd').selectpicker('val', x);
    set(x);
  }

  return {
    attach: attach,
    build: build,
    reset: reset,
    selected: get_selected_strain,
    set: set,
    set_gui: set_gui
  }
})()
;
