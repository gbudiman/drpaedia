var profession_adv_interface = (function() {
  var build_modal = function() {
    $('#modal-unlock-advanced').modal({
      show: false
    }).on('hidden.bs.modal', function() {
      // why bootstrap add padding-right upon close???
      $('body').css('padding-right', 0);
    })

    $('#adv-unlock').on('click', function() {
      $('#modal-unlock-advanced').modal('show');
    })

    $('#btn-dismiss-advanced-warning').on('click', function() {
      $('#modal-unlock-advanced').modal('hide');
      hide_unlock(true);
    })
  }

  var attach_selector = function() {
    $('#adv-selector').selectpicker({

    }).on('changed.bs.select', function() {
      update_gui($('#adv-selector').val());
    });
  }

  var attach_list_toggle = function() {
    $('#adv-list-toggle').change(function() {
      var val = $(this).prop('checked');

      set_list_toggle_state(val);
    })

    set_list_toggle_state($('#adv-list-toggle').prop('checked'));
  }

  var set_list_toggle_state = function(val) {
    if (val) {
      $('#advanced-list').fadeIn();
      $('#skill-pool').hide();
    } else {
      $('#advanced-list').hide();
      $('#skill-pool').fadeIn();
    }
  }

  var update_gui = function(val) {
    set(val);
    reinitialize_all_select_buttons();
    enable_select_button(val, true);
  }

  var set_list_gui = function(val) {
    $('#adv-list-toggle').bootstrapToggle(val ? 'on' : 'off');
  }

  var build_selector = function(data) {
    var raw = '<option class="default-no-selection">No Selection</option>';

    $.each(data, function(k, _junk) {
      raw += '<option value="' + k + '">' + k + '</option>';
    })

    $('#adv-selector').append(raw);
    $('#adv-selector').selectpicker('refresh');
    attach_selector();
    attach_list_toggle();
  }

  var reinitialize_all_select_buttons = function() {
    $('#advanced-list')
      .find('button[data-adv]')
        .text('Select')
        .prop('disabled', false);
  }

  var enable_select_button = function(name, value) {
    var selected = profession_adv.selected();
    var o = $('#advanced-list').find('button[data-adv="' + name + '"]');

    if (value) {
      if (selected[name] == undefined) {
        o.text('Select').prop('disabled', false).show();
      } else {
        o.text('Selected').prop('disabled', true).show();
      }
    } else {
      o.hide();
    }
  }

  var update_selector = function(data) {
    var s = $('#adv-selector');
    $.each(data, function(k, val) {
      var o = s.find('option[value="' + k + '"]');

      o.prop('disabled', !val);
    })

    s.selectpicker('refresh');
  }

  var hide_unlock = function(val) {
    if (val) {
      profile.set_acknowledge(true);
      profession_adv.update();
      $('#profession-adv-unlock').hide();
      $('#profession-adv-select-container').show();
    } else {
      $('#profession-adv-unlock').show();
      $('#profession-adv-select-container').hide();
    }
  }

  var display_readable = function(s, target, name) {
    var display = new Array();
    var highlight_in_list = function(list, _highlight) {
      if (_highlight == undefined) {
        return list.join(', ');
      } else {
        var highlight = _highlight;
        if (!Array.isArray(_highlight)) {
          highlight = new Array(_highlight);
        }

        var s = '';
        list.forEach(function(x) {
          if (highlight.indexOf(x) != -1) {
            s += '<span class="bg-success-alt">' + x + '</span>' + ', ';
          } else {
            s += x + ', ';
          }
        })

        return s.slice(0, -2);
      }
    }

    var unroll = function(composite, depth, context, _invert) {
      var invert = _invert == undefined ? false : _invert;

      if (composite.operator != undefined) {
        //console.log('Depth ' + depth + ' << ' + composite.operator.toUpperCase() + ' >>');

        var h = '';
        var s = '';
        switch(composite.operator) {
          case 'and': h = 'All:'; break;
          case 'or':  h = 'Any:'; break;
          case 'not': h = 'None:'; break;
        }

        s = Array((depth) * 4).join('&nbsp;') + (composite.result ? '✓ ' : '✗ ') + h;
        if (composite.result) {
          display.push('<span class="text-success">' + s + '</span>');
          //console.log(s);
        } else {
          display.push('<span class="text-danger">' + s + '</span>');
          //console.log(s);
        }

        composite.data.forEach(function(x) {
          unroll(x, depth + 1, context, composite.operator == 'not' ? true : false);
        })
        
      } else {
        var s = '';
        var p = composite.result ? '✓ ' : '✗ ';
        var h = '';
        switch(composite.condition[0]) {
          case 'p': 
            s += 'Profession: '; 
            s += highlight_in_list(composite.condition.slice(1), context.conditions.professions);
            break;
          case 'k': 
            s += 'Skill: '; 
            s += highlight_in_list(composite.condition.slice(1), context.conditions.skills);
            break;
          case 's': 
            s += 'Strain: '; 
            s += highlight_in_list(composite.condition.slice(1), context.conditions.strain);
            break;
          case 'xp_sum': 
            // buffer minimum XP to check when XP drops below minimum requirement
            // advanced_profession_min_xp[name] = parseInt(composite.condition[1])
            s += 'XP >= '; 
            s += composite.condition[1];
            break;
          case 'stat_sum':
            switch(composite.condition[1]) {
              case 'hp_or_mp': s += 'HP/MP >= '; break;
              case 'hp': s += 'HP >= '; break;
              case 'mp': s += 'MP >= '; break;
            }

            s += composite.condition[2];
            break;
          case 'lore_type':
            s += 'Lore skills count >= ';
            s += composite.condition[1];
            break;
          case 'psionic_type':
            switch(composite.condition[1]) {
              case 'basic': s += 'Basic Psionic skills >= '; break;
              case 'intermediate': s += 'Intermediate Psionic skills >= '; break;
              case 'advanced': s += 'Advanced Psionic skills >= '; break;
            }
            s += composite.condition[2];
            break;
        }

        s = Array(depth * 4).join('&nbsp') + p + s;// + composite.condition.slice(1).join(', ');

        if (invert) {
          composite.result = !composite.result;
        }

        if (composite.result) {
          display.push('<span class="text-success">' + s + '</span>');
          //console.log(s);  
        } else {
          display.push('<span class="text-danger">' + s + '</span>');
          //console.log(s);
        }
        
      }
    }

    //console.log(util.inspect(this.logical_trees, { showHidden: false, depth: null }));

    //var that = s;
    s.logical_trees.forEach(function(x) {
      unroll(x, 0, s);
    });

    target.html(display.join('<br />'))
  }

  var render = function(data) {
    var s = '';
    var t = '<div class="adv-requirement">'
          +   'Requirement here'
          + '</div>';
    var button = function(adv) {
      return '<button type="button" class="btn btn-primary btn-xs pull-right btn-adv" '
           +   'data-adv="' + adv + '" '
           +   '>'
           +   'Select'
           + '</button>';
    }

    $.each(data, function(name, _junk) {
      // var t = $('<div></div>')
      //           .addClass('adv-requirement')
      //           .hide()
      //           .append('Requirement here');

      // var s = $('<li></li>')
      //           .addClass('list-group-item')
      //           .addClass('faded')
      //           .addClass('clickable-advanced')
      //           //.addClass('col-xs-12 col-md-6 col-lg-4')
      //           .addClass('col-xs-12')
      //           .attr('p-adv', name)
      //           .append(name)
      //           .append(t)
      //           .append($('<button></button>')
      //                     .append('Select')
      //                     .attr('ap-name', name)
      //                     .addClass('btn btn-primary btn-xs pull-right btn-advanced-profession')
      //                     .on('click', function() {
      //                       $('.btn-advanced-profession').prop('disabled', false).text('Select');
      //                       $(this)
      //                         .prop('disabled', true)
      //                         .text('Selected')

      //                       $('#profession-selector').multiselect('select', name, true);

      //                       return false;
      //                     }))
      //           .on('click', function() {
      //             var target = $(this).find('.adv-requirement');

      //             if (target.is(':hidden')) {
      //               target.show();
      //             } else {
      //               target.hide();
      //             }
      //           });

      s += '<div class="adv faded" '
        +    'data-adv="' + name + '" '
        +    '>'
        +    name
        +    t
        +    button(name)
        +  '</div>'
    })

    $('#advanced-list').append(s);

    $('#advanced-list').find('div.adv').on('click', function() {
      var target = $(this).find('.adv-requirement');
      if (target.is(':hidden')) {
        target.show();
      } else {
        target.hide();
      }
    })

    $('#advanced-list').find('button.btn-adv').on('click', function() {
      var val = $(this).attr('data-adv');
      set_gui(val);
      return false;
    })
  }

  var reset = function() {
    profession_adv.reset();
    hide_unlock(false);
  }

  var set = function(x) {
    profession_adv.set(x);
    skills.update_availability(true);
  }

  var set_gui = function(val) {
    $('#adv-selector').selectpicker('val', val);
    update_gui(val);
  }


  return {
    build_modal: build_modal,
    build_selector: build_selector,
    display_readable: display_readable,
    enable_select_button: enable_select_button,
    hide_unlock: hide_unlock,
    update_selector: update_selector,
    update_gui: update_gui,
    render: render,
    reset: reset,
    set_gui: set_gui,
    set_list_gui: set_list_gui
  }
})()
