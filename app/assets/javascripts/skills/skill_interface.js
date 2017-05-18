var skill_interface = (function() {
  var apply_filters = function() {
    filterview.apply_all();
  }

  var build = function(data) {
    var r = '';
    Object.keys(data).sort().forEach(function(k, i) {
      var shorthand = data[k].shorthand;
      r += '<div class="skill skill-infancy" id="' + shorthand + '" '
         +   'data-type="' + data[k].type + '" ' 
         +   'data-accessible=false '
         +   'data-discounted=false '
         + '>'
         +   '<span class="skill-name">' + k + '</span>'
         +   '<span class="badge badge-default skill-cost pull-right" id="' + shorthand + '-cost" data-badge="skill-cost"></span>'
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

    cost.text(Object.keys(costs).sort(numeric_sort)[0]);
  }

  var numeric_sort = function(a, b) {
    return parseInt(a) - parseInt(b);
  }

  var remove = function(id) {
    var obj = $('#' + id);
    var cost = $('#' + id + '-cost');
    obj
      .attr('data-accessible', false)
      .attr('data-discounted', false);

    cost.removeClass('badge-success');
    cost.text('');
    //dragdrop.drop_to_pool(id);
  }

  var reset_all = function() {
    $('div[data-accessible]')
      .addClass('skill-infancy')
      .attr('data-accessible', false)
      .attr('data-discounted', false)
      .find('span.badge')
        .removeClass('badge-success')


    $('span[data-badge]').text('');
  }

  var sort_pool = function() {

  }

  var get_all_unselected = function() {
    var a = get_skills_in('skills-planned');
    var b = get_skills_in('skills-acquired');

    return Object.assign({}, a, b);
  }

  var get_skills_in = function(id) {
    var s = {};

    $('#' + id).find('.skill-name').each(function() {
      s[$(this).text()] = true;
    })

    return s;
  }

  return {
    apply_filters: apply_filters,
    build: build,
    get_all_unselected: get_all_unselected,
    display: display,
    remove: remove,
    reset_all: reset_all
  }
})()