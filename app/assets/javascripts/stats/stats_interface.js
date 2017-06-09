var stats_interface = function() {
  var delay_interval = setTimeout(null, 0);
  var base = { hp: 0, mp: 0, inf: 0 };

  var attach = function() {
    _attach('hp'); _attach('mp'); _attach('inf');
  }

  var _attach = function(x) {
    $('#btn-' + x + '-sub').on('click', function() {
      adjust(x, -1);
    })

    $('#btn-' + x + '-add').on('click', function() {
      adjust(x, 1);
    })

    $('#stat-purchased-' + x).on('keyup', function() {
      if ($(this).attr('id') == 'stat-purchased-inf') {
        var current_val = parseInt($(this).val());
        if (current_val > base.inf) {
          $(this).val(base.inf);
          $('#btn-inf-add').prop('disabled', true);
        }
      }

      evaluate_sum(x);
    }).on('keydown', function(e) {
      if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39) { return true; }
      if (e.keyCode >= 48 && e.keyCode <= 57) { return true; }
      if (e.keyCode >= 96 && e.keyCode <= 105) { return true; }
      
      return false;
    })
 
    evaluate_sum(x);
  }

  var adjust = function(x, val) {
    var current_value = parseInt($('#stat-purchased-' + x).val());
    var new_value = current_value + val;

    if (x == 'inf') {
      var button = $('#btn-inf-add');
      button.prop('disabled', new_value == base.inf);
    }

    $('#stat-purchased-' + x).val(new_value);
    evaluate_sum(x);
  }

  var set = function(d) {
    if (d == undefined) {
      d = { hp: 0, mp: 0, inf: 0 };
    }

    $.each(d, function(key, value) {
      $('#stat-purchased-' + key).val(value);
      evaluate_sum(key);
    })
  }

  var update = function(hp, mp, inf) {
    update_base('hp', hp);
    update_base('mp', mp);
    update_base('inf', inf);

    profile.save_all();
  }

  var update_base = function(type, value) {
    var obj = $('#stat-base-' + type);
    obj.text(value);
    base[type] = value;

    evaluate_sum(type);
  }

  var update_state = function(type) {
    var value = parseInt($('#stat-purchased-' + type).val());
    var button = $('#btn-' + type + '-sub');

    button.prop('disabled', value == 0);
  }

  var evaluate_sum = function(type) {
    var base = $('#stat-base-' + type);
    var purchased = $('#stat-purchased-' + type);
    var target = $('#stat-sum-' + type);

    if (type == 'inf') {
      var sum = parseInt(base.text()) - parseInt(purchased.val());
    } else {
      var sum = parseInt(base.text()) + parseInt(purchased.val());
    }
    target.text(sum);
    update_state(type);
    calc.recalculate_purchased_stats();

    clearTimeout(delay_interval);
    var current_profile = profile.get_old_name();

    // console.log('stat evaluated');
    delay_interval = setTimeout(function() {
      profession_conc_interface.validate_existing();
      profession_adv.update();
      profile.save_all_delayed(current_profile);
    }, 500);

  }

  var get_config = function() {
    return {
      hp: parseInt($('#stat-sum-hp').text()),
      mp: parseInt($('#stat-sum-mp').text()),
      xp: parseInt($('#xp-total-acquired').text())
    }
  }

  return {
    adjust: adjust,
    attach: attach,
    get_config: get_config,
    set: set,
    update: update
  }
}()