var notifier = function() {
  var data = {};

  var select = function(i) {
    // if (dynaloader.has_delegations('initial_load')) { return; }
    if (!dynaloader.get_gil('ok_to_update_gui')) return;

    /*if (i == null) {
      return;
    }*/

    if (data['select'] == undefined) {
      data['select'] = $.notify({
        message: ''
      }, {
        type: 'warning',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        allow_dismiss: false,
        delay: 0,
        template: '<div data-notify="container" class="col-xs-4 col-sm-3 alert alert-{0} text-right" role="alert">' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                    '<span data-notify="deselect-all"><a href="#">Deselect all</a></span>' +
                  '</div>',
        onShow: attach,
        onClose: function() { delete data['select']; }
      });
    }

    var n = data['select'];
    
    if (i == null || i == 0) {
      n.close();
      return;
    }
    n.update('message', i + ' skills selected. ');  
  }

  var conc_preq_missing = function(h) {
    var p = build_missing_conc();
    var message = generate_conc_preq_message(h);

    if (message.length == 0) {
      //console.log('close called');
      p.update('message', '');
      p.close();
    } else {
      //console.log('updating: ' + message);
      //$.notify(message);
      p.update('message', message);
    }
  }

  var generate_conc_preq_message = function(h) {
    var s = '';
    $.each(h, function(conc, messages) {
      if (Object.keys(messages).length == 0) return true;
      s += 'Profession Concentration ' + conc + ' requires:<br />';
      $.each(messages, function(i, x) {
        s += x + '<br />';
      })
    })

    return s;
  }

  var skill_preq_missing = function(all_valid, h) {
    //if (all_valid) { return; }
    var p = build_missing_preq();

    if (!all_valid) {
      var message = generate_skill_preq_message(h)
      p.update('message', message);

      if (message.length == 0) {
        p.close();
      }

      attach_skills();
    } else {
      p.update('message', '');
      p.close();
    }
  }

  var generate_skill_preq_message = function(h) {
    var s = '';

    $.each(h, function(k, v) {
      if (v.length == 0) return true;

      s += k + ' requires the following:<br />';
      
      $.each(v, function(i, p) {
        $.each(p, function(key, _junk) {
          s += key;
          s += ' <a class="skill-add" data-name="' + key + '">Add?</a><br />';
        })
      })
    })

    return s;
  }

  var attach_skills = function() {
    $('#skill-notify').find('a.skill-add').each(function() {
      $(this).off('click').on('click', function() {
        var skill_name = $(this).attr('data-name');
        var skill_id = skills.get_code(skill_name);
        console.log('clicked ' + skill_name + ' ' + skill_id);
        dragdrop.drop_selective(skill_id, $('#skills-acquired'));
        return false;
      })
    })
  }

  var build_missing_preq = function() {
    if (data['skill_missing_preq'] == undefined) {
      data['skill_missing_preq'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        allow_dismiss: false,
        delay: 0,
        onShown: attach_skills,
        onClose: function() { delete data['skill_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['skill_missing_preq'];
  }

  var build_missing_conc = function() {
    if (data['conc_missing_preq'] == undefined) {
      data['conc_missing_preq'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        allow_dismiss: false,
        delay: 0,
        onClose: function() { delete data['conc_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['conc_missing_preq'];
  }

  var attach = function() {
    var a = $('[data-notify="deselect-all"]').find('a');
    a.on('click', function() {
      dragdrop.deselect_all();
      return false;
    })
  }

  return {
    conc_preq_missing: conc_preq_missing,
    select: select,
    skill_preq_missing: skill_preq_missing
  }
}()