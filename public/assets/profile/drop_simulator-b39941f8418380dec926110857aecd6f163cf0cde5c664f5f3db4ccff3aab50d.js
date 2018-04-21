var drop_simulator = function() {
  var resize = function() {
    var parent = $('#modal-drop-simulator');
    var header = parent.find('.modal-header');
    var footer = parent.find('.modal-footer');

    //console.log(header.outerHeight());
    //console.log(footer.outerHeight());

    $('#modal-drop-simulator-body').parent()
      .css('max-height', ($(window).height() - header.outerHeight() - footer.outerHeight() - 80))
      .css('overflow-y', 'auto');
    
  }

  var attach = function() {
    $('#modal-drop-simulator').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
      resize();
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    });

    $('#modal-drop-execute').off('click').on('click', function() {
      profession_basic_interface.forget($('#modal-drop-profession').text());
      /*$('div.purchased-profession')
        .find('.forget-profession[data-prof="' + $('#modal-drop-profession').text() + '"]')
          .trigger('click');*/

      $('#modal-drop-simulator').modal('hide');
    })

    $(window).resize(resize);
  }

  return {
    attach: attach
  }
}();
