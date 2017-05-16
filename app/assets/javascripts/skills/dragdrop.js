var dragdrop = (function() {
  var selected = {};
  var last_trigger = null;
  var right_side_selected = false;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle_drag($(this).attr('id'));
    })

    $('#skills-acquired').on('click', function() { drop($(this)); });
    $('#skills-planned').on('click', function() { drop($(this)); });
    //$('#skill-pool').find('[data-accessible]').on('click', function() { drop_alphabetically($(this)); })
  }

  var handle_drag = function(id) {
    select(id, selected[id] != undefined);
  }

  var highlight_drop_handle = function(enable) {
    if (enable) {
      $('#skill-pool').addClass('drop-highlight');
      $('#skills-acquired').addClass('drop-highlight');
      $('#skills-planned').addClass('drop-highlight');
      $('.tool-separator').addClass('drop-highlight-group');

      $('#' + last_trigger).parent().removeClass('drop-highlight');
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
    if (Object.keys(selected).length == 0) return;
    if (last_trigger == obj.attr('id')) return;
    if ($('#' + last_trigger).parent().attr('id') == obj.attr('id')) return;

    var parent_container = obj;
    $.each(selected, function(id, v) {
      var to_append = $('#' + id);
      if (obj.hasClass('tool-separator')) {
        parent_container = obj.parent();
        to_append.insertAfter(obj);
      } else {
        rectified_obj = rectify_drop_parent(obj);
        to_append.appendTo(rectified_obj);
      }

      tooling.attach_handles(to_append, true);
    })

    skill_popup.hide();
    deselect_all();
    highlight_drop_handle(false);
    tooling.auto_indent(parent_container);
  }

  var drop_selective = function(id, obj) {
    selected = {};
    selected[id] = true;
    last_trigger = null;

    drop(obj);
  }

  var drop_to_pool = function(id) {
    selected = {};
    selected[id] = true;
    last_trigger = null;

    drop_alphabetically();
  }

  var drop_alphabetically = function() {
    $.each(selected, function(id, v) {
      var obj = $('#' + id);
      var skill_name = skills.hash(id);
      var anchor;

      tooling.attach_handles(obj, false);
      $.each($('#skill-pool').find('[data-accessible]'), function() {
        var current_search = $(this).text();

        if (current_search > skill_name) {
          anchor = $(this).attr('id');
          return false;
        }
      })

      if (anchor != null) {
        obj.insertBefore($('#' + anchor));
      } else {
        $('#skill-pool').append(obj);
      }
    })

    deselect_all();
    highlight_drop_handle(false);
    skill_popup.hide();
    return false;
  }

  var get_parent_container = function(id) {
    var current_id = null;
    var current_obj = $('#' + id);

    while (current_id != 'skill-pool' && current_id != 'skill-acquired' && current_id != 'skill-planned') {
      current_obj = current_obj.parent();

      if (current_obj.length == 0) {
        //alert('Can\'t find parent countainer');
        return null;
      }

      current_id = current_obj.attr('id');
    }

    return current_id;
  }

  var select = function(id, is_selected) {
    var is_skill_pool = $('#' + id).parent().attr('id') == 'skill-pool';
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

    console.log(clicked);
    if (clicked.attr('data-accessible') == 'false') return;

    if (is_selected) {
      delete selected[id];
      clicked.removeClass('bg-warning');
      highlight_drop_handle(false);
    } else {
      selected[id] = true;
      clicked.addClass('bg-warning');

      var parent_id = clicked.parent().attr('id');
      if (parent_id == 'skills-planned' || parent_id == 'skills-acquired') {
        right_side_selected = true;
      }
      last_trigger = id;
      highlight_drop_handle(Object.keys(selected).length > 0);
    }
  }

  var deselect_all = function() {
    $.each(selected, function(k, v) {
      $('#' + k).removeClass('bg-warning');
    })

    selected = {};
    right_side_selected = false;
  }

  return {
    attach: attach,
    deselect_all: deselect_all,
    drop: drop,
    drop_selective: drop_selective,
    drop_to_pool: drop_to_pool,
    selected: function() { return selected; }
  }
})()