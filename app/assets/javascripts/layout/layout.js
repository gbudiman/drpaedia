var layout = (function() {
  var attach = function() {
    $(window).resize(function() {
      set();
    })

    set();
  }

  var set = function() {
    var height = $(window).height();
    var cut = $('nav.navbar').height();
    var max_height = height - cut - 12;
    $('#main-left').css('max-height', max_height + 'px');
    $('#main-right').css('max-height', max_height + 'px');
  }

  return {
    attach: attach,
    set: set
  }
})()

