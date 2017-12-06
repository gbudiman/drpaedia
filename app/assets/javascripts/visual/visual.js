var visual = function() {
  var cols;
  var rows;
  var cells;
  var table;
  var col_indexes;
  var prof_only_indexes;
  var innate_cost;
  var col_separator;
  var strains_data = strains.data()

  var attach = function() {
    innate_cost = 3;
    table = $('#vis-table');
    dynaloader.load_remote().then(function() {
      cols = build_columns();
      rows = build_rows();

      render();
    });
  }

  var attach_controls = function() {
    var attach_control = function(x) {
      $('#hide-' + x).off('change').on('change', function() {
        apply(x, $(this).prop('checked'));
      })

      apply(x, $('#hide-' + x).prop('checked'));
    }

    var apply = function(x, val) {
      var w = table.find('tr[data-type=' + x + ']');

      if (val) {
        w.hide();
      } else {
        w.show();
      }
    }

    attach_control('lore');
    attach_control('psionics');
  }


  var render = function() {

    table.bootstrapTable({
      columns: cols,
      data: rows,
      undefinedText: '',
      rowAttributes: function(row, index) {
        return {
          'data-type': row.type
        }
      },
      height: 720,
      onPostBody: function() {
        attach_controls();
      }
    })
  }

  var cell_formatter = function(value, row, index, field) {
    var a_class = ['cell'];

    if (field == 'separator') { a_class.push('separatorcell'); }

    if (row.opens[field]) { a_class.push('opencell'); }
    if (row.accesses[field]) { a_class.push('accesscell'); }
    if (row.uniques[field]) { a_class.push('uniquecell'); }
    if (row.disadvs[field]) { a_class.push('disadvcell'); }

    return {
      classes: a_class.join(' ')
    }
  }


  var build_rows = function() {
    var a = [];
    var data = skills.data();
    var sorted = Object.keys(data).sort();

    $.each(sorted, function(idx, k) {
      var sdata = data[k];

      if (k.match(/ (II|III|IV|V)$/)) {
        return true;
      }

      if (!['conc', 'adv', 'npc'].includes(sdata.type)) {
        var h = {
          id: idx,
          skill_name: k,
          uniques: {},
          disadvs: {},
          accesses: {},
          opens: {},
          type: sdata.type
        }

        if (sdata.conditions.open) {
          $.each(prof_only_indexes, function(n, _junk) {
            h[n] = sdata.conditions.open;
            h.opens[n] = true;
            //h.is_open = true;
          })
        }

        $.each(sdata.conditions, function(condition, d) {
          if (condition == 'innate') {
            $.each(d, function(_junk, strain) {
              h[strain] = innate_cost;
            })
          } else if (condition == 'innate_disadvantage') {
            $.each(d, function(_junk, strain) {
              h[strain] = 'X';
              h.disadvs[strain] = true;
            })
          } else if (d.cost) {
            h[condition] = d.cost;
            h.accesses[condition] = true;
            if (sdata.unique) {
              h.uniques[condition] = true;
            }
          }
        })

        a.push(h);
      }
    })

    return a;
  }

  var build_columns = function() {
    var d = new Array();
    var strain_data = strains.data();
    var prof_data = profession_basic.all();

    var strain_keys = Object.keys(strain_data).sort();
    var prof_keys = Object.keys(prof_data).sort();

    col_indexes = {};
    prof_only_indexes = {};
    var idx = 0;

    d.push({
      title: 'Skills',
      field: 'skill_name',
      class: 'row-head'
    })

    $.each(strain_keys, function(i, k) {
      d.push({
        title: k,
        field: k,
        class: 'head-rotate',
        cellStyle: cell_formatter
        //is_strain: true,
        //props: strain_data[k] || {}
      })
      col_indexes[k] = true;
    })

    d.push({
      title: '',
      field: 'separator',
      class: 'separatorcell'
      //is_splitter: true
    })
    //col_separator = idx++;

    $.each(prof_keys, function(i, k) {
      d.push({
        title: k,
        field: k,
        class: 'head-rotate',
        cellStyle: cell_formatter
        //is_profession: true,
        //props: strain_data[k] || {}
      })
      col_indexes[k] = true;
      prof_only_indexes[k] = true;
    })

    return d;
  }

  return {
    attach: attach
  }
}()