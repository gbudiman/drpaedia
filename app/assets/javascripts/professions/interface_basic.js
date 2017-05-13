var profession_basic_interface = (function() {
  var selected = new Array();

  var add = function(prof) {
    profession_basic.add(prof);

    var s = '<div>' + prof
          +   '<span class="glyphicon glyphicon-remove pull-right remove-profession" data-prof="' + prof + '"></span>'
          + '</div>';

    $('#profession-basic-config').prepend(s);
    $('#profession-basic-config')
      .find('.remove-profession').off('click').on('click', function() {
      var target_prof = $(this).attr('data-prof');
      $(this).parent().remove();
      profession_basic.remove(target_prof);
    })
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

  var get_selected = function() {
    return selected;
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

  return {
    build: build,
    selected: get_selected,
    update_profession_added: update_profession_added,
    update_profession_removed: update_profession_removed,
    update_strain_change: update_strain_change
  }
})()