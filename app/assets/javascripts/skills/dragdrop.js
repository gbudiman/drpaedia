var dragdrop = (function() {
  var selected = {};
  var last_trigger = null;
  var right_side_selected = false;
  var debug = false;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle_drag($(this).attr('id'));
      return false;
    })

    $('#skills-acquired').on('click', function() { drop($(this)); });
    $('#skills-planned').on('click', function() { drop($(this)); });
    //$('#skill-pool').find('[data-accessible]').on('click', function() { drop_alphabetically($(this)); })
  }

  var enable_debug = function(x) {
    debug = x;
  }

  var handle_drag = function(id) {
    select(id, selected[id] != undefined);
  }

  var highlight_drop_handle = function(mask) {
    enable = Object.keys(selected).length > 0;
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

  var rectify_drop_parent = function(obj) {
    if (!tooling.is_group(obj) && !obj.hasClass('drop-container')) {
      return obj.parent();
    }

    return obj;
  }

  var drop = function(obj) {
    console.log('dropping to ' + obj.attr('id'));

    //console.log(last_trigger + ' <> ' + obj.attr('id'));
    /*if (Object.keys(selected).length == 0) return;
    if (last_trigger == obj.attr('id')) return;
    if ($('#' + last_trigger).parent().attr('id') == obj.attr('id')) return;
*/

    var drop_to_pool = obj.attr('id') == 'skill-pool';

    var parent_container = obj;
    $.each(selected, function(id, v) {
      var to_append = $('#' + id);

      if (obj.hasClass('tool-separator')) {
        parent_container = obj.parent();
        to_append.insertAfter(obj);
        tooling.attach_handles(to_append, true);
      } else if (drop_to_pool) {
        drop_alphabetically();
        tooling.attach_handles(to_append, false);
        // console.log(' !!! Normal drop : sort() ');
        skill_interface.sort_pool();
      } else {
        rectified_obj = rectify_drop_parent(obj);
        to_append.show().appendTo(rectified_obj);
        tooling.attach_handles(to_append, true);
      }
    })

    skill_popup.destroy();
    deselect_all();
    highlight_drop_handle(false);
    tooling.auto_indent(parent_container);
    calc.recalculate_skills();
    skills.validate();
    profession_conc_interface.validate_existing();
    profession_adv.update();
    profile.save_all();
  }

  var drop_selective = function(id, obj) {
    deselect_all();
    selected[id] = true;
    drop(obj);
  }

  var drop_to_pool = function(id) {
    deselect_all();

    if (Array.isArray(id)) {
      $.each(id, function(_junk, x) {
        selected[x] = true;
      })
    } else {
      selected[id] = true;
    }

    drop_alphabetically();
    //console.log(' !!! Drop to pool : sort() ');
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
      // skill_interface.sort_pool();
    })

    deselect_all();
    highlight_drop_handle(false);
    skill_popup.destroy();
    calc.recalculate_skills();
    skills.validate();
    profession_conc_interface.validate_existing();
    profession_adv.update();
    return false;
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
        return null;
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

  var select = function(id, is_selected) {
    var obj = $('#' + id);
    var current_trigger = get_parent_container(obj).attr('id');

    console.log('Select triggered on skill ID ' + id + ' [' + is_selected + ']');
    console.log('Last <> Curr: ' + last_trigger + ' <> ' + current_trigger);
    console.log('Has selected: ' + has_selected());
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

    selected = {};
    last_trigger = null;
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