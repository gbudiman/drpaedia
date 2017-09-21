var skill_popup = function() {
  var data = {};
  var current_click;
  var state;
  var timeout = setTimeout(null, 0);

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle($(this).attr('id'));
    })
  }

  var build = function(id) {

  }

  var traverse_to_parent = function(id) {
    return generic.traverse_to_parent(id);
    /*var obj = $('#' + id).parent();
    var id = obj.attr('id');

    while(id != 'skill-pool' && id != 'skills-acquired' && id != 'skills-planned') {
      obj = obj.parent();
      id = obj.attr('id');
    }

    return '#' + id;*/
  }

  var handle = function(id) {
    var smart_trigger = function() {
      if (current_click == id) {
        if (state == 'shown') {
          $('#' + id).popover('hide');
          state = 'hidden';
        } else {
          $('#' + id).popover('show');
          state = 'shown';
        }
      } else {
        $('#' + current_click).popover('hide');
        $('#' + id).popover('show');
        state = 'shown';
      }

      current_click = id;
    }

    clearTimeout(timeout);
    if (data[id] == undefined) {
      timeout = setTimeout(function() {
        var skill_name = skills.get_name(id);
        $('#' + id).popover({
          content: get_details(id),
          trigger: 'manual',
          html: true,
          placement: 'auto bottom',
          viewport: traverse_to_parent(id),
          container: traverse_to_parent(id),
          title: '<div>'
               +   '<span class="glyphicon glyphicon-question-sign skill-info-query pull-left" data-skill-name="' + skill_name + '"></span>'
               +   '&nbsp; '
               +   '<span class="text-info"><strong>' 
               +     skill_name
               +     ' (MP: ' + skill_interface.get_mp_cost(skill_name) + ')'
               +     '<span class="pull-right popover-skill-close"><button type="button" class="close">&times;</button></span>'
               +   '</strong></span>'
               + '</div>'
               + '<div class="row"></div>',
          template: '<div class="popover popover-skill" role="tooltip">'
                  +   '<div class="arrow"></div>'
                  +   '<div class="popover-title"></div>'
                  +   '<div class="popover-content"></div>'
                  + '</div>'
          //viewport: '#skill-pool'
        }).on('shown.bs.popover', function() {
          var that = $(this);
          $('.popover').find('button.close').on('click', function() {
            that.popover('hide');
            return false;
          })
          $('.popover').off('click').on('click', function() {
            return false;
          })

          $('.popover').find('.glyphicon-question-sign').off('click').on('click', function() {
            skill_interface.show_description($(this).attr('data-skill-name'));
            $('#skill-desc').modal('show');

            return false;
          })
        })

        data[id] = true;
        smart_trigger();
      }, 25);
    } else {
      smart_trigger();
    }

    //var op = $('#' + id).data('bs.popover').options;
    //op.content = get_details(id);
    //op.viewport = traverse_to_parent(id);
    //op.container = traverse_to_parent(id);

    //console.log(op);


  }

  var append_preqs = function(skill, key) {
    if (skills.has_tier(skill)) return '';
    var o = skill_preq.get_specific(skill, key);

    var join_list = function(list, needle) {
      var s = [];
      $.each(list, function(k, v) {
        s.push(k + ' (' + skills.get_cost(k) + ')');
      })
      return s.join(needle);
    }
    
    if (o != undefined && o.list != undefined) {
      var needle = o.predicate == 'and' ? ' & ' : ' | ';
      return '&raquo; ' + join_list(o.list, needle);
    }

    return '';
  }

  var get_details = function(id) {
    var s = '';
    var skill_name = skills.hash(id);
    
    var skill = skills.data()[skill_name]
    var cond = skill.conditions;
    var constraint = skills.constraint_satisfied(skill);
    var base_cost = constraint.base_cost;
    var min_cost = constraint.is_satisfied ? Object.keys(constraint.possible_costs).sort()[0] : -1;
    var is_open = constraint.is_open;
    var has_strain = (cond.innate != undefined && cond.innate.length > 0)
                  || (cond.innate_disadvantage != undefined && cond.innate_disadvantage > 0)
                  || (cond.innate_disabled != undefined && cond.innate_disabled > 0)
    var preqs = skill_preq.get(skill_name);
    var preq_class = 'cond-preq';


    if (is_open) {
      s += '<div>Open: ' + cond.open + '</div><hr/>';
    }

    var innate_class = 'cond-disabled';
    var profession_class = 'cond-disabled';

    var config = skills.get_config();
    var strain = config.strain;
    var professions = config.professions;

    $.each(cond.innate, function(i, x) {
      if (strain == x) { 
        innate_class = 'cond-cheapest'; 
      } else {
        innate_class = 'cond-disabled';
      }
      
      s += '<div class="' + innate_class + '">' + x + ': ' + 3 + '</div>';
      if (innate_class == 'cond-disabled') {
        s += '<div class="' + innate_class + '">' + append_preqs(skill_name, x) + '</div>';
      } else {
        s += '<div class="' + preq_class + '">' + append_preqs(skill_name, x) + '</div>';
      }
    })

    innate_class = 'cond-disabled';
    $.each(cond.innate_disadvantage, function(i, x) {
      if (strain == x) { innate_class = 'cond-error'; }
      s += '<div class="' + innate_class + '">' + x + ': [x2]</div>';
      if (innate_class == 'cond-disabled') {
        s += '<div class="' + innate_class + '">' + append_preqs(skill_name, x) + '</div>';
      } else {
        s += '<div class="' + preq_class + '">' + append_preqs(skill_name, x) + '</div>';
      }
    })

    innate_class = 'cond-disabled';
    $.each(cond.innate_disabled, function(i, x) {
      if (strain == x) { innate_class = 'cond-error'; }
      s += '<div class="' + innate_class + '">' + x + ': [Disabled]</div>';
    })

    if (has_strain) {
      s += '<hr>';
    }

    var is_purchased_profession = function(query) {
      var is_found = false;

      $.each(professions, function(k, v) {
        if (k == query) {
          is_found = true;
          return false;
        }
      })

      return is_found;
    }

    $.each(cond, function(k, v) {
      profession_class = 'cond-disabled';
      if (profession_basic.is_profession(k) 
       || profession_conc.is_profession(k)
       || profession_adv.is_profession(k)) {
        if (is_purchased_profession(k)) {
          profession_class = 'cond-discounted';

          if (min_cost == v.cost) {
            profession_class = 'cond-cheapest'
          }
        }
        

        s += '<div class="' + profession_class + '">' + k + ': ' + v.cost + '</div>';
        if (profession_class == 'cond-disabled') {
          s += '<div class="' + profession_class + '">' + append_preqs(skill_name, k) + '</div>';
        } else {
          s += '<div class="' + preq_class + '">' + append_preqs(skill_name, k) + '</div>';
        }
      }
      // } else if (profession_conc.is_profession(k)) {
      //   s += '<div>' + k + '</div>';
      // }
    })

    var interaction = skills.get_interaction(skill_name);
    var ias = new Array();
    var c = '';
    if (interaction.counters != undefined) {
      ias.push('<span class="label label-success">Counters</span> ' 
               +  interaction.counters.join(', '));
    }

    if (interaction.countered != undefined) {
      ias.push('<span class="label label-warning">Countered by</span> ' 
               +  interaction.countered.join(', '));
    }

    c = ias.join('<br />');

    return '<div class="popover-costs">'
         +   s
         + '</div>'
         + (c.length > 0 
           ? ('<div class="popover-interactions">'
             +   c
             +'</div>')
           : '');
  }


  var hide = function() {
    $('#' + current_click).popover('hide');
    state = 'hidden';
  }

  var destroy = function() {
    if (current_click == null) return;

    // var obj = $('#' + current_click);
    // obj.popover('destroy');
    // data = {};
    $.each(data, function(id, _junk) {
      $('#' + id).popover('destroy');
    })
    data = {}
    
    state = 'hidden';
    //delete data[current_click];
    clearTimeout(timeout);   
    //console.log(' >>> destroyed ' + current_click); 
  }

  return {
    attach: attach,
    hide: hide,
    destroy: destroy
  }
}()
;
