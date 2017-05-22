var profile = function() {
  debug = true;
  selected = 'default';

  var store = function() {
    data = {
      strain: pack_strain(),
      professions: pack_professions(),
      stats: pack_stats(),
      acq: pack_acq(),
      plan: pack_plan(),
      prefs: profiles[selected].prefs
    }

    profiles[selected] = data;
  }

  var save_all = function() {
    if (dynaloader.has_delegations('profile_apply')) { return; }

    store();
    $.jStorage.set('all', { profiles: profiles, config: config });
    if (debug) console.log($.jStorage.get('all'));
  }

  var load = function() {
    var v = $.jStorage.get('all', {
      profiles: {
        default: {
          prefs: {
            advanced_acknowledged: false
          }
        }
      },
      config: {
        primary: 'default'
      }
    })

    profiles = v.profiles;
    config = v.config;
    selected = config.primary;
    apply();

    return { profiles: profiles, config: config }
  }

  var apply = function() {
    dynaloader.set_delegate('profile_apply', calc.recalculate_all, function() {
      var d = profiles[selected];
      strain_interface.set_gui(d.strain);

      if (d.professions != undefined) {
        $.each(d.professions.selected, function(x, _junk) {
          profession_basic_interface.add(x);
        })

        $.each(d.professions.forgotten, function(x, _junk) {
          profession_basic_interface.add(x);
          profession_basic_interface.forget(x);
        })
      }
    })
  }

  var wipe = function() {
    $.jStorage.deleteKey('all');
  }

  var pack_strain = function() {
    return strain_interface.selected();
  }

  var pack_professions = function() {
    return {
      selected: profession_basic.selected(),
      forgotten: profession_basic.forgotten()
    }
  }

  var pack_stats = function() {
    return null;
  }

  var pack_acq = function() {
    return null;
  }

  var pack_plan = function() {
    return null;
  }

  var set_pref = function(key, value) {
    prefs[key] = value
  }

  return {
    load: load,
    store: store,
    get_all: function() { return profiles; },
    get_current: function() { return data; },
    save_all: save_all,
    set_pref: set_pref,
    wipe: wipe
  }
}()