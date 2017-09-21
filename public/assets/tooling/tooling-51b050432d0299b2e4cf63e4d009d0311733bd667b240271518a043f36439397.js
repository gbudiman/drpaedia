var tooling = function() {
  var delay_interval = setTimeout(null, 0);
  var group_interval = setTimeout(null, 0);
  var indent_interval = setTimeout(null, 0);
  var popover_caller;
  var state;
  var move_up_disabled = false;
  var move_down_disabled = false;

  var attach = function() {
    // attach_to('skills-acquired');
    // attach_to('skills-planned');
    attach_object('tool-acq-group', 'skills-acquired');
    attach_object('tool-separator', 'skills-planned');
    attach_object('tool-stat-planner', 'skills-planned');
    attach_object('tool-checkin-planner', 'skills-planned');
    attach_object('tool-profession-planner', 'skills-planned');
    attach_visual_tool('tool-acq-expand-all', 'skills-acquired', 'expand');
    attach_visual_tool('tool-acq-collapse-all', 'skills-acquired', 'collapse');
    attach_visual_tool('tool-plan-expand-all', 'skills-planned', 'expand');
    attach_visual_tool('tool-plan-collapse-all', 'skills-planned', 'collapse');
    attach_dropdown_event();
  }

  var attach_dropdown_event = function() {
    $('button.dropdown-tool').on('click', function() {
      hide_popover();
      skill_popup.hide();
    })
  }

  var attach_visual_tool = function(type, target_id, action) {
    $('#' + type).on('click', function(event) {
      var button_class = action == 'expand' ? '.glyphicon-menu-down' : '.glyphicon-menu-up';
      $('#' + target_id).find(button_class).trigger('click');
      event.preventDefault();
    })
  }

  var attach_object = function(type, target_id) {
    $('#' + type).on('click', function(event) {
      var target = $('#' + target_id);
      var cloned = $('#' + type + '-base').clone(true, true);
      cloned.hide().show().css('opacity', 0);

      cloned.removeAttr('id').prependTo(target);
      cloned.velocity({
        opacity: 1
      }, 250);
      activate(cloned);
      auto_indent(target);
      profile.save_all();
      event.preventDefault();
    })
  }

  var copy_programmatically = function(type, target_id, args) {
    var target = $('#' + target_id);
    var cloned = $('#' + type + '-base').clone(true, true);
    cloned.removeAttr('id').appendTo(target);
    activate(cloned);
    auto_indent(target);

    if (args.title != undefined) { 
      cloned.find('.tool-editable').text(args.title);
    }

    if (args.option != undefined) {
      cloned.find('.tool-option').text(args.option);
    }

    if (args.nominal != undefined) {
      cloned.find('.tool-value').text(args.nominal);
    }

    if (args.selected != undefined) {
      rebuild_prof_list(cloned);
      cloned
        .find('.tool-prof-select')
          .find('option:contains("' + args.selected + '")')
            .attr('selected', true);
    }

    if (args.is_collapsed != undefined) {
      cloned.attr('data-group-is-collapsed', args.is_collapsed);
    }

    profile.save_all();
  }

  var attach_handles = function(obj, enable) {
    if (enable) {
      if (obj.find('.glyphicon-arrow-up').length > 0) return;

      var down = ' <span class="glyphicon glyphicon-arrow-down pull-right"></span> ';
      var up = '<span class="glyphicon glyphicon-arrow-up pull-right"></span>';

      //obj.prepend(down);
      //obj.children().last().before(up).after(down);
      //obj.children().last().prev().before(up)
      //obj.children().last().after(down)
      var anchor = obj.find('.skill-cost');
      anchor.after(down);
      anchor.before(up);
      activate(obj);
    } else {
      obj.find('.glyphicon-arrow-up').remove();
      obj.find('.glyphicon-arrow-down').remove();
      obj.find('.glyphicon-option-vertical').remove();
    }
  }

  var activate = function(obj) {
    obj.find('.glyphicon-arrow-down').on('click', function() {
      if (!move_down_disabled) {
        enable_translocator(false);
        move($(this).parent(), 'down');
      }
      return false;
    })

    obj.find('.glyphicon-arrow-up').on('click', function() {
      if (!move_up_disabled) {
        enable_translocator(false);
        move($(this).parent(), 'up');
      }
      
      return false;
    })

    obj.find('.glyphicon-refresh').on('click', function() {
      alternate($(this).parent());
      return false;
    })

    obj.find('.glyphicon-minus').on('click', function() {
      adjust($(this).parent(), -1);
      return false;
    })

    obj.find('.glyphicon-plus').on('click', function() {
      adjust($(this).parent(), 1);
      return false;
    })

    obj.find('.group-collapsible').on('click', function() {
      toggle_group_visibility($(this).parent(), true);
      return false;
    })

    // $('.tool').find('.glyphicon-option-horizontal').on('click', function() {
    //   more_options($(this));
    // })

    obj.find('.tool-editable').editable({
      type: 'text',
      unsavedclass: null,
      placeholder: 'Enter new name...',
      value: '',
      container: 'body'
    }).on('shown', function() {
      //hide_popover();
      var that = $(this);
      var input = $('.editable-popup').find('input');

      if (that.text() == '<Unnamed>') {
        input.val('');
      } else {
        input.val(that.text());
      }

      $('.editable-popup').find('.editable-submit').off('click').on('click', function() {
        var caller = that;
        var new_value = $(this).parent().parent().find('input').val();
        if (new_value.trim().length == 0) {
          new_value = '<Unnamed>';
        }

        caller.editable('hide');
        caller.text(new_value);
        profile.save_all();
      })
    }).on('click', function() {
      return false;
    })

    rebuild_prof_list(obj);

    $.each(obj.find('.glyphicon-option-horizontal'), function() {
      more_options($(this));
      $(this).on('click', function() {
        if (popover_caller != null) {
          popover_caller.popover('hide');
        }
        popover_caller = $(this);
        popover_caller.popover('toggle');

        return false;
      })

      return false;
    })

    if (!obj.hasClass('skill')) {
      obj.on('click', function() {
        dragdrop.select_tool($(this));
        return false;
      })
    }

    calc.recalculate_all();
  }

  var enable_translocator = function(val) {
    move_up_disabled = !val;
    move_down_disabled = !val;

    var color = val ? '#333' : '#aaa';

    $('.drop-box').find('span.glyphicon.glyphicon-arrow-up').css('color', color);
    $('.drop-box').find('span.glyphicon.glyphicon-arrow-down').css('color', color);
  }

  var toggle_group_visibility = function(obj, exec) {
    var attr = obj.attr('data-group-is-collapsed') || 'false';
    var is_collapsed = attr == 'false' ? false : true;
    var target = new Array();
    var arrow = obj.find('.group-collapsible');
    var member_count = obj.find('.tool-compute-children');

    clearTimeout(group_interval);

    var get_children = function() {
      var el = obj.next();

      while(el.length > 0) {
        if (el.hasClass('tool-separator')) break;
        target.push(el);
        el = el.next();
      }
    }

    var adjust_orientation = function(exec) {
      //console.log('orientation adjusted ' + is_collapsed + ' exec ' + exec + ' (' + target.length + ')');
      if (target.length == 0) {
        arrow.removeClass('glyphicon-menu-up glyphicon-menu-down');
        member_count.text('');
        obj.attr('data-group-is-collapsed', false);

        return;
      }

      if ((is_collapsed && exec) || (!is_collapsed && !exec)) {
        arrow
          .removeClass('glyphicon-menu-down')
          .addClass('glyphicon-menu-up')
        member_count.text('');
        
      } else {
        arrow
          .removeClass('glyphicon-menu-up')
          .addClass('glyphicon-menu-down')
        member_count.text(' +' + target.length);
      }
    }

    get_children();
    adjust_orientation(exec);

    if ((is_collapsed && exec) || (!is_collapsed && !exec)) {
      // console.log('expanding');
      obj.attr('data-group-is-collapsed', false);
      $.each(target, function(i, x) { 
        //x.show(); 
        //x.css('margin-top', 0);
        x.show()
          .css('opacity', exec ? 0 : 1)
          .velocity({
            'margin-top': 0,
            opacity: 1
          }, 200, function() {
            //enable_translocator(true);
          })
        x.attr('data-group-altered', 'true');
      })
    } else {
      // console.log('collapsing');
      obj.attr('data-group-is-collapsed', true);
      //var height_amount = 0;
      $.each(target, function(i, x) { 
        //x.hide(); 
        var height_amount = $(this).outerHeight();

        x.velocity({
          opacity: exec ? 0 : 1,
          'margin-top': (-1 * height_amount) + 'px'
        }, 200, function() {
          x.hide();
          //enable_translocator(true);
        })
        x.attr('data-group-altered', 'true');
      })
    }

    if (exec != undefined && exec) {
      var current_profile = profile.get_current_name();
      group_interval = setTimeout(function() {
        profile.save_all_delayed(current_profile);
      }, 250)
    }
    
  }

  var rebuild_prof_list = function(_obj) {
    var is_prof_sel = _obj.hasClass('tool-prof-planner');

    if (!is_prof_sel) return;
    _obj.find('.tool-prof-select').remove();
    var anchor = _obj.find('.tool-option');
    var pclass = anchor.text();

    //obj.empty();
    
    var s = ' <select class="tool-prof-select"><option>No selection</option>';
    var p;

    switch(pclass) {
      case 'Conc': p = profession_conc.get_purchaseable(); break;
      case 'Basic': p = profession_basic.get_purchaseable(); break;
      case 'Forget': p = profession_basic.get_forgettable(); break;
    }
    $.each(p, function(k, _junk) {
      s += '<option>' + k + '</option>';
    })
    s += '</select>';

    $(s).insertAfter(anchor);

    _obj.find('.tool-prof-select').on('change', function() {
      skills.evaluate_planned();
      profile.save_all();
    })
    //anchor.next().selectpicker();
  }

  var update_planned_prof_list = function() {
    $('#skills-planned').find('.tool-option').each(function() {
      var obj = $(this).next();
      var parent = $(this).parent();

      var current_selection = obj.find('option:selected').text();

      rebuild_prof_list(parent);
      var sel = parent.find('.tool-prof-select');
      var sel2 = sel.find('option:contains("' + current_selection + '")');
      sel2.prop('selected', true);
      //.prop('selected', true);
      // $('.tool-prof-select option:contains("Distiller")').prop('selected', true)
    })
  }

  var adjust = function(obj, value) {
    hide_popover();
    var target = obj.find('.tool-value');
    var current_value = parseInt(target.text());

    if (value == -1) {
      if (current_value == 0) return;
    } 

    if (isNaN(current_value)) current_value = 0;

    target.text(current_value + value);
    calc.recalculate_planned_stats();

    clearTimeout(delay_interval);

    var current_profile = profile.get_old_name();
    delay_interval = setTimeout(function() {
      profile.save_all_delayed(current_profile);
    }, 500);

    update_compute_group(obj);
  }

  var update_compute_group = function(obj) {
    compute_group(obj.parent());
    //if (obj.find('.glyphicon-option-vertical').length == 0) return;
    //var anchor
  }

  var alternate = function(obj) {
    hide_popover();
    var target = obj.find('.tool-option');

    if (target.text() == 'HP') {
      target.text('MP');
    } else if (target.text() == 'MP') {
      target.text('HP');
    } else if (target.text() == 'Basic') {
      target.text('Conc');
      obj.find('.tool-prof-xp').text('30');
      rebuild_prof_list(obj);
      skills.evaluate_planned();
      compute_group($('#skills-planned'));
      calc.recalculate_planned_profession();
    } else if (target.text() == 'Conc') {
      target.text('Forget');
      obj.find('.tool-prof-xp').text('10');
      rebuild_prof_list(obj);
      skills.evaluate_planned();
      compute_group($('#skills-planned'));
      calc.recalculate_planned_profession();
    } else if (target.text() == 'Forget') {
      target.text('Basic');
      obj.find('.tool-prof-xp').text('10');
      rebuild_prof_list(obj);
      skills.evaluate_planned();
      compute_group($('#skills-planned'));
      calc.recalculate_planned_profession();
    }

    profile.save_all();
  }

  var find_end_of_group_from = function(obj) {
    var current_obj = obj.next();
    var prev_obj = obj;

    while (current_obj.length > 0) {
      if (is_group(current_obj)) {
        return prev_obj;
      }

      prev_obj = current_obj;
      current_obj = current_obj.next();
    }

    return prev_obj;
  }

  var move = function(obj, direction) {
    var objs = new Array();
    hide_popover();
    var anchor;
    var relocate_pixel_amount = 0;
    var anchor_members = new Array();
    var animation_duration_ms = 200;


    var animate_displacement = function(dir, objs, target, displacement) {

      var f = null;
      var a_px = 0;
      var b_px = 0;

      var reset_animation_state = function() {
        $.each(objs, function(i, obj) {
          obj.css('top', 0)
        })

        $.each(target, function(i, t) {
          t.css('top', 0)
        })

        enable_translocator(true);
      }

      $.each(objs, function(i, d_obj) {
        if (d_obj.hasClass('tool-separator') || d_obj.is(':visible')) {
          a_px += d_obj.outerHeight();
        }
      })

      $.each(target, function(i, t) {
        if (t.hasClass('tool-separator') || t.is(':visible')) {
          b_px += t.outerHeight();
        }
      });

      if (dir == 'up') {
        f = function() {
          $.each(objs, function(i, obj) {
            var cached_visible = obj.is(':visible');
            obj.hide().insertBefore(anchor);

            if (obj.hasClass('tool-separator') || cached_visible) {
              obj.show();
            }
          })
          
        }
      } else {
        f = function() {
          $.each(objs, function(i, obj) {
            var cached_visible = obj.is(':visible');
            obj.hide().insertAfter(anchor);

            if (obj.hasClass('tool-separator') || cached_visible) {
              obj.show();
            }
          })
          
        }
      }

      $.each(objs, function(i, x) { x.css('position', 'relative')})
      $.each(target, function(i, x) { x.css('position', 'relative')})

      if (dir == 'up') {
        b_px *= -1;
      } else {
        a_px *= -1;
      }

      return new Promise(function(resolve, reject) {
        $.each(objs, function(i, obj) {
          obj.velocity({
            'top': b_px + 'px'
          }, animation_duration_ms)
        })
        

        $.each(target, function(i, t) {
          t.velocity({
            'top': a_px + 'px'
          }, animation_duration_ms, function() {
            f();
            reset_animation_state();
            resolve(true);
          })
        })
      })


    }

    if (is_group(obj)) {
      var maybe_anchor;
      if (direction == 'up') {
        maybe_anchor = obj.prev();
      } else if (direction == 'down') {
        maybe_anchor = obj.next();
      }

      while (maybe_anchor.length > 0) {
        if (is_group(maybe_anchor)) {
          if (direction == 'down') {
            anchor = find_end_of_group_from(maybe_anchor);
          } else if (direction == 'up') {
            anchor = maybe_anchor;
          }
          break;
        }

        if (direction == 'up') {
          anchor = maybe_anchor;
          maybe_anchor = maybe_anchor.prev();
          if (maybe_anchor.find('.glyphicon-option-vertical').length == 0) {
            anchor = null;
            //break;
          }
          
        } else if (direction == 'down') {
          anchor = maybe_anchor;
          maybe_anchor = maybe_anchor.next();

          if (maybe_anchor.length == 0) {
            anchor = null;
          }
        }
      }
    } else {
      if (direction == 'up') {
        anchor = obj.prev();
      } else if (direction == 'down') {
        anchor = obj.next();
      }
    }

    if (anchor == null) {
      enable_translocator(true);
      return;
    }

    objs.push(obj);

    if (is_group(obj)) {
      var current_obj = obj.next();
     
      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        objs.push(current_obj);
        current_obj = current_obj.next();
      } 
    }

    var ordered = objs;

    if (direction == 'down') {
      ordered = ordered.reverse();
    }

    var determine_displacement_amount = function(dir, objs, anchor) {
      var amount = 0;
      //console.log(anchor);
      var obj = dir == 'up' ? objs[0] : objs[objs.length - 1];
      var members = new Array();
      if (obj.hasClass('tool-separator')) {
        
        var member = null;
        if (dir == 'up') {
          member = obj.prev();
        
          while (member.length > 0) {
            if (member.hasClass('tool-separator')) {
              amount += member.outerHeight();
              members.push(member);
              break;
            }

            amount += member.outerHeight();
            members.push(member);
            member = member.prev();
          }
        } else if (dir == 'down') {
          members.push(anchor);
          amount += anchor.outerHeight();
                
          if (!anchor.hasClass('tool-separator')) {
            member = anchor.prev();
            while (member.length > 0) {
              if (member.hasClass('tool-separator')) {
                amount += member.outerHeight();
                members.push(member);
                break;
              }
              amount += member.outerHeight();
              members.push(member);
              member = member.prev()
            }
          }
        }

        /*var members = new Array();
        var member = dir == 'up' ? obj.prev() : obj.next();

        if (dir == 'down') {
          amount += member.outerHeight();
          members.push(member);
          member = member.next();
        }

        while (member.length > 0) {
          if (member.hasClass('tool-separator')) {
            amount += member.outerHeight();
            break;
          }
          amount += member.outerHeight();
          members.push(member);
          member = dir == 'up' ? member.prev() : member.next();
        }*/

      } else {
        amount = anchor.outerHeight();
        members.push(anchor);
      }

      return {
        amount: dir == 'up' ? amount : -amount,
        target: members
      }
      return dir == 'up' ? amount : -amount;
    }

    var displacement = determine_displacement_amount(direction, objs, anchor);
    //console.log('Target object displace up by ' + displacement.amount + ' px');
    animate_displacement(direction, objs, displacement.target).then(function() {
      auto_indent(obj.parent());
      profile.save_all();      
    })


  }

  var auto_collapse = function(obj) {
    if (dynaloader.get_gil('ok_to_sort') == false) return;
    manager.log('-- auto collapse');
    $.each(obj.children(), function() {
      var that = $(this);
      if (is_group(that)) {
        // console.log('Auto Collapse -> toggle_group_visibility');
        toggle_group_visibility(that);
      }
    })
    
  }

  var exec_indent = function(obj) {
    if (dynaloader.get_gil('ok_to_sort') == false) return;
    manager.log('-- exec indent');
    if (obj.attr('id') != 'skills-acquired' && obj.attr('id') != 'skills-planned') {
      obj = obj.parent();
    }

    // console.log('Auto Indent -> auto_collapse');
    auto_collapse(obj);

    // console.log('Auto Indent -> compute_group');
    compute_group(obj);
    var state = 'init';
    obj.children().each(function() {
      var curr = $(this);

      indent(curr, false);
      if (is_group(curr)) {
        state = 'indent';
      } else {
        if (is_group(curr)) {
          // do not indent leading group
        } else if (state == 'indent') {
          indent(curr, true);
        }
      }
    })
  }

  var auto_indent = function(_obj) {
    clearTimeout(indent_interval);
    indent_interval = setTimeout(function() {
      exec_indent(_obj);
    }, 500);
  }

  var auto_indent_all = function() {
    // console.log('Auto indent ALL');
    exec_indent($('#skills-acquired'));
    exec_indent($('#skills-planned'));
  }

  var compute_group = function(obj) {
    if (dynaloader.get_gil('ok_to_sort') == false) return;
    manager.log('-- compute group')
    var state = 'out';
    var anchor = null;
    var checkin = 0;
    var expense = 0;

    var update_and_reset_anchor = function(anchor) {
      anchor.find('.tool-compute-expend').text(expense);
      anchor.find('.tool-compute-checkin').text(checkin);
      checkin = 0;
      expense = 0;
    }

    $.each(obj.children(), function() {
      var that = $(this);
      if (state == 'out') {
        if (that.hasClass('tool-separator')) {
          anchor = that;
          state = 'in';
        }
      } else if (state == 'in') {
        if (that.hasClass('tool-separator')) {
          update_and_reset_anchor(anchor);
          anchor = that;
          state = 'in';
        } else if (that.hasClass('tool-stat-planner')) {
          expense += parseInt(that.find('.tool-value').text());
        } else if (that.hasClass('tool-prof-planner')) {
          expense += parseInt(that.find('.tool-prof-xp').text());
        } else if (that.hasClass('skill')) {
          expense += parseInt(that.find('.skill-cost').text());
        } else if (that.hasClass('tool-checkin-planner')) {
          checkin += parseInt(that.find('.tool-value').text());
        }
      }
    })

    if (anchor != null) {
      update_and_reset_anchor(anchor);
    }

    // console.log(' >>> compute group completed');
  }

  var indent = function(obj, apply) {
    var marker_class = 'glyphicon-option-vertical';
    if (apply) {
      var s = '<span class="glyphicon ' + marker_class + '"></span>';
      obj.prepend(s);
    } else {
      obj.find('.' + marker_class).remove();
    }
  }

  var more_options = function(obj) {
    obj.popover({
      trigger: 'manual',
      html: true,
      content: generate_more_options(obj.parent()),
      placement: 'top',
      container: '#main-right'
    }).on('shown.bs.popover', function() {
      apply_popover_interactivity();
      highlight_children(obj.parent(), true);
    }).on('hide.bs.popover', function() {
      highlight_children(obj.parent(), false);
    })
  }

  var highlight_children = function(obj, val) {
    //if (val) { obj.addClass('bg-primary'); }
    //else { obj.removeClass('bg-primary'); }
    
    var apply = function(cobj) {
      if (val) { 
        cobj.addClass('tool-highlight'); 
      }
      else { 
        cobj.removeClass('tool-highlight'); 
      }
    }

    if (!is_group(obj)) {
      apply(obj);
    } else {
      var current_obj = obj.next();
      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        apply(current_obj);
        
        current_obj = current_obj.next();
      }
    }

    

  }

  var apply_popover_interactivity = function() {
    var popover = $('.popover');
    popover.find('.glyphicon').parent().css('cursor', 'pointer');

    attach_more_options_apply(popover.find('.glyphicon-ok').parent());
    attach_more_options_remove(popover.find('.glyphicon-remove').parent());
    attach_more_options_remove_group(popover.find('.glyphicon-remove-circle').parent());
    attach_close_popover(popover.find('.glyphicon-menu-down').parent());
  }

  var attach_more_options_remove = function(obj) {
    obj.on('click', function() {
      var cached = popover_caller.parent();
      var next = cached.next();
      var is_planned_profession = false;

      if (cached.hasClass('tool-prof-planner')) {
        is_planned_profession = true;
      }

      popover_caller.popover('hide');
      popover_caller.parent().velocity({
        opacity: 0
      }, 250, function() {
        popover_caller.parent().remove();
      })

      while (next.length > 0) {
        if (!next.hasClass('tool-highlight')) break;
        next.removeClass('tool-highlight');
        next = next.next();
      }

      if (is_planned_profession) {
        skills.evaluate_planned();
      }

      auto_indent_all();
      dragdrop.deselect_all();
      calc.recalculate_all();
      profile.save_all();
    })
  }

  var attach_more_options_remove_group = function(obj) {
    obj.on('click', function() {
      var objs = new Array();
      var current_obj = popover_caller.parent();
      var to_pool = new Array();
      objs.push(current_obj);
      current_obj = current_obj.next();

      popover_caller.popover('hide');

      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        objs.push(current_obj);
        current_obj = current_obj.next();
      }

      $.each(objs, function(i, x) {
        if (x.hasClass('skill')) {
          to_pool.push(x.attr('id'))
          //dragdrop.drop_to_pool(x.attr('id'));
          x.removeClass('tool-highlight');
        } else {
          //x.remove();

          x.velocity({
            opacity: 0
          }, 250, function() {
            x.remove();
          })
        }
      })


      dragdrop.drop_to_pool(to_pool);
      calc.recalculate_all();
      profile.save_all();
    })
  }

  var attach_more_options_apply = function(obj) {
    obj.on('click', function() {
      var target = popover_caller.parent();

      popover_caller.popover('hide');
      //dynaloader.set_delegate('initial_load', calc.recalculate_all, function() {
      dynaloader.set_gil(['ok_to_update_gui', 'ok_to_save'], false, function() {
        if (target.hasClass('tool-separator')) {
          var stacks = new Array();
          var current_obj = target.next();

          while (current_obj.length > 0) {
            if (is_group(current_obj)) break;

            var cached_next = current_obj.next();
            if (apply_plan(current_obj)) {
              stacks.push(current_obj);
            }

            current_obj = cached_next;
          }

          $.each(stacks, function(i, x) {
            x.remove();
          })
        } 

        if (apply_plan(target)) {
          target.remove();
        }
      })

      profile.save_all();

      return false;
    })
  }

  var apply_plan = function(obj) {
    if (obj.hasClass('tool-stat-planner')) {
      var option = obj.find('.tool-stat');
      if (option.length > 0) {
        stats_interface.adjust(option.text().toLowerCase(), 
                               parseInt(obj.find('.tool-value').text()));
      }

      return true;
    } else if (obj.hasClass('skill')) {
      dragdrop.drop_selective(obj.attr('id'), $('#skills-acquired'));
      //obj.css('background-color', '#fff');
      return false;
    } else if (obj.hasClass('tool-prof-planner')) {
      var sel = obj.find('select option:selected').text();
      var is_forget = obj.find('.tool-option').text() == 'Forget';

      if (is_forget) {
        $('.purchased-profession')
          .find('.forget-profession[data-prof="' + sel + '"]')
          .trigger('click');
      } else {
        $('[data-prof="' + sel + '"').trigger('click');
        $('[data-conc="' + sel + '"').trigger('click');

        profession_basic.apply_plan(sel);
        profession_conc.apply_plan(sel);
        skills.apply_plan(sel);

        //skills.evaluate_planned();

      }

      return true;
    }

    return true;
  }

  var attach_close_popover = function(obj) {
    obj.on('click', function() {
      popover_caller.popover('hide');
    });
  }

  var is_group = function(obj) {
    return obj.hasClass('tool-separator');
  }

  var hide_popover = function() {
    if (popover_caller == null) return;
    popover_caller.popover('hide');
  }

  var generate_more_options = function(obj) {
    var s = '';
    if (obj.hasClass('tool-applicable')) {
      s += '<div><span class="glyphicon glyphicon-ok"></span> Apply</div>';
    }


    s += '<div><span class="glyphicon glyphicon-remove"></span> Remove</div>';

    if (obj.hasClass('tool-separator')) {
      s += '<div><span class="glyphicon glyphicon-remove-circle"></span> Remove all in this group</div>';
    }


    s += '<div><hr/></div>';
    s += '<div><span class="glyphicon glyphicon-menu-down"></span> Close</div>';

    return s;
  }

  return {
    attach: attach,
    attach_handles: attach_handles,
    auto_collapse: auto_collapse,
    auto_indent: auto_indent,
    auto_indent_all: auto_indent_all,
    hide_popover: hide_popover,
    is_group: is_group,
    update_planned_prof_list: update_planned_prof_list,
    copy_programmatically: copy_programmatically,
    compute_group: compute_group,
  }
}()
;
