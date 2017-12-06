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

  var get_table_space_size = function() {
    return $(window).height() - $('#controls').height();
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

    var attach_remove_column = function() {
      $('span[data-column-remove]').on('click', function() {
        var val = $(this).attr('data-column-remove');

        $('.psc-class-' + dom_idify(val)).hide();
        $('[data-field="' + val + '"]').hide();
      })
    }

    var attach_remove_row = function() {
      $('span[data-row-remove]').on('click', function() {
        var data_index = $(this).parent().parent().attr('data-index');
        console.log(data_index);

        $(this).parent().parent().hide();
        $('div.fixed-table-body-columns').find('[data-index=' + data_index + ']').hide();
      })
    }

    attach_control('lore');
    attach_control('psionics');
    attach_remove_column();
    attach_remove_row();
  }

  var dom_idify = function(x) {
    return x.replace(/\s+/g, '');
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
      height: get_table_space_size(),
      onPostBody: function() {
        attach_controls();
      },
      fixedColumns: true
    })
  }

  var cell_formatter = function(value, row, index, field) {
    var a_class = ['cell'];

    if (field == 'separator') { a_class.push('separatorcell'); }

    if (row.opens && row.opens[field]) { a_class.push('opencell'); }
    if (row.accesses && row.accesses[field]) { a_class.push('accesscell'); }
    if (row.uniques && row.uniques[field]) { a_class.push('uniquecell'); }
    if (row.disadvs && row.disadvs[field]) { a_class.push('disadvcell'); }

    a_class.push('psc-class-' + dom_idify(field));

    return {
      classes: a_class.join(' ')
    }
  }


  var build_rows = function() {
    var a = [];
    var data = skills.data();
    var sorted = Object.keys(data).sort();
    var make_interactable_header_remove = function(k) {
      return '<span class="glyphicon glyphicon-remove clickable" data-column-remove="' + k + '" /> ';
    }
    var make_interactable_row_remove = function(k) {
      return k + '<span class="pull-right glyphicon glyphicon-remove clickable" data-row-remove="' + k + '" />';
    }

    var control_remove = {};
    $.each(col_indexes, function(k, _junk) {
      control_remove[k] = make_interactable_header_remove(k);
    });
    a.push(control_remove);

    $.each(sorted, function(idx, k) {
      var sdata = data[k];

      if (k.match(/ (II|III|IV|V)$/)) {
        return true;
      }

      if (!['conc', 'adv', 'npc'].includes(sdata.type)) {
        var h = {
          id: idx,
          skill_name: make_interactable_row_remove(k), //k,
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
          } else if (d.cost != undefined) {
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
      title: '',
      field: 'skill_name',
      class: 'row-head',
      width: '200px'
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