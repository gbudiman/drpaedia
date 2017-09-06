var filterview = (function() {
  var cache = {};
  var open_state = {};
  var apply_timeout = setTimeout(null, 0);

  var filters = {
    filter_accessible: true, //show accessible only
    filter_discounted: false, //show discounted only
    filter_lore: true, //hide lores
    filter_psionics: true, //hide psionics
    filter_adv: true, //hide advanced
    filter_npc: true, //hide NPC skills
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
    $('#filter-adv').on('click', function() {
      update('filter_adv', $(this).prop('checked'));
    })
    $('#filter-npc').on('click', function() {
      update('filter_npc', $(this).prop('checked'));
    })
  }

  var build_cache = function() {
    $.each(skills.get_all_code(), function(code, _junk) {
      cache[code] = {
        accessible: false,
        discounted: false,
        lore: false,
        psionics: false,
        adv: false,
        npc: false
      }

      //open_state[code] = false;
    });
  }

  var get_state_is_open = function(id, two_lore) {
    var c = cache[id];
    var f = filters;

    var show_only_accessible = f.filter_accessible ? c.accessible : true;
    var show_only_discounted = f.filter_discounted ? c.discounted : true;
    var show_lores = f.filter_lore ? !c.lore : true;
    var show_psionics = f.filter_psionics ? !c.psionics : true;
    var show_adv = f.filter_adv ? !c.adv : true;
    var show_npc = f.filter_npc ? !c.npc : true;

    return show_only_accessible
        && show_only_discounted
        && show_lores
        && show_psionics
        && show_adv
        && show_npc;
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
    var update_count = 0;
    //var ignore_cache = _ignore_cache == undefined ? false : _ignore_cache;

    //console.log('GIL: ' + dynaloader.get_gil('ok_to_update_gui'));

    var ignore_cache = true; // WUT???
    var two_lore = profile.get_strain() == 'Genjian' || profile.get_strain() == 'Saltwise';
    $.each(cache, function(id, _junk) {
      var new_state = get_state_is_open(id, two_lore);
      var last_state = open_state[id];

      if (ignore_cache 
       || (last_state == undefined || new_state != last_state)) {
        open_state[id] = new_state;
        if (new_state) { $('#skill-pool').find('#' + id).show(); }
        else { $('#skill-pool').find('#' + id).hide(); }
        update_count++;
      }
    })

    manager.log('filterview:apply ' + update_count + ' updated');

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
    filters.filter_adv = $('#filter-adv').prop('checked');
    filters.filter_npc = $('#filter-npc').prop('checked');

    //$('div[data-accessible]').show();

    clearTimeout(apply_timeout);
    apply_timeout = setTimeout(function() {
      apply();
    }, 250);
  }


  var set = function(id, x, val) {
    cache[id][x] = val;
  }

  var set_once = function(id, x) {
    switch(x) {
      case 'lore': cache[id][x] = true; break;
      case 'psionics': cache[id][x] = true; break;
      case 'adv': cache[id][x] = true; break;
      case 'npc': cache[id][x] = true; break;
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