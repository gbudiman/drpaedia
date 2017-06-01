var profession_conc_interface = (function() {
  var add = function(prof) {
    profession_conc.add(prof);

    var s = '<div class="purchased-conc">'
          +   '<span class="conc-prof-name">' + prof + '</span>'
          +   '<span class="glyphicon glyphicon-remove pull-right remove-conc" data-conc="' + prof + '"></span>'
          + '</div>';

    $('#profession-conc-config').prepend(s);
    $('#profession-conc-config')
      .find('.remove-conc').off('click').on('click', function() {
        var target_prof = $(this).attr('data-conc');
        $(this).parent().remove();
        profession_conc.remove(target_prof);
      })
  }

  var build = function(d) {
    var raw = '';
    $.each(d, function(type, sd) {
      raw += '<li class="list-conc">' + type + '</li>';

      $.each(sd, function(_junk, pc) {
        raw += '<li class="list-conc" data-conc="' 
             +   pc 
             +   '">'
             +   '<a href="#">' + pc + '</a>'
             + '</li>';
      })
    })

    $('#conc-profession-list').append(raw);
    $('#conc-profession-list').find('li.list-conc').each(function() {
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
      $('#conc-limit-warning').hide();
    } else {
      $('#conc-overlimit').text(overlimit);
      $('#conc-limit-warning').show();
    }
  }

  var update_profession_added = function(x) {
    $('#conc-profession-list').find('li[data-conc="' + x + '"]').find('a')
      .addClass('selected-profession')
      .on('click', function(event) {
        return false;
      })
  }

  var update_profession_removed = function(x) {
    $('#conc-profession-list').find('li[data-conc="' + x + '"]').find('a')
      .removeClass('selected-profession')
      .off('click');
  }

  return {
    add: add,
    build: build,
    disable_limit_warning: disable_limit_warning,
    update_profession_added: update_profession_added,
    update_profession_removed: update_profession_removed
  }
})();