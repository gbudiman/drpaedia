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
      raw += '<li class="list-basic"><a href="#">' + k + '</a></li>';
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

  var update = function() {

  }

  return {
    build: build,
    selected: get_selected,
    update: update
  }
})()