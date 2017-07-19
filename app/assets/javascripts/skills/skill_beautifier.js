var skill_beautifier = function() {
  var beautify = function(ds) {
    var t = '';
    $.each(ds, function(title, text) {
      t += format(title, text);
    })

    return t;
  }

  var load_all = function() {
    $('#skill-panel').empty();

    $.ajax({
      method: 'GET',
      url: '/skills/fetch',
      data: { skill_codes: 'all' },
      cache: false
    }).done(function(res) {
      $('#skill-panel').empty().append(beautify(res));
    })
  }

  var format = function(title, text) {
    var t = '<div class="skill-title">' + title + '</div>';
    t += process(text);
    return t;
  }

  var process = function(text) {
    if (text == undefined) {
      return '<div class="skill-body">Skill info not available</div>';
    }
    
    var p_splits = text.split('{p}');
    var li_splits = new Array();
    var table_splits = new Array();

    $.each(p_splits, function(_junk, p_split) {
      var splits = p_split.split('{li}');
      var split_count = splits.length;

      if (split_count == 1) {
        li_splits.push(p_split)
      } else {
        splits[0] += '<ul>';
        splits[split_count - 1] += '</ul>';
        var split_join = splits.join('</li><li>');
        li_splits.push(split_join);
      }
    })

    $.each(li_splits, function(_junk, li_split) {
      var ls_match = li_split.match(/\{table\:(\d+)}/);
      if (ls_match) {
        var column_per_row = parseInt(ls_match[1]);
        var rightside = li_split.split(/\{table\:\d+\}/)[1];
        var cells = rightside.split('|||')

        var cell_counter = 0;
        var t = '<table class="table table-striped table-condensed"><thead>';
        $.each(cells, function(i, text) {
          if (cell_counter % column_per_row == 0 && cell_counter != 0) {
            if (cell_counter < column_per_row) {
              t += '</tr></thead><tbody>';
            } else {
              t += '</tr><tr>';
            }
          }

          if (cell_counter < column_per_row) {
            t += '<th>' + text + '</th>';
          } else {
            t += '<td>' + text + '</td>';
          }

          cell_counter++;
        })
        t += '</tbody></table>';

        table_splits.push(t.replace('{/table}', ''));

      } else {
        table_splits.push(li_split);
      }
    })

    var p_join = '<p>' + table_splits.join('</p><p>') + '</p>';

    return '<div class="skill-body">' + p_join + '</div>';
  }

  return {
    load_all: load_all,
    process: process
  }
}()