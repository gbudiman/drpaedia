var profession_basic_interface = (function() {
  var add = function(prof) {
    profession_basic.add(prof);

    var s = '<div class="purchased-profession">'
          +   '<span class="basic-prof-name">' + prof + '</span>'
          +   '<span class="forget-profession pull-right" data-prof="' + prof + '">F</span>'
          +   '<span class="pull-right">&nbsp|&nbsp</span>'
          +   '<span class="glyphicon glyphicon-remove pull-right remove-profession" data-prof="' + prof + '"></span>'
          + '</div>';

    $('#profession-basic-config').prepend(s);
    $('#profession-basic-config')
      .find('.remove-profession').off('click').on('click', function() {
      var target_prof = $(this).attr('data-prof');
      $(this).parent().remove();
      profession_basic.remove(target_prof);
    })

    $('#profession-basic-config')
      .find('.forget-profession').off('click').on('click', function() {
      var that = $(this);
      var target_prof = $(this).attr('data-prof');
      var anchor = $(this).parent().find('.basic-prof-name');

      if (anchor.hasClass('forgotten-basic-prof')) {
        anchor.removeClass('forgotten-basic-prof');
        profession_basic.unforget(target_prof);
        that.text('F');
      } else {
        anchor.addClass('forgotten-basic-prof');
        profession_basic.forget(target_prof);
        that.text('U');
      }
    })
  }

  var forget = function(prof) {
    $('#profession-basic-config')
      .find('.forget-profession[data-prof="' + prof + '"]').trigger('click');
  }

  var build = function(type) {
    switch(type) {
      case 'basic': build_add_basic_profession(); break;
    }

  }

  var build_add_basic_profession = function() {
    var raw = '';
    $.each(profession_basic.all(), function(k, v) {
      raw += '<li class="list-basic" data-prof="' + k + '"><a href="#">' + k + '</a></li>';
    })

    $('#basic-profession-list').append(raw);
    $('#basic-profession-list').find('li.list-basic').each(function() {
      $(this).on('click', function(event) {
        var that = $(this);
        var prof = that.text();

        add(prof);
        event.preventDefault();
      })
    })

    
  }

  var disable_limit_warning = function(x, overlimit) {
    if (x) {
      $('#basic-limit-warning').hide();
    } else {
      $('#basic-overlimit').text(overlimit);
      $('#basic-limit-warning').show();
    }
  }

  var update_profession_added = function(x) {
    $('#basic-profession-list').find('li[data-prof="' + x + '"]').find('a')
      .addClass('selected-profession')
      .on('click', function(event) {
        return false;
      })
  }

  var update_profession_removed = function(x) {
    $('#basic-profession-list').find('li[data-prof="' + x + '"]').find('a')
      .removeClass('selected-profession')
      .off('click')

    $('#profession-basic-config').find('span[data-prof="' + x + '"]').parent().remove();
  }

  var update_strain_change = function() {
    clear_restrictions();
    apply_restrictions();
  }

  var clear_restrictions = function() {
    $('#basic-profession-list').find('li[data-prof]').find('a')
      .removeClass('restricted-profession')
      .off('click')
  }

  var apply_restrictions = function() {
    $.each(profession_basic.restricted(), function(k, v) {
      $('#basic-profession-list').find('li[data-prof="' + k + '"]').find('a')
        .addClass('restricted-profession')
        .on('click', function(event) {
          return false;
        })
    })
  }

  var reset = function() {
    profession_basic.reset();
    console.log('prof reset triggered');
    $('#profession-basic-config').find('.purchased-profession').remove();
    $('#basic-profession-list').find('a').removeClass('selected-profession');
  }

  return {
    add: add,
    build: build,
    disable_limit_warning: disable_limit_warning,
    forget: forget,
    reset: reset,
    update_profession_added: update_profession_added,
    update_profession_removed: update_profession_removed,
    update_strain_change: update_strain_change
  }
})()