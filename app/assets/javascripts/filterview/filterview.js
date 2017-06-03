var filterview = (function() {
  var cache = {};
  var open_state = {};

  var filters = {
    filter_accessible: true, //show accessible only
    filter_discounted: false, //show discounted only
    filter_lore: true, //hide lores
    filter_psionics: true, //hide psionics
    filter_advanced: true, //hide advanced
  }

  var attach = function() {
    $('#filter-accessible').on('click', function() {
      update('filter_accessible', $(this).prop('checked'));
    })
    $('#filter-discounted').on('click', function() {
      update('filter_discounted', $(this).prop('checked'));
    })
    $('#filter-lore').on('click', function() {
      update('filter_lore', $(this).prop('checked'));
    })
    $('#filter-psionics').on('click', function() {
      update('filter_psionics', $(this).prop('checked'));
    })
  }

  var build_cache = function() {
    $.each(skills.get_all_code(), function(code, _junk) {
      cache[code] = {
        accessible: false,
        discounted: false,
        lore: false,
        psionics: false,
        advanced: false
      }

      //open_state[code] = false;
    });
  }

  var get_state_is_open = function(id) {
    var c = cache[id];
    var f = filters;

    var show_only_accessible = f.filter_accessible ? c.accessible : true;
    var show_only_discounted = f.filter_discounted ? c.discounted : true;
    var show_lores = f.filter_lore ? !c.lore : true;
    var show_psionics = f.filter_psionics ? !c.psionics : true;

    return show_only_accessible
        && show_only_discounted
        && show_lores
        && show_psionics;
  }

  var update = function(target, value) {
    filters[target] = value;
    apply();
  }

  var t = function(id) {
    return skills.get_name(id);
  }

  var apply = function() {
    var has_result = false;

    $.each(cache, function(id, _junk) {
      var new_state = get_state_is_open(id);
      var last_state = open_state[id];

      if (last_state == undefined || new_state != last_state) {
        open_state[id] = new_state;
        if (new_state) { $('#skill-pool').find('#' + id).show(); }
        else { $('#skill-pool').find('#' + id).hide(); }
      }
    })

    $.each(open_state, function(_junk, val) {
      if (val) {
        has_result = true;
        return false;
      }
    })

    if (has_result) {
      $('#skill-pool-no-result').hide();
    } else {
      $('#skill-pool-no-result').show();
    }
  }

  var apply_all = function() {
    filters.filter_accessible = $('#filter-accessible').prop('checked');
    filters.filter_discounted = $('#filter-discounted').prop('checked');
    filters.filter_lore = $('#filter-lore').prop('checked');
    filters.filter_psionics = $('#filter-psionics').prop('checked');

    //$('div[data-accessible]').show();
    apply();
  }

  var set = function(id, x, val) {
    cache[id][x] = val;
  }

  var set_once = function(id, x) {
    switch(x) {
      case 'lore': cache[id][x] = true; break;
      case 'psionics': cache[id][x] = true; break;
      case 'advanced': cache[id][x] = true; break;
    }
  }

  return {
    apply_all: apply_all,
    attach: attach,
    build_cache: build_cache,
    cache: function() { return cache; },
    set: set,
    set_once: set_once
  }
})()