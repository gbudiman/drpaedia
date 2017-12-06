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
    attach_controls();
  }

  var attach_controls = function() {
    var attach_control = function(x) {
      $('#hide-' + x).on('change', function() {
        apply(x, $(this).prop('checked'));
      })

      apply(x, $(this).prop('checked'));
    }

    var apply = function(x, val) {
      var w = table.find('tr[data-' + x + ']');

      if (val) {
        w.hide();
      } else {
        w.show();
      }
    }

    attach_control('lore');
    attach_control('psionic');
  }


  var render = function() {
    // render_head().then(function() {
    //   render_body().then(function() {
    //     render_cells();
    //     table.bootstrapTable({
    //       stickyHeader: false
    //     })
    //   })
    // });

    table.bootstrapTable({
      columns: cols,
      data: rows,
      undefinedText: '',
    })
  }

  var cell_formatter = function(value, row, index, field) {
    var a_class = [];

    if (field == 'separator') { a_class.push('separatorcell'); }

    if (row.opens[field]) { a_class.push('opencell'); }
    if (row.accesses[field]) { a_class.push('accesscell'); }
    if (row.uniques[field]) { a_class.push('uniquecell'); }
    if (row.disadvs[field]) { a_class.push('disadvcell'); }

    return {
      classes: a_class.join(' ')
    }
  }

  var render_head = function() {
    return new Promise(function(resolve, reject) {
      // var head = table.find('thead');
      // var t = '<th></th>';

      // $.each(cols, function(i, k) {
      //   if (k.is_splitter) {
      //     t += '<th class="cols-splitter"> &nbsp; &nbsp; </th>';
      //   } else {
      //     t += '<th class="head-rotate">'
      //       //+    '<div class="head-rotate">' + k.name + '</div>'
      //       +    k.name
      //       +  '</th>';
      //   }
        
      // })

      // head.append('<tr>' + t + '</tr>');
      resolve(true);
    })
    
  }

  var render_body = function() {
    return new Promise(function(resolve, reject) {
      var body = table.find('tbody');
      var sorted = Object.keys(rows).sort();
      var t = '';

      $.each(sorted, function(_junk, k) {
        var skill_code = skills.get_code(k);
        var cs = '<td class="row-head">' + k + '</td>';
        var mark_lore = rows[k].type == 'lore' ? 'data-lore=true' : '';
        var mark_psi = rows[k].type == 'psionics' ? 'data-psionic=true' : '';

        $.each(cols, function(j, l) {
          cs += '<td class="cell" id="cells-' + skill_code + '-' + j + '"></td>';
        })

        t += '<tr id="cells-' + skill_code + '" ' + mark_lore + mark_psi + '>'
          +    cs
          +  '</tr>';
      })

      body.append(t);
      resolve(true);
    })
    
  }

  var render_cells = function() {
    var queues = {};
    var opens = {};
    var uniques = {};
    var disadvs = {};
    var tiereds = {};

    var rowify = function(skill_code) {
      return '#cells-' + skill_code;
    }
    var idify = function(skill_code, col_index) {
      return '#cells-' + skill_code + '-' + col_index;
    }

    $.each(rows, function(skill_name, v) {
      var skill_code = v.shorthand;

      if (v.conditions.open) {
        opens[rowify(skill_code)] = v.conditions.open;
      }

      if (skill_name.match(/ (II|III|IV|V)$/)) {
        tiereds[rowify(skill_code)] = true;
      }

      $.each(v.conditions, function(k, d) {
        var col_index = col_indexes[k];
        if (col_index) {
          queues[idify(skill_code, col_index)] = {
            unique: v.unique,
            cost: d.cost
          }
        }
      });

      $.each(v.conditions.innate, function(_junk, strain) {
        var col_index = col_indexes[strain];
        queues[idify(skill_code, col_index)] = {
          cost: innate_cost
        };
      })

      $.each(v.conditions.innate_disadvantage, function(_junk, strain) {
        var col_index = col_indexes[strain];
        disadvs[idify(skill_code, col_index)] = true
      })
    })

    $.each(opens, function(id, val) {
      $(id).children('.cell').each(function() {
        $(this).text(val).addClass('opencell');
      })

      $(id + '-' + col_separator).text('');
    })

    $.each(queues, function(id, d) {
      $(id).text(d.cost).addClass('accesscell');

      if (d.unique) {
        $(id).addClass('uniquecell');
      }
    })

    $.each(disadvs, function(id, _junk) {
      var that = $(id);
      var s = parseInt(that.text());

      if (!isNaN(s)) {
        that.text((s * 2).toString()).addClass('disadvcell');
      }
    })

    $.each(tiereds, function(id, _junk) {
      $(id).hide();
    })
  }

  var build_rows = function() {
    var a = [];
    var data = skills.data();
    var sorted = Object.keys(data).sort();

    $.each(sorted, function(idx, k) {
      var sdata = data[k];

      if (!['conc', 'adv', 'npc'].includes(sdata.type)) {
        var h = {
          id: idx,
          skill_name: k,
          uniques: {},
          disadvs: {},
          accesses: {},
          opens: {}
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
      field: 'skill_name'
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