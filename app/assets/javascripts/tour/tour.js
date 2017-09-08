var tour = function() {
  var resize_tour_window = function() {
    var width = $('#modal-tour').find('.modal-header').width() - 30;
    var height = $(window).height();

    $('#modal-tour').find('.modal-body')
      .css('max-height', (height * 0.7) + 'px')
      .css('overflow-y', 'auto')
    $('#modal-tour').find('.img')
      .css('max-width', width + 'px')
  }

  var start = function() {
    $('#modal-tour').modal({

    }).on('shown.bs.modal', function() {
      resize_tour_window();
      $('body').css('padding-right', 0);
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    });

    $(window).resize(resize_tour_window);
  }

  return {
    start: start
  }
}()