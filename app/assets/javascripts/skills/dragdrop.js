var dragdrop = (function() {
  var selected = {};
  var last_trigger;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle_drag($(this).attr('id'));
    })

    $('#skills-acquired').on('click', function() { drop($(this)); });
    $('#skills-planned').on('click', function() { drop($(this)); });
  }

  var handle_drag = function(id) {
    console.log('click registered');
    select(id, selected[id] != undefined);
  }

  var highlight_drop_handle = function(enable) {
    if (enable) {
      $('#skills-acquired').addClass('drop-highlight');
      $('#skills-planned').addClass('drop-highlight');
      $('.tool-separator').addClass('drop-highlight-group');

      $('#' + last_trigger).parent().removeClass('drop-highlight');
    } else {
      $('#skills-acquired').removeClass('drop-highlight');
      $('#skills-planned').removeClass('drop-highlight');
      $('.tool-separator').removeClass('drop-highlight-group');
    }
  }

  var drop = function(obj) {
    if (Object.keys(selected).length == 0) return;
    if ($('#' + last_trigger).parent().attr('id') == obj.attr('id')) return;

    console.log('drop called');
    console.log(obj);
    $.each(selected, function(id, v) {
      $('#' + id).appendTo(obj);
    })

    skill_popup.hide();
    deselect_all();
    highlight_drop_handle(false);
  }

  var select = function(id, is_selected) {
    console.log(id, ' + ', is_selected);
    console.log(selected);
    console.log($('#' + id));
    if (is_selected) {
      delete selected[id];
      $('#' + id).removeClass('bg-warning');
      highlight_drop_handle(false);
    } else {
      selected[id] = true;
      $('#' + id).addClass('bg-warning');
      last_trigger = id;
      highlight_drop_handle(Object.keys(selected).length > 0);
    }
  }

  var deselect_all = function() {
    $.each(selected, function(k, v) {
      $('#' + k).removeClass('bg-warning');
    })

    selected = {};
  }

  return {
    attach: attach,
    deselect_all: deselect_all,
    drop: drop,
    selected: function() { return selected; }
  }
})()