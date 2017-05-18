var notifier = function() {
  var data = {};

  var select = function(i) {
    if (dynaloader.has_delegations('initial_load')) { return; }

    if (data['select'] == undefined) {
      data['select'] = $.notify({
        message: ''
      }, {
        type: 'warning',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        allow_dismiss: false,
        delay: 0,
        template: '<div data-notify="container" class="col-xs-4 col-sm-3 alert alert-{0} text-right" role="alert">' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                    '<span data-notify="deselect-all"><a href="#">Deselect all</a></span>' +
                  '</div>',
        onShow: attach,
        onClosed: function() { delete data['select']; }
      });
    }

    var n = data['select'];
    n.update('message', i + ' skills selected. ');
    if (i == 0) {
      n.close();
    }
  }

  var attach = function() {
    var a = $('[data-notify="deselect-all"]').find('a');
    a.on('click', function() {
      dragdrop.deselect_all();
      return false;
    })
  }

  return {
    select: select
  }
}()