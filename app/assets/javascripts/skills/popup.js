var skill_popup = function() {
  var data = {};
  var current_click;
  var state;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle($(this).attr('id'));
    })
  }

  var build = function(id) {

  }

  var handle = function(id) {
    if (data[id] == undefined) {
      $('#' + id).popover({
        content: 'Loading...',
        trigger: 'manual',
        html: true,
        placement: 'auto bottom',
      })

      data[id] = true;
    }

    if (current_click == id) {
      if (state == 'shown') {
        $('#' + id).popover('hide');
        state = 'hidden';
      } else {
        $('#' + id).popover('show');
        state = 'shown';
      }
    } else {
      $('#' + id).data('bs.popover').options.content = get_details(id)
      $('#' + current_click).popover('hide');
      $('#' + id).popover('show');
      state = 'shown';
    }

    current_click = id;
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

    if (is_open) {
      s += '<div>Open: ' + cond.open + '</div><hr/>';
    }

    var innate_class = 'cond-disabled';
    var profession_class = 'cond-disabled';

    var config = skills.get_config();
    var strain = config.strain;
    var professions = config.professions;

    $.each(cond.innate, function(i, x) {
      if (strain == x) { innate_class = 'cond-cheapest'; }
      s += '<div class="' + innate_class + '">' + x + ': ' + 3 + '</div>';
    })

    innate_class = 'cond-disabled';
    $.each(cond.innate_disadvantage, function(i, x) {
      if (strain == x) { innate_class = 'cond-error'; }
      s += '<div class="' + innate_class + '">' + x + ': [x2]</div>';
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
      if (profession_basic.is_profession(k)) {
        if (is_purchased_profession(k)) {
          profession_class = 'cond-discounted';

          if (min_cost == v.cost) {
            profession_class = 'cond-cheapest'
          }
        }
        

        s += '<div class="' + profession_class + '">' + k + ': ' + v.cost + '</div>';
      }
    })

    return s;
  }


  var hide = function() {
    $('#' + current_click).popover('hide');
    state = 'hidden';
  }

  return {
    attach: attach,
    hide: hide
  }
}()