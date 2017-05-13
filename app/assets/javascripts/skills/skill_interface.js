var skill_interface = (function() {
  var apply_filters = function() {
    filterview.apply_all();
  }

  var build = function(data) {
    var r = '';
    Object.keys(data).sort().forEach(function(k, i) {
      var shorthand = data[k].shorthand;
      r += '<div class="skill-infancy" id="' + shorthand + '" '
         +   'data-type="' + data[k].type + '" ' 
         +   'data-accessible=false '
         +   'data-discounted=false'
         + '">'
         +   k
         +   '<span class="badge badge-default pull-right" id="' + shorthand + '-cost" data-badge="skill-cost"></span>'
         + '</div>';
    })
    
    $('#skill-pool').append(r);

  }

  var display = function(id, costs, is_open) {
    var obj = $('#' + id);
    var cost = $('#' + id + '-cost');
    obj.attr('data-accessible', true);
    if (Object.keys(costs).length > 1) {
      obj.attr('data-discounted', true);
      cost.addClass('badge-success');
    }

    if (!is_open) {
      obj.attr('data-discounted', true);
      cost.addClass('badge-success');
    }

    obj.removeClass('skill-infancy');
    cost.text(Object.keys(costs).sort()[0]);
  }

  var reset_all = function() {
    $('div[data-accessible]')
      .addClass('skill-infancy')
      .attr('data-accessible', false)
      .attr('data-discounted', false)

    $('span[data-badge]').text('');
  }

  return {
    apply_filters: apply_filters,
    build: build,
    display: display,
    reset_all: reset_all
  }
})()