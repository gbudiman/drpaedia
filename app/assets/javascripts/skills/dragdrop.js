var dragdrop = (function() {
  var selected = {};
  var last_trigger;
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

  var drop = function(obj) {
    if (Object.keys(selected).length == 0) return;
    if ($('#' + last_trigger).parent().attr('id') == obj.attr('id')) return;

    $.each(selected, function(id, v) {
      if (obj.hasClass('tool-separator')) {
        $('#' + id).insertAfter(obj);
      } else {
        $('#' + id).appendTo(obj);
      }
    })

    skill_popup.hide();
    deselect_all();
    highlight_drop_handle(false);
  }

  var drop_alphabetically = function() {
    $.each(selected, function(id, v) {
      var obj = $('#' + id);
      var skill_name = skills.hash(id);
      var anchor;

      console.log('dropping ' + skill_name);

      $.each($('#skill-pool').find('[data-accessible]'), function() {
        var current_search = $(this).text();

        if (current_search > skill_name) {
          console.log('found to insert before ' + current_search);
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

  var select = function(id, is_selected) {
    var is_skill_pool = $('#' + id).parent().attr('id') == 'skill-pool';
    tooling.hide_popover();

    if (right_side_selected && is_skill_pool) {
      drop_alphabetically();
      return false;
    }

    if (is_selected) {
      delete selected[id];
      $('#' + id).removeClass('bg-warning');
      highlight_drop_handle(false);
    } else {
      selected[id] = true;
      $('#' + id).addClass('bg-warning');

      var parent_id = $('#' + id).parent().attr('id');
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
    selected: function() { return selected; }
  }
})()