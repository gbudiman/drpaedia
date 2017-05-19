var tooling = function() {
  var popover_caller;
  var state;

  var attach = function() {
    attach_to('skills-planned');
    attach_dropdown_event();
  }

  var attach_dropdown_event = function() {
    $('button.dropdown-tool').on('click', function() {
      hide_popover();
      skill_popup.hide();
    })
  }

  var attach_to = function(target) {
    attach_object('tool-separator', target);
    attach_object('tool-stat-planner', target);
    attach_object('tool-checkin-marker', target);
    attach_object('tool-profession-planner', target);
  }

  var attach_object = function(type, target_id) {
    $('#' + type).on('click', function(event) {
      var target = $('#' + target_id);
      var cloned = $('#' + type + '-base').clone(true, true);
      cloned.removeAttr('id').appendTo(target);
      activate(cloned);
      auto_indent(target);
      event.preventDefault();
    })
  }

  var attach_handles = function(obj, enable) {
    if (enable) {
      if (obj.find('.glyphicon-arrow-up').length > 0) return;

      var down = ' <span class="glyphicon glyphicon-arrow-down"></span> ';
      var up = '<span class="glyphicon glyphicon-arrow-up pull-right"></span>';

      obj.prepend(down);
      obj.children().last().before(up);
      activate(obj);
    } else {
      obj.find('.glyphicon-arrow-up').remove();
      obj.find('.glyphicon-arrow-down').remove();
      obj.find('.glyphicon-option-vertical').remove();
    }
  }

  var activate = function(obj) {
    obj.find('.glyphicon-arrow-down').on('click', function() {
      move($(this).parent(), 'down');
      return false;
    })

    obj.find('.glyphicon-arrow-up').on('click', function() {
      move($(this).parent(), 'up');
      return false;
    })

    obj.find('.glyphicon-refresh').on('click', function() {
      alternate($(this).parent());
    })

    obj.find('.glyphicon-minus').on('click', function() {
      adjust($(this).parent(), -1);
    })

    obj.find('.glyphicon-plus').on('click', function() {
      adjust($(this).parent(), 1);
    })

    // $('.tool').find('.glyphicon-option-horizontal').on('click', function() {
    //   more_options($(this));
    // })

    obj.find('.tool-editable').editable({
      type: 'text',
      unsavedclass: null,
      placeholder: 'Enter new name...',
      value: ''
    }).on('shown', function() {
      //hide_popover();
      var that = $(this);
      var input = $('.editable-popup').find('input');

      if (that.text() == '<Unnamed>') {
        input.val('');
      } else {
        input.val(that.text());
      }

      $('.editable-popup').find('.editable-submit').off('click').on('click', function() {
        var caller = that;
        var new_value = $(this).parent().parent().find('input').val();
        if (new_value.trim().length == 0) {
          new_value = '<Unnamed>';
        }

        caller.editable('hide');
        caller.text(new_value);
      })
    })

    rebuild_prof_list(obj);

    $.each(obj.find('.glyphicon-option-horizontal'), function() {
      more_options($(this));
      $(this).on('click', function() {
        if (popover_caller != null) {
          popover_caller.popover('hide');
        }
        popover_caller = $(this);
        popover_caller.popover('toggle');
      })
    })

    if (!obj.hasClass('skill')) {
      obj.on('click', function() {
        dragdrop.select_tool($(this));
        return false;
      })
    }

    calc.recalculate_all();
  }

  var rebuild_prof_list = function(_obj) {
    var is_prof_sel = _obj.hasClass('tool-prof-planner');

    if (!is_prof_sel) return;
    _obj.find('.tool-prof-select').remove();
    var anchor = _obj.find('.tool-option');
    var pclass = anchor.text();

    console.log(pclass);
    //obj.empty();
    
    var s = ' <select class="tool-prof-select"><option>No selection</option>';
    var p;

    switch(pclass) {
      case 'Conc': break;
      case 'Basic': p = profession_basic.get_purchaseable(); break;
      case 'Forget': p = profession_basic.get_forgettable(); break;
    }
    $.each(p, function(k, _junk) {
      s += '<option>' + k + '</option>';
    })
    s += '</select>';

    $(s).insertAfter(anchor);
    //anchor.next().selectpicker();
  }

  var update_planned_prof_list = function() {
    $('#skills-planned').find('.tool-option').each(function() {
      var obj = $(this).next();
      var parent = $(this).parent();

      var current_selection = obj.find('option:selected').text();
      console.log(current_selection);

      rebuild_prof_list(parent);
      var sel = parent.find('.tool-prof-select');
      var sel2 = sel.find('option:contains("' + current_selection + '")');
      sel2.prop('selected', true);
      //.prop('selected', true);
      // $('.tool-prof-select option:contains("Distiller")').prop('selected', true)
    })
  }

  var adjust = function(obj, value) {
    hide_popover();
    var target = obj.find('.tool-value');
    var current_value = parseInt(target.text());

    if (value == -1) {
      if (current_value == 0) return;
    } 

    if (isNaN(current_value)) current_value = 0;

    target.text(current_value + value);
    calc.recalculate_planned_stats();
  }

  var alternate = function(obj) {
    hide_popover();
    var target = obj.find('.tool-option');

    if (target.text() == 'HP') {
      target.text('MP');
    } else if (target.text() == 'MP') {
      target.text('HP');
    } else if (target.text() == 'Basic') {
      target.text('Conc');
      obj.find('.tool-prof-xp').text('30');
      rebuild_prof_list(obj);
      calc.recalculate_planned_profession();
    } else if (target.text() == 'Conc') {
      target.text('Forget');
      obj.find('.tool-prof-xp').text('10');
      rebuild_prof_list(obj);
      calc.recalculate_planned_profession();
    } else if (target.text() == 'Forget') {
      target.text('Basic');
      obj.find('.tool-prof-xp').text('10');
      rebuild_prof_list(obj);
      calc.recalculate_planned_profession();
    }
  }

  var find_end_of_group_from = function(obj) {
    var current_obj = obj.next();
    var prev_obj = obj;

    while (current_obj.length > 0) {
      if (is_group(current_obj)) {
        return prev_obj;
      }

      prev_obj = current_obj;
      current_obj = current_obj.next();
    }

    return prev_obj;
  }

  var move = function(obj, direction) {
    var objs = new Array();
    hide_popover();
    var anchor;

    if (is_group(obj)) {
      var maybe_anchor;
      if (direction == 'up') {
        maybe_anchor = obj.prev();
      } else if (direction == 'down') {
        maybe_anchor = obj.next();
      }

      while (maybe_anchor.length > 0) {
        if (is_group(maybe_anchor)) {
          if (direction == 'down') {
            anchor = find_end_of_group_from(maybe_anchor);
          } else if (direction == 'up') {
            anchor = maybe_anchor;
          }
          break;
        }
        if (direction == 'up') {
          anchor = maybe_anchor;
          maybe_anchor = maybe_anchor.prev();
          
        } else if (direction == 'down') {
          anchor = maybe_anchor;
          maybe_anchor = maybe_anchor.next();
          
        }
      }
    } else {
      if (direction == 'up') {
        anchor = obj.prev();
      } else if (direction == 'down') {
        anchor = obj.next();
      }
    }

    if (anchor == null) return;

    objs.push(obj);

    if (is_group(obj)) {
      var current_obj = obj.next();
     
      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        objs.push(current_obj);
        current_obj = current_obj.next();
      } 
    }

    var ordered = objs;

    if (direction == 'down') {
      ordered = ordered.reverse();
    }

    $.each(objs, function(i, x) {
      if (direction == 'up') { 
        x.insertBefore(anchor); 
      }
      else if (direction == 'down') { 
        x.insertAfter(anchor); 
      }
    })

    auto_indent(obj.parent());
  }

  var auto_indent = function(_obj) {
    var obj = _obj;
    if (obj.attr('id') != 'skills-acquired' && obj.attr('id') != 'skills-planned') {
      obj = obj.parent();
      /*if (obj.hasClass('skill')) {
        obj = obj.parent();
      } else {
        alert('WARNING! Auto indent on unsupported container ' + obj.attr('id'));
        return;
      }*/
    }

    var state = 'init';
    obj.children().each(function() {
      var curr = $(this);

      indent(curr, false);
      if (is_group(curr)) {
        state = 'indent';
      } else {
        if (is_group(curr)) {
          // do not indent leading group
        } else if (state == 'indent') {
          indent(curr, true);
        }
      }
    })
  }

  var indent = function(obj, apply) {
    var marker_class = 'glyphicon-option-vertical';
    if (apply) {
      var s = '<span class="glyphicon ' + marker_class + '"></span>';
      obj.prepend(s);
    } else {
      obj.find('.' + marker_class).remove();
    }
  }

  var more_options = function(obj) {
    obj.popover({
      trigger: 'manual',
      html: true,
      content: generate_more_options(obj.parent()),
      placement: 'top'
    }).on('shown.bs.popover', function() {
      apply_popover_interactivity();
    })
  }

  var apply_popover_interactivity = function() {
    var popover = $('.popover');
    popover.find('.glyphicon').parent().css('cursor', 'pointer');

    attach_more_options_apply(popover.find('.glyphicon-ok').parent());
    attach_more_options_remove(popover.find('.glyphicon-remove').parent());
    attach_more_options_remove_group(popover.find('.glyphicon-remove-circle').parent());
    attach_close_popover(popover.find('.glyphicon-menu-down').parent());
  }

  var attach_more_options_remove = function(obj) {
    obj.on('click', function() {
      var cached = popover_caller.parent();
      popover_caller.parent().remove();

      calc.recalculate_all();
    })
  }

  var attach_more_options_remove_group = function(obj) {
    obj.on('click', function() {
      var objs = new Array();
      var current_obj = popover_caller.parent();
      objs.push(current_obj);
      current_obj = current_obj.next();

      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        objs.push(current_obj);
        current_obj = current_obj.next();
      }

      $.each(objs, function(i, x) {
        x.remove();
      })

      calc.recalculate_all();
    })
  }

  var attach_more_options_apply = function(obj) {
    obj.on('click', function() {
      var target = popover_caller.parent();

      dynaloader.set_delegate('initial_load', calc.recalculate_all, function() {
        if (target.hasClass('tool-separator')) {
          var stacks = new Array();
          var current_obj = target.next();

          while (current_obj.length > 0) {
            if (is_group(current_obj)) break;

            var cached_next = current_obj.next();
            if (apply_plan(current_obj)) {
              stacks.push(current_obj);
            }

            current_obj = cached_next;
          }

          $.each(stacks, function(i, x) {
            x.remove();
          })
        } 

        if (apply_plan(target)) {
          target.remove();
        }
      })

      return false;
    })
  }

  var apply_plan = function(obj) {
    if (obj.hasClass('tool-stat-planner')) {
      var option = obj.find('.tool-stat');
      if (option.length > 0) {
        stats_interface.adjust(option.text().toLowerCase(), 
                               parseInt(obj.find('.tool-text').text()));
      }

      return true;
    } else if (obj.hasClass('skill')) {
      dragdrop.drop_selective(obj.attr('id'), $('#skills-acquired'));
      return false;
    } else if (obj.hasClass('tool-prof-planner')) {
      var sel = obj.find('select option:selected').text();
      var is_forget = obj.find('.tool-option').text() == 'Forget';

      if (is_forget) {
        console.log(sel);
        $('.purchased-profession')
          .find('.forget-profession[data-prof="' + sel + '"]')
          .trigger('click');
      } else {
        $('[data-prof="' + sel + '"').trigger('click');
      }

      return true;
    }

    return true;
  }

  var attach_close_popover = function(obj) {
    obj.on('click', function() {
      popover_caller.popover('hide');
    });
  }

  var is_group = function(obj) {
    return obj.hasClass('tool-separator');
  }

  var hide_popover = function() {
    if (popover_caller == null) return;
    popover_caller.popover('hide');
  }

  var generate_more_options = function(obj) {
    var s = '';
    if (obj.hasClass('tool-applicable')) {
      s += '<div><span class="glyphicon glyphicon-ok"></span> Apply</div>';
    }


    s += '<div><span class="glyphicon glyphicon-remove"></span> Remove</div>';

    if (obj.hasClass('tool-separator')) {
      s += '<div><span class="glyphicon glyphicon-remove-circle"></span> Remove all in this group</div>';
    }


    s += '<div><hr/></div>';
    s += '<div><span class="glyphicon glyphicon-menu-down"></span> Close</div>';

    return s;
  }

  return {
    attach: attach,
    attach_handles: attach_handles,
    auto_indent: auto_indent,
    hide_popover: hide_popover,
    is_group: is_group,
    update_planned_prof_list: update_planned_prof_list
  }
}()