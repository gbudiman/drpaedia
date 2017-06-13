var dynaloader = (function() {
  var raw_data = {};
  var proc_data = {};
  var delegate = {};
  var global_interlock = {
    ok_to_save: false,
    ok_to_update_gui: false,
    ok_to_animate: false,
    ok_to_sort: false,
  }

  var set_gil = function(key, value, func) {
    var keys;

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

  var load_message = function(x) {
    return new Promise(function(resolve, reject) {
      var anchor = $('#modal-loader').find('.last-message');

      var t = '<li><span class="glyphicon glyphicon-ok"></span>&nbsp;  &nbsp;' + x + '</li>';
      anchor.before(t);

      setTimeout(function() {
        resolve()
      }, 16);
    })
    
  }

  var clear_message = function() {
    $('#modal-loader').find('.last-message').remove();
    $('#modal-loader').modal('hide');
  }

  var load_remote = function() {
    $('#modal-loader').modal({

    })
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
      load_message('Irradiating wastelands').then(function() {
        profession_basic.build();
        profession_conc.build();
        profession_adv.build();
        load_message('Mutating survivors').then(function() {
          skills.build();
          load_message('Raising zombies').then(function() {
            filterview.attach();
            load_message('Splattering bloods').then(function() {
              stats_interface.attach();
              load_message('Attaching chainsaws').then(function() {
                tooling.attach();
                load_message('Drying up ocean').then(function() {
                  profile.port_old_cookies();
                  profile.load();
                  load_message('Setting up siege').then(function() {
                    profile_interface.build();
                    dynaloader.set_gil('ok_to_save', true);
                    dynaloader.set_gil('ok_to_update_gui', true);
                    dynaloader.set_gil('ok_to_animate', true);
                    dynaloader.set_gil('ok_to_sort', true);

                    //skills.update_availability();
                    load_message('Finalizing...').then(function() {
                      notifier.set_timeout(250);
                      skill_interface.set_timeout(250);
                      clear_message();
                    });
                  });
                });
              }); 
            });
          });
        });
      });  
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