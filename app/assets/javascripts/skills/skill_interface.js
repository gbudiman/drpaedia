var skill_interface = (function() {
  var timeout = 0;
  var timeout_sort = setTimeout(null, 0);

  var apply_filters = function() {
    filterview.apply_all();
  }

  var attach_alternator = function() {
    $('span.skill-cost').on('click', function() {
      alternate($(this));
      return false;
    })
  }

  var alternate = function(obj) {
    var parent = obj.parent();
    var is_open = parent.find('.btn-alternator').length > 0;

    if (is_open) {
      parent.find('.btn-alternator').remove();
      return;
    }

    var skill_name = parent.find('.skill-name').text();
    var possible_costs = skills.get_all_possible_costs(skill_name);
    var current_cost = parseInt(obj.text());
    var anchor = obj;
    var skill_id = parent.attr('id');

    var min_cost = Object.keys(possible_costs).sort()[0];

    $.each(Object.keys(possible_costs).sort().reverse(), function(_junk, val) {
      if (val != current_cost) {
        var button = '<button type="button" class="pull-right btn btn-sm btn-primary btn-alternator">' + val + '</button>';
        anchor.before(button);
      }
    })

    parent.find('.btn-alternator').each(function() {
      var val = parseInt($(this).text());
      $(this).on('click', function() {
        parent.find('.btn-alternator').remove();
        var marker = (val == min_cost) ? '' : '<sup>+</sup>'; 
        obj.html(val + marker);

        calc.recalculate_skills();
        var leader = $(traverse_to_parent(skill_id));
        tooling.compute_group(leader);
        profile.save_all();
        return false;
      })
    })

  }

  var mark_planned = function(planned) {
    $.each(planned, function(k, v) {
      $.each(v, function(skcode, _junk) {
        var target = $('#' + skcode);
          //.find('.plan-marker').remove()
        if (target.find('.plan-marker').length == 0) {
          target.find('.skill-name')
            .after('<span class="plan-marker">*</span>')
        }
      })
    })
  }

  var unmark_planned = function(data) {
    $.each(data, function(k, v) {
      $.each(v, function(skcode, _junk) {
        $('#' + skcode).find('.plan-marker').remove();
      })
    })
  }

  var unmark_profession = function(data) {
    $.each(data, function(skcode, _junk) {
      $('#' + skcode).find('.plan-marker').remove();
    })
  }

  var traverse_to_parent = function(id) {
    return generic.traverse_to_parent(id);
  }

  var build = function(data) {
    var r = '';
    var p_adv = '<span><sup>ADV</sup></span>';
    var p_conc = '<span><sup>CONC</sup></span>';

    Object.keys(data).sort().forEach(function(k, i) {
      var shorthand = data[k].shorthand;
      filterview.set_once(shorthand, data[k].type);

      r += '<div class="skill skill-infancy" id="' + shorthand + '" '
         +   'data-type="' + data[k].type + '" ' 
         +   ((data[k].psi_level != undefined && data[k].psi_level > 0) ? 'data-psi-level=' + data[k].psi_level + ' ': '')
         +   'data-accessible=false '
         +   'data-discounted=false '
         + '>'
         +   (data[k].type == 'conc' ? p_conc : '')
         +   (data[k].type == 'adv' ? p_adv : '')
         +   '<span class="skill-name">' + k + '</span>'
         +   '<span class="badge badge-default skill-cost pull-right" id="' + shorthand + '-cost" data-badge="skill-cost"></span>'
         + '</div>';
    })
    
    $('#skill-pool').append(r);
    $('#skill-desc').modal({
      show: false
    }).on('show.bs.modal', function() {
      var height = $(window).height() * 0.8;
      $('#skill-desc-body').css('max-height', height + 'px');
    })
    $('#generate-skill-info').on('click', function() {
      skill_beautifier.dump_to_new_window(build_formatted_skill_descs());
      return false;
    })
    attach_alternator();
  }

  var build_formatted_skill_descs = function() {
    var sd = dynaloader.raw()['skill_desc'];
    var processed = {};
    var h_t = {};
    var t = '';
    $.each(profile.get_all_skills(), function(_name, _junk) {
      var name = sanitize(_name);

      if (processed[name] != undefined) {

      } else {
        var h = sd[name];
        /*
        t += '<div class="skill-title">' + name + '</div>';
        var pre_t = skill_beautifier.process(h);

        t += pre_t;*/

        h_t[name] = skill_beautifier.process(h);

        processed[name] = true;
      }
    });

    $.each(Object.keys(h_t).sort(), function(_junk, key) {
      t += '<div class="skill-title">' + key + '</div>';
      t += h_t[key];
    })

    return t;
  }

  var clear_alternator = function() {
    $('.btn-alternator').remove();
  }

  var generate_signet = function(obj, satisfied_professions, professions) {
    var s = '<div class="row signet">';
    var length = Object.keys(professions).length + 1;
    var cell_length = 100.00 / length;
    var bs_col_factor = 'width: ' + cell_length + '%';

    /*$.each(satisfied_professions, function(k, _junk) {
      if (k == 'open') {
        var color = '#383838';
      }
      s    += '<div class="signet-cell col-xs-3"></div>';
    })*/

    var open_style = 'style="' + bs_col_factor + '; float: left"';
    if (satisfied_professions['open'] != undefined) {
      s    += '<div class="signet-cell signet-open" ' + open_style + '></div>';
    } else {
      s    += '<div class="signet-cell signet-empty" ' + open_style + '></div>';
    }

    $.each(professions, function(prof, order) {
      var offset = 'left: ' + cell_length * (order + 1) + '%';
      var style = 'style="' + bs_col_factor + '; ' + offset + '; float: left"';
      if (satisfied_professions[prof] != undefined) {
        s  += '<div class="signet-cell signet-' + order + '" ' + style + '></div>';
      } else {
        s  += '<div class="signet-cell signet-empty" ' + style + '></div>';
      }
    })



    s    += '</div>';
    obj.find('.signet').remove();
    obj.append(s);
  }

  var display = function(id, costs, is_open, satisfied_professions, professions) {
    var obj = $('#' + id);
    var cost = $('#' + id + '-cost');

    generate_signet(obj, satisfied_professions, professions);


    obj.attr('data-accessible', true);
    filterview.set(id, 'accessible', true);

    if (!is_open) {
      obj.attr('data-discounted', true);
      filterview.set(id, 'discounted', true);

      cost.addClass('badge-success');
    } else {
      if (Object.keys(costs).length > 1) {
        obj.attr('data-discounted', true);
        filterview.set(id, 'discounted', true);

        cost.addClass('badge-success');
      } else {
        obj.attr('data-discounted', false);
        filterview.set(id, 'discounted', false);

        cost.removeClass('badge-success');
      }
    }

    /*
    if (Object.keys(costs).length > 1) {
      obj.attr('data-discounted', true);
      filterview.set(id, 'discounted', true);

      cost.addClass('badge-success');
    } else {

      if (!is_open) {
        obj.attr('data-discounted', true);
        filterview.set(id, 'discounted', true);

        cost.addClass('badge-success');
      } else {
        obj.attr('data-discounted', false);
        filterview.set(id, 'discounted', false);

        cost.removeClass('badge-success');
      }
    }*/

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
      .attr('data-discounted', false)
      .find('.signet').remove();

    filterview.set(id, 'accessible', false);
    filterview.set(id, 'discounted', false);

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

  var reset_to_pool = function() {
    reset_all();

    var ids = new Array();
    $('#skills-acquired').find('.skill').each(function() {
      ids.push($(this).attr('id'));
    })

    $('#skills-planned').find('.skill').each(function() {
      ids.push($(this).attr('id'));
    })

    dragdrop.drop_to_pool(ids);
  }

  var sort_pool = function() {
    if (!dynaloader.get_gil('ok_to_sort') || !dynaloader.get_gil('ok_to_update_gui')) return;
    clearTimeout(timeout_sort);
    timeout_sort = setTimeout(function() {
      manager.log('sort pool called');

      var items = $('#skill-pool').children();
      items.sort(function(a, b) {
        var va = $(a).find('.skill-name').text();
        var vb = $(b).find('.skill-name').text();
        //console.log('comparing ' + va + ' with ' + vb);
        return (va < vb) ? -1 : 1;
      })

      $('#skill-pool').append(items);
    }, timeout);
    
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

  var get_psis = function() {
    var a = get_psis_in('skills-acquired');
    var b = get_psis_in('skills-planned');

    $.each([1, 2, 3], function(_junk, i) {
      a[i] = a[i] + b[i];
    })

    return a;
  }

  var get_psis_in = function(id) {
    var o = {
      1: 0,
      2: 0,
      3: 0
    }

    $('#' + id).find('[data-psi-level]').each(function() {
      var level = parseInt($(this).attr('data-psi-level'));
      o[level] = o[level] + 1;
    })

    return o;
  }

  var show_description = function(_name) {
    var name = sanitize(_name);
    var h = dynaloader.raw()['skill_desc'][name];
    $('#skill-desc-title').text(name);
    $('#skill-desc-body').html(skill_beautifier.process(h));
  }

  var sanitize = function(x) {
    if (x.match(/[IV]+$/)) {
      return x.replace(/[IV]+$/, '').trim();
    } else if (x.match(/^Psi [I]+/)) {
      return x.replace(/^Psi [I]+ \-/, '').trim();
    }

    return x;
  }

  return {
    apply_filters: apply_filters,
    build: build,
    get_all_unselected: get_all_unselected,
    mark_planned: mark_planned,
    unmark_planned: unmark_planned,
    unmark_profession: unmark_profession,
    display: display,
    remove: remove,
    reset_all: reset_all,
    reset_to_pool: reset_to_pool,
    clear_alternator: clear_alternator,
    sort_pool: sort_pool,
    set_timeout: function(x) { timeout = x; },
    get_psis: get_psis,
    show_description: show_description
  }
})()