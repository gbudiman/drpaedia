var skill_popup = function() {
  var data = {};
  var current_click;
  var state;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle($(this).attr('id'));
    })
  }

  var build = function(id) {

  }

  var handle = function(id) {
    if (data[id] == undefined) {
      $('#' + id).popover({
        content: 'Loading...',
        trigger: 'manual',
        html: true
      })

      data[id] = true;
    }

    if (current_click == id) {
      if (state == 'shown') {
        $('#' + id).popover('hide');
        state = 'hidden';
      } else {
        $('#' + id).popover('show');
        state = 'shown';
      }
    } else {
      $('#' + id).data('bs.popover').options.content = skills.details(id)
      $('#' + current_click).popover('hide');
      $('#' + id).popover('show');
      state = 'shown';
    }

    current_click = id;
  }

  var hide = function() {
    $('#' + current_click).popover('hide');
    state = 'hidden';
  }

  return {
    attach: attach,
    hide: hide
  }
}()