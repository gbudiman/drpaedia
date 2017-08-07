var layout = (function() {
  var state = 'half';
  var animation_ms_duration = 500;
  var animation_serial_delay = animation_ms_duration / 10;

  var attach = function() {
    $(window).resize(function() {
      set();
    })

    set();
    $('#minmax').on('click', function() {
      minmax();
      return false;
    })
  }

  var minmax = function() {
    if (state == 'half') {
      var slide_out_amount = $('#main-left').width();
      state = 'right-full';
      //$('#main-left').hide();

      //$('#main-left').addClass('animated slideOutLeft');
      $('#main-left').velocity({
        opacity: 0,
        'margin-left': (-1 * slide_out_amount - 8) + 'px'
      }, animation_ms_duration)

      $('#main-right').velocity({
        width: 2 * slide_out_amount
      }, animation_ms_duration, function() {
        $('#main-right')
          .removeClass('col-xs-6').addClass('col-xs-12')
          .css('width', '');
      });
      
      
      $('#minmax').html('&rsaquo; Half &lsaquo;');
    } else if (state == 'right-full') {
      state = 'half';
      var half_width = $(window).width() / 2;

      $('#main-right').velocity({
        'margin-right': (-1 * half_width) + 'px'
      }, animation_ms_duration / 2)

      $('#main-right').velocity({
        width: half_width + 'px'
      }, animation_ms_duration / 2, function() {
        $('#main-right')
          .removeClass('col-xs-12').addClass('col-xs-6')
          .css('width', '')
      })

      setTimeout(function() {
        $('#main-left').velocity({
          opacity: 1,
          'margin-left': 0
        }, animation_ms_duration)
      }, animation_serial_delay)

      $('#minmax').html('&laquo; Max');
    }
  }

  var set = function() {
    var height = $(window).height();
    var width = $(window).width();
    var cut = $('nav.navbar').outerHeight();
    var max_height = height - cut - 1;
    $('#main-left').css('height', max_height + 'px');
    $('#main-right').css('height', max_height + 'px');
    $('#config-button').css('max-width', (width * 0.4) + 'px');

    if (state == 'right-full') {
      var margin_hidden = ($(window).width() / 2 * -1) + 'px';
      $('#main-left').css('margin-left', margin_hidden);
    }
  }

  return {
    attach: attach,
    set: set
  }
})()

