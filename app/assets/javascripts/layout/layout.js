var layout = (function() {
  var attach = function() {
    $(window).resize(function() {
      set();
    })

    set();
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

