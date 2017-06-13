var layout = (function() {
  state = 'half';

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
      state = 'right-full';
      $('#main-left').hide();
      $('#main-right').removeClass('col-xs-6').addClass('col-xs-12');
      $('#minmax').text('> Half <');
    } else if (state == 'right-full') {
      state = 'half';
      $('#main-left').show();
      $('#main-right').removeClass('col-xs-12').addClass('col-xs-6');
      $('#minmax').text('<< Max');
    }
  }

  var set = function() {
    var height = $(window).height();
    var cut = $('nav.navbar').outerHeight();
    var max_height = height - cut - 1;
    $('#main-left').css('height', max_height + 'px');
    $('#main-right').css('height', max_height + 'px');
  }

  return {
    attach: attach,
    set: set
  }
})()

