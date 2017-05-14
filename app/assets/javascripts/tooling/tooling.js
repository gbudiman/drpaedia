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

  var attach_object = function(type, target) {
    $('#' + type).on('click', function(event) {
      var cloned = $('#' + type + '-base').clone(true, true);
      cloned.removeAttr('id').appendTo('#' + target);
      activate(cloned);
      event.preventDefault();
    })
  }

  var activate = function(obj) {
    obj.find('.glyphicon-arrow-down').on('click', function() {
      move($(this).parent(), 'down');
    })

    obj.find('.glyphicon-arrow-up').on('click', function() {
      move($(this).parent(), 'up');
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
      unsavedclass: null
    }).on('shown', function() {
      hide_popover();
    })

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

    obj.on('click', function() {
      dragdrop.drop($(this));
    })
  }

  var adjust = function(obj, value) {
    hide_popover();
    var target = obj.find('.tool-text');
    var current_value = parseInt(target.text());

    if (value == -1) {
      if (current_value == 0) return;
    } 

    target.text(current_value + value);
  }

  var alternate = function(obj) {
    hide_popover();
    var target = obj.find('.tool-option');

    if (target.text() == 'HP') {
      target.text('MP');
    } else if (target.text() == 'MP') {
      target.text('HP');
    }
  }

  var move = function(obj, direction) {
    hide_popover();
    var anchor;

    if (direction == 'up') {
      anchor = obj.prev();
    } else if (direction == 'down') {
      anchor = obj.next();
    }

    if (anchor == null) return;

    if (direction == 'up') { obj.insertBefore(anchor); }
    else if (direction == 'down') { obj.insertAfter(anchor); }
  }

  var more_options = function(obj) {
    obj.popover({
      trigger: 'manual',
      html: true,
      content: generate_more_options(obj),
      placement: 'top'
    }).on('shown.bs.popover', function() {
      apply_popover_interactivity();
    })
  }

  var apply_popover_interactivity = function() {
    var popover = $('.popover');
    popover.find('.glyphicon').parent().css('cursor', 'pointer');

    attach_more_options_apply(popover.find('.glyphicon-ok'));
  }

  var attach_more_options_apply = function(obj) {
  }

  var hide_popover = function() {
    if (popover_caller == null) return;
    popover_caller.popover('hide');
  }

  var generate_more_options = function(obj) {
    var s = '';
    s += '<div><span class="glyphicon glyphicon-ok"></span> Apply</div>';
    s += '<div><span class="glyphicon glyphicon-remove"></span> Remove</div>';

    return s;
  }

  return {
    attach: attach
  }
}()