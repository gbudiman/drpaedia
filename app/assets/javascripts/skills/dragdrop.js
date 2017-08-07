var dragdrop = (function() {
  var selected = {};
  var last_trigger = null;
  var right_side_selected = false;
  var debug = false;
  var non_skill_trigger = null;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle_drag($(this).attr('id'));
      return false;
    })

    $('#skills-acquired').on('click', function() { drop($(this)); });
    $('#skills-planned').on('click', function() { drop($(this)); });

    $('div.tool-checkin-planner').on('click', function() { select_non_skill($(this)); });
    $('div.tool-stat-planner').on('click', function() { select_non_skill($(this)); });
    $('div.tool-prof-planner').on('click', function() { select_non_skill($(this)); });


    $('div.tool-separator').on('click', function() {
      select_non_skill($(this), true);
    })

    //$('#skill-pool').find('[data-accessible]').on('click', function() { drop_alphabetically($(this)); })
  }

  var enable_debug = function(x) {
    debug = x;
  }

  var handle_drag = function(id) {
    select(id, selected[id] != undefined);
  }

  var highlight_drop_handle = function(mask) {
    var enable = Object.keys(selected).length > 0;
    disable_rightside_interactivity(enable, false);
    if (enable) {
      $('#skill-pool').addClass('drop-highlight');
      $('#skills-acquired').addClass('drop-highlight');
      $('#skills-planned').addClass('drop-highlight');
      $('.tool-separator').addClass('drop-highlight-group');

      mask.removeClass('drop-highlight drop-highlight-group');

      //$('#' + last_trigger).parent().removeClass('drop-highlight');
    } else {
      $('#skill-pool').removeClass('drop-highlight');
      $('#skills-acquired').removeClass('drop-highlight');
      $('#skills-planned').removeClass('drop-highlight');
      $('.tool-separator').removeClass('drop-highlight-group');
    }
  }

  var disable_rightside_interactivity = function(val, plan_only) {
    var target = ['#skills-planned'];

    if (plan_only == false) {
      target.push('#skills-acquired');
    }

    if (val) {
      $.each(target, function(_junk, _x) {
        var x = $(_x);
        x.find('.glyphicon-arrow-up').hide();
        x.find('.glyphicon-arrow-down').hide();
        //x.find('.badge.pull-right').hide();
        x.find('.glyphicon-option-horizontal').hide();
        x.find('.glyphicon-menu-up').hide()
        x.find('.glyphicon-menu-down').hide()
        x.find('.glyphicon-minus').hide();
        x.find('.glyphicon-plus').hide();
        x.find('.glyphicon-refresh').hide();
        //x.find('span.pull-right').hide();
        x.find('.tool-editable').editable('disable');
      });
    } else {
      $.each(target, function(_junk, _x) {
        var x = $(_x);
        x.find('.glyphicon-arrow-up').show();
        x.find('.glyphicon-arrow-down').show();
        //x.find('.badge.pull-right').show();
        x.find('.glyphicon-option-horizontal').show();
        x.find('.glyphicon-menu-up').show()
        x.find('.glyphicon-menu-down').show()
        x.find('.glyphicon-minus').show();
        x.find('.glyphicon-plus').show();
        x.find('.glyphicon-refresh').show();
        //x.find('span.pull-right').show();
        x.find('.tool-editable').editable('enable');
      });
    }
  }

  var rectify_drop_parent = function(obj) {
    if (!tooling.is_group(obj) && !obj.hasClass('drop-container')) {
      return obj.parent();
    }

    return obj;
  }

  var drop = function(_obj, prepend) {
    //console.log('dropping to ' + obj.attr('id'));

    //console.log(last_trigger + ' <> ' + obj.attr('id'));
    /*if (Object.keys(selected).length == 0) return;
    if (last_trigger == obj.attr('id')) return;
    if ($('#' + last_trigger).parent().attr('id') == obj.attr('id')) return;
*/

    var obj = _obj == undefined ? $('<div/>') : _obj;
    var drop_to_pool = obj.attr('id') == 'skill-pool';
    var parent_container = obj;
    $.each(selected, function(id, v) {
      var to_append = $('#' + id);

      if (obj.hasClass('tool-separator')) {
        parent_container = obj.parent();
        animate_translocate(to_append, function() {
          to_append.insertAfter(obj);
        });
        tooling.attach_handles(to_append, true);
      } else if (drop_to_pool) {
        drop_alphabetically();
        tooling.attach_handles(to_append, false);
        // console.log(' !!! Normal drop : sort() ');
        skill_interface.sort_pool();
      } else {
        rectified_obj = rectify_drop_parent(obj);
        if (prepend != undefined) {
          to_append.show().prependTo(rectified_obj);
        } else {
          to_append.show().appendTo(rectified_obj);
        }
        tooling.attach_handles(to_append, true);
      }
    })

    skill_popup.destroy();
    deselect_all();
    highlight_drop_handle(false);
    tooling.auto_indent(parent_container);
    tooling.compute_group($('#skills-planned'));
    tooling.compute_group($('#skills-acquired'));
    tooling.auto_indent_all();
    calc.recalculate_skills();
    skills.validate();
    profession_basic.verify_count();
    profession_conc_interface.validate_existing();
    profession_adv.update();
    profile.save_all();
  }

  var animate_translocate = function(obj, func) {
    obj.hide();

    func();

    obj.show().css('opacity', 0).velocity({
      opacity: 1
    }, 1000)
  }

  var drop_selective = function(id, obj, append) {
    deselect_all();
    selected[id] = true;
    drop(obj, (append == 'append' ? undefined : 'prepend'));
  }

  var drop_to_pool = function(id, _with_force_filterview) {
    var with_force_filterview = _with_force_filterview == undefined ? false : _with_force_filterview;
    deselect_all();

    if (Array.isArray(id)) {
      $.each(id, function(_junk, x) {
        selected[x] = true;
      })
    } else {
      selected[id] = true;
    }

    drop_alphabetically();
    skill_interface.sort_pool();
  }

  var drop_alphabetically = function() {
    $.each(selected, function(id, v) {
      var obj = $('#' + id);
      var skill_name = skills.hash(id);
      var anchor;

      tooling.attach_handles(obj, false);
      /*$.each($('#skill-pool').find('[data-accessible]'), function() {
        var current_search = $(this).text();
        if (debug) console.log('current search = ' + current_search);

        if (current_search > skill_name) {
          anchor = $(this).attr('id');
          console.log('insert ' + skill_name + ' before ' + current_search);
          return false;
        }
      })

      if (anchor != null) {
        obj.insertBefore($('#' + anchor));
      } else {
        $('#skill-pool').append(obj);
      }*/
      $('#skill-pool').append(obj);
      reset_animation_state(obj);
      // skill_interface.sort_pool();
    })

    deselect_all();
    highlight_drop_handle(false);
    tooling.compute_group($('#skills-planned'));
    tooling.compute_group($('#skills-acquired'));
    tooling.auto_indent_all();
    skill_popup.destroy();
    calc.recalculate_skills();
    skills.validate();
    profession_basic.verify_count();
    profession_conc_interface.validate_existing();
    profession_adv.update();
    return false;
  }

  var reset_animation_state = function(obj) {
    var is_altered = obj.attr('data-group-altered') == undefined ? false : true;

    if (is_altered) {
      obj.removeAttr('style');
    }
    
  }

  var get_parent_container = function(obj) {
    var current_id = null;
    var current_obj = obj

    while (current_id != 'skill-pool' && current_id != 'skills-acquired' && current_id != 'skills-planned') {
      current_obj = current_obj.parent();

      if (current_obj.length == 0) {
        //alert('Can\'t find parent countainer');
        return null;
      }

      current_id = current_obj.attr('id');
    }

    return current_obj;
  }

  var get_parent_group_or_container = function(obj) {
    var current_id = null;
    var current_obj = obj;

    while (current_id != 'skills-acquired' && current_id != 'skills-planned' && !current_obj.hasClass('tool-separator')) {
      current_obj = current_obj.prev();

      if (current_obj.length == 0) {
        return obj.parent();
        //return null;
      }

      current_id = current_obj.attr('id');
    }

    return current_obj;
  }

  var select_tool = function(obj) {
    if (has_selected()) {
      drop(get_parent_group_or_container(obj));
    }
  }

  var _select = function(obj, id, value) {
    var mask = get_parent_container(obj);
    if (value) {
      delete selected[id];
      obj.removeClass('bg-warning');
    } else {
      selected[id] = true;
      obj.addClass('bg-warning');
    }

    highlight_drop_handle(mask);
  }

  var has_selected = function() {
    return Object.keys(selected).length > 0;
  }

  var highlight_droppable_plan = function(val) {
    if (val) {
      $('#skills-planned').find('.tool-separator').addClass('bg-primary tool-droppable');
    } else {
      $('#skills-planned').find('.tool-separator').removeClass('bg-primary tool-droppable');
    }
  }

  var select_non_skill = function(obj, _masked) {
    var masked = _masked != undefined && _masked;

    var highlight = function(target, val) {
      if (val) {
        target.addClass('bg-warning')
      } else {
        target.removeClass('bg-warning');
      }

      highlight_droppable_plan(val);
      disable_rightside_interactivity(val, true);
    }

    

    if (non_skill_trigger == null) {
      if (!masked) {
        highlight(obj, true);
        non_skill_trigger = obj;
      }
    } else {
      highlight(non_skill_trigger, false);
      var pc = get_parent_container(obj);
      if (pc.attr('id') == 'skills-planned') {
        obj.after(non_skill_trigger);
        tooling.auto_indent($('#skills-planned'));
        profile.save_all();
        non_skill_trigger = null;
      }
    }
  }

  var select = function(id, is_selected) {
    var obj = $('#' + id);
    var current_trigger = get_parent_container(obj).attr('id');

    manager.log('Select triggered on skill ID ' + id + ' [' + is_selected + ']');
    manager.log('Last <> Curr: ' + last_trigger + ' <> ' + current_trigger);
    manager.log('Has selected: ' + has_selected());
    // if (is_selected) {
    //   _select(obj, id, false);
    // } else {
    //   _select(obj, )
    // }

    if (last_trigger == null
        || (!has_selected())
        || ( has_selected() && current_trigger == last_trigger)) {
      if (obj.attr('data-accessible') == 'true') {
        last_trigger = get_parent_container(obj).attr('id');
        _select(obj, id, is_selected);
        notifier.select(Object.keys(selected).length);
      }
    } else {
      drop(get_parent_container(obj));
    }
    
    /*var is_skill_pool = $('#' + id).parent().attr('id') == 'skill-pool';
    tooling.hide_popover();

    if (right_side_selected && is_skill_pool) {
      drop_alphabetically();
      return false;
    }

    var last_trigger_parent = get_parent_container(last_trigger);
    var current_trigger_parent = get_parent_container(id);

    console.log(last_trigger_parent + ' <> ' + current_trigger_parent + ' [' + is_selected + ']');
    if (last_trigger_parent != null && (last_trigger_parent != current_trigger_parent)) {
      drop(last_trigger_parent);
      last_trigger = null;
      return;
    }

    var clicked = $('#' + id);
    if (clicked.attr('data-accessible') == 'false') return;

    if (is_selected) {
      delete selected[id];
      clicked.removeClass('bg-warning');
      highlight_drop_handle(false);

      var parent_id = clicked.parent().attr('id');
      if (Object.keys(selected).length == 0 &&
          (parent_id == 'skills-planned' || parent_id == 'skills-acquired')) {
        right_side_selected = false;
      } 
      //last_trigger = null;
    } else {
      selected[id] = true;
      clicked.addClass('bg-warning');

      var parent_id = clicked.parent().attr('id');
      if (parent_id == 'skills-planned' || parent_id == 'skills-acquired') {
        right_side_selected = true;
      } 
      last_trigger = id;
      highlight_drop_handle(Object.keys(selected).length > 0);
    }*/
  }

  var deselect_all = function() {
    $.each(selected, function(k, v) {
      $('#' + k).removeClass('bg-warning');
    })

    highlight_droppable_plan(false);

    selected = {};
    last_trigger = null;
    non_skill_trigger = null;
    //right_side_selected = false;
    notifier.select(null);
    skill_popup.hide();
    highlight_drop_handle();
  }

  return {
    attach: attach,
    deselect_all: deselect_all,
    //drop: drop,
    drop_selective: drop_selective,
    drop_to_pool: drop_to_pool,
    selected: function() { return selected; },
    select_tool: select_tool,
    deselect_all: deselect_all,
    enable_debug: enable_debug
  }
})()