var stats_interface = function() {
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
    var new_value = parseInt($('#stat-purchased-' + x).val()) + val;
    $('#stat-purchased-' + x).val(new_value);
    evaluate_sum(x);
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
  }

  return {
    adjust: adjust,
    attach: attach,
    update: update
  }
}()