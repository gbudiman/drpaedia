var calc = function() {
  var data = {
    'skills-acquired': 0,
    'skills-planned': 0,
    'stats-acquired': 0,
    'stats-planned': 0
  }

  var recalculate_all = function() {
    if (dynaloader.has_delegations('xp_calc')) { return; }
    
    recalculate('skills-planned');
    recalculate('skills-acquired');
    recalculate_purchased_stats();
    recalculate_planned_stats();
    recalculate_top_level('skills');
    recalculate_top_level('stats');

    recalculate_tally();
  }

  var recalculate_skills = function() {
    recalculate('skills-planned');
    recalculate('skills-acquired');
    recalculate_top_level('skills');
    recalculate_tally();
  }

  var recalculate_purchased_stats = function() {
    data['stats-acquired'] = parseInt($('#stat-purchased-hp').val())
                           + parseInt($('#stat-purchased-mp').val());

    //$('#xp-stats-acquired').text(data['stats-acquired']);
    recalculate_top_level('stats');
    recalculate_tally();
  }

  var recalculate_planned_stats = function() {
    var sum = 0;

    $('#skills-planned').find('.stat-cost').each(function() {
      sum += parseInt($(this).text());
    })
    $('#skills-planned-stats').text(sum);

    data['stats-planned'] = sum;

    recalculate_top_level('stats');
    recalculate_tally();
  }

  var recalculate_tally = function() {
    $('#xp-total-acquired').text(data['skills-acquired'] + data['stats-acquired']);
    $('#xp-total-planned').text(data['skills-planned'] + data['stats-planned']);
  }

  var recalculate_top_level = function(id) {
    $('#xp-' + id + '-acquired').text(data[id + '-acquired']);
    $('#xp-' + id + '-planned').text(data[id + '-planned']);
  }

  var recalculate = function(id) {
    var sum = 0;

    $('#' + id).find('.skill-cost').each(function() {
      sum += parseInt($(this).text());
    })

    $('#' + id + '-xp').text(sum);

    data[id] = sum;
  }

  return {
    recalculate_all: recalculate_all,
    recalculate_skills: recalculate_skills,
    recalculate_planned_stats: recalculate_planned_stats,
    recalculate_purchased_stats: recalculate_purchased_stats
  }
}()