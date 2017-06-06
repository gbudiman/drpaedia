var notifier = function() {
  var data = {};
  var timeout_select = setTimeout(null, 0);
  var timeout_conc = setTimeout(null, 0);
  var timeout_skill = setTimeout(null, 0);
  var timeout_psis = setTimeout(null, 0);
  var timeout_adv = setTimeout(null, 0);
  var timeout = 250; //ms

  var select = function(i) {
    // if (dynaloader.has_delegations('initial_load')) { return; }
    if (!dynaloader.get_gil('ok_to_update_gui')) return;

    /*if (i == null) {
      return;
    }*/
    clearTimeout(timeout_select);
    timeout_select = setTimeout(function() {
      if (data['select'] == undefined) {
        data['select'] = $.notify({
          message: ''
        }, {
          type: 'warning',
          animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
          },
          delay: 0,
          newest_on_top: true,
          allow_dismiss: false,
          template: '<div data-notify="container" class="col-xs-8 col-sm-6 col-md-4 alert alert-{0} text-right" role="alert">' +
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
    }, timeout);
  }

  var conc_preq_missing = function(h) {
    clearTimeout(timeout_conc);
    timeout_conc = setTimeout(function() {
      var p = build_missing_conc();
      var message = generate_conc_preq_message(h);

      if (message.length == 0) {
        p.update('message', '');
        p.close();
      } else {
        p.update('message', message);
      }
    }, timeout);
    
  }

  var adv_preq_missing = function(h) {
    clearTimeout(timeout_adv);
    timeout_adv = setTimeout(function() {
      var p = build_missing_adv();

      if (h.length == 0) {
        p.update('message', '');
        p.close();
      } else {
        p.update('message', 'Constraints violated for Advanced Profession ' + h);
      }
    })
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
    clearTimeout(timeout_skill);
    timeout_skill = setTimeout(function() {
      var p = build_missing_preq();
      var message = generate_skill_preq_message(h);
      
      if (message.length == 0) {
        p.update('message', '');
        p.close();
      } else {
        p.update('message', message);
        attach_skills();
      }
    }, timeout);
  }

  var psis_preq_missing = function() {
    clearTimeout(timeout_psis);
    timeout_psis = setTimeout(function() {
      var p = build_missing_psis();
      var message = generate_psis_preq_message();

      if (message.length == 0) {
        p.update('message', '');
        p.close();
      } else {
        p.update('message', message);
      }
    }, timeout);
  }

  var generate_psis_preq_message = function() {
    var psis = skill_interface.get_psis();
    var messages = new Array();

    if (psis[3] * 2 > psis[2]) {
      var diff = 2 * psis[3] - psis[2];
      messages.push('Add ' + diff + ' more Intermediate Psionic skills');
    }

    if (psis[2] * 2 > psis[1]) {
      var diff = 2 * psis[2] - psis[1];
      messages.push('Add ' + diff + ' more Basic Psionic skills');
    }

    return messages.join('<br />');
  }

  var generate_skill_preq_message = function(h) {
    var s = '';
    var invalids = 0;

    $.each(h, function(k, v) {
      if (v.length == 0) return true;
      var t = k + ' requires the following:<br />';
      
      $.each(v, function(i, p) {
        if (Object.keys(p).length > 0) {
          invalids++;
          $.each(p, function(key, _junk) {
            t += key;
            t += ' <a class="skill-add" data-name="' + key + '">Add?</a><br />';
          })
          s += t;
        }
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
        delay: 0,
        newest_on_top: true,
        onShown: attach_skills,
        allow_dismiss: true,
        onClose: function() { delete data['skill_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['skill_missing_preq'];
  }

  var build_missing_psis = function() {
    if (data['skill_missing_psis'] == undefined) {
      data['skill_missing_psis'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        onShown: attach_skills,
        allow_dismiss: true,
        onClose: function() { delete data['skill_missing_psis']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['skill_missing_psis'];
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
        delay: 0,
        newest_on_top: true,
        allow_dismiss: true,
        onClose: function() { delete data['conc_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['conc_missing_preq'];
  }

  var build_missing_adv = function() {
    if (data['adv_missing_preq'] == undefined) {
      data['adv_missing_preq'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        allow_dismiss: true,
        onClose: function() { delete data['adv_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['adv_missing_preq'];
  }

  var attach = function() {
    var a = $('[data-notify="deselect-all"]').find('a');
    a.on('click', function() {
      dragdrop.deselect_all();
      return false;
    })
  }

  return {
    adv_preq_missing: adv_preq_missing,
    conc_preq_missing: conc_preq_missing,
    select: select,
    skill_preq_missing: skill_preq_missing,
    psis_preq_missing: psis_preq_missing,
    set_timeout: function(x) { timeout = x; }
  }
}()