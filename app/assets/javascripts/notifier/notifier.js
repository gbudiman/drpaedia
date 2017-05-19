var notifier = function() {
  var data = {};

  var select = function(i) {
    if (dynaloader.has_delegations('initial_load')) { return; }

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
    n.update('message', i + ' skills selected. ');
    if (i == 0) {
      n.close();
    }
  }

  var skill_preq_missing = function(all_valid, h) {
    if (all_valid) { return; }

    var p = build_missing_preq();

    console.log(h);

    if (!all_valid) {
      p.update('message', generate_skill_preq_message(h));
      attach_skills();
    } else {
      p.update('message', '');
      p.close();
    }
  }

  var generate_skill_preq_message = function(h) {
    var s = '';

    $.each(h, function(k, v) {
      s += k + ' requires the following:<br />';
      
      $.each(v, function(p, _junk) {
        s += p;
        s += ' <a class="skill-add" data-name="' + p + '">Add?</a><br />';
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

  var attach = function() {
    var a = $('[data-notify="deselect-all"]').find('a');
    a.on('click', function() {
      dragdrop.deselect_all();
      return false;
    })
  }

  return {
    select: select,
    skill_preq_missing: skill_preq_missing
  }
}()