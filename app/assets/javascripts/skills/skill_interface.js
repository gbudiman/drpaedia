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
         +   '<span class="pull-right" id="' + shorthand + '-cost"></span>'
         + '</div>';
    })
    
    $('#skill-pool').append(r);

  }

  var display = function(id, costs) {
    var obj = $('#' + id);
    var cost = $('#' + id + '-cost');
    obj.attr('data-accessible', true);
    if (Object.keys(costs) > 1) {
      obj.attr('data-discounted', true);
    }

    obj.removeClass('skill-infancy');
    cost.text(Object.keys(costs).sort());
  }

  return {
    apply_filters: apply_filters,
    build: build,
    display: display
  }
})()