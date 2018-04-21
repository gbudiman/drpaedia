var visual = function() {
  var cols;
  var rows;
  var cells;
  var table;
  var col_indexes;
  var prof_only_indexes;
  var strain_only_indexes;
  var innate_cost;
  var col_separator;
  var strains_data = strains.data();
  var hidden_professions = {};
  var hidden_skills = {};
  var hidden_strains = {};
  var unhide_strain;
  var unhide_profession;
  var unhide_skill;
  var unhide_all;
  var flash_state;

  var attach = function() {
    innate_cost = 3;
    table = $('#vis-table');
    unhide_strain = $('#unhide-strain');
    unhide_profession = $('#unhide-profession');
    unhide_skill = $('#unhide-skill');
    unhide_all = $('#unhide-all');

    dynaloader.load_remote().then(function() {
      cols = build_columns();
      rows = build_rows();

      render();
    });
  }

  var get_table_space_size = function() {
    return $(window).height() - $('#controls').height();
  }

  var apply_macro_filter = function() {
    apply('lore', $('#hide-lore').prop('checked'));
    apply('psionics', $('#hide-psionics').prop('checked'));
  }

  var apply = function(x, val) {
    var w = table.find('tr[data-type=' + x + ']');

    if (val) {
      w.hide();
    } else {
      w.show();
    }
  }

  var attach_controls = function() {
    var attach_control = function(x) {
      $('#hide-' + x).off('change').on('change', function() {
        apply(x, $(this).prop('checked'));
      })

      apply(x, $('#hide-' + x).prop('checked'));
    }

    

    var attach_remove_column = function() {
      $('span[data-column-remove]').on('click', function() {
        var val = $(this).attr('data-column-remove');

        hide_column(val);
        // $('.psc-class-' + dom_idify(val)).hide();
        // $('[data-field="' + val + '"]').hide();

        // monitor_hidden_column(val);
      })
    }

    var attach_remove_row = function() {
      $('span[data-row-remove]').on('click', function() {
        var data_index = $(this).parent().parent().attr('data-index');

        $(this).parent().parent().hide();
        $('div.fixed-table-body-columns').find('[data-index=' + data_index + ']').hide();
        monitor_hidden_row($(this).attr('data-row-remove'));
      })
    }

    var attach_flash_strain = function() {
      $('span[data-column-flash]').on('click', function() {
        var val = $(this).attr('data-column-flash');

        if (flash_state) {
          $.each(strain_only_indexes, function(k, _junk) {
            unhide_column(k);
          })

          flash_state = false;
        } else {
          $.each(strain_only_indexes, function(k, _junk) {
            if (k != val) {
              hide_column(k);
            }
          })

          flash_state = true;
        }

        //remove_source_duplication();
      })
    }

    attach_control('lore');
    attach_control('psionics');
    attach_remove_column();
    attach_remove_row();
    attach_flash_strain();
    attach_unhide_all();
  }

  var hide_column = function(x) {
    $('.psc-class-' + dom_idify(x)).hide();
    $('[data-field="' + x + '"]').hide();

    recalculate_header_width();
    monitor_hidden_column(x);
  }

  var recalculate_header_width = function() {
    var visibles = $('.fixed-table-header').find('.head-rotate:visible');
    var vx_width = 200 + 23 * visibles.length;
    var vt_width = 22 * visibles.length;
    visibles.width(20);
    $('.table-hover').find('.head-rotate').width(20);
    $('.table-hover').css('width', '');

    console.log(vx_width);
    $('#vis-table').css('width', vt_width);
    $('.fixed-table-header').css('width', vx_width);
    console.log($('.fixed-table-header'));
  }

  var attach_unhide_all = function(x) {
    unhide_all.on('click', function() {
      clear_hiddens();
    })
  }

  var unhide_column = function(x) {
    $('.psc-class-' + dom_idify(x)).show();
    $('[data-field="' + x + '"]').show();
    recalculate_header_width();
  }

  var unhide_row = function(x) {
    $('span[data-row-remove="' + x + '"]').parent().parent().show();
  }

  var monitor_hidden_row = function(x) {
    hidden_skills[x] = true;
    repopulate_hidden_skills();
  }

  var monitor_hidden_column = function(x) {
    if (prof_only_indexes[x]) {
      hidden_professions[x] = true;
      repopulate_hidden_professions();
    } else {
      hidden_strains[x] = true;
      repopulate_hidden_strains();
    }
  }

  var repopulate_hidden_strains = function() {
    repopulate(unhide_strain, Object.keys(hidden_strains).sort(), 'strain');
  }

  var repopulate_hidden_professions = function() {
    repopulate(unhide_profession, Object.keys(hidden_professions).sort(), 'profession');
  }

  var repopulate_hidden_skills = function() {
    repopulate(unhide_skill, Object.keys(hidden_skills).sort(), 'skill');
  }

  var unhide = function(type, target) {
    switch(type) {
      case 'strain': 
        delete hidden_strains[target]; 
        unhide_strain.find('[data-unhide-name="' + target + '"]').remove();
        unhide_column(target);
        break;
      case 'profession': 
        delete hidden_professions[target]; 
        unhide_profession.find('[data-unhide-name="' + target + '"]').remove();
        unhide_column(target);
        break;
      case 'skill': 
        delete hidden_skills[target]; 
        unhide_skill.find('[data-unhide-name="' + target + '"]').remove();
        unhide_row(target);
        break;
    }
  }

  var repopulate = function(anchor, sorted, type) {
    var t = '';

    anchor.empty();
    if (sorted.length == 0) {
      t += '<li>Nothing is hidden</li>';
    } else {
      $.each(sorted, function(_junk, x) {
        t += '<li '
          +       'data-unhide-name="' + x + '" '
          +       'data-unhide-type="' + type + '" '
          +  '><a href="#">' + x + '</a></li>';
      })

      t += '<li role="separator" class="divider"></li>';
      t += '<li data-omni="' + type + '"><a href="#">Unhide All</li>';
    }

    anchor.append(t);
    reactivate(anchor);
    
  }

  var reactivate = function(anchor) {
    anchor.find('li[data-unhide-type]').on('click', function(event) {
      var target = $(this).attr('data-unhide-name');
      var type = $(this).attr('data-unhide-type');

      unhide(type, target);
      event.preventDefault();
    })

    anchor.find('li[data-omni]').on('click', function(event) {
      var type = $(this).attr('data-omni');
      var datalist;

      switch(type) {
        case 'skill': datalist = hidden_skills; break;
        case 'profession': datalist = hidden_professions; break;
        case 'strain': datalist = hidden_strains; break;
      }

      $.each(datalist, function(k, _junk) {
        if (type == 'skill') {
          unhide_row(k);
        } else {
          unhide_column(k);
        }
      })

      switch(type) {
        case 'skill': hidden_skills = {}; repopulate_hidden_skills(); break;
        case 'profession': hidden_professions = {}; repopulate_hidden_professions(); break;
        case 'strain': hidden_strains = {}; flash_state = false; repopulate_hidden_strains(); break;
      }
      event.preventDefault();
    })
  }

  var dom_idify = function(x) {
    return x.replace(/\s+/g, '');
  }

  var clear_hiddens = function() {
    hidden_professions = {};
    hidden_strains = {};
    hidden_skills = {};
    $('.table-hover').find('tr').show();
    $('.fixed-table-body').find('td').show();
    $('.table-hover').find('[data-field]').show();
    repopulate(unhide_skill, [], 'skill');
    repopulate(unhide_strain, [], 'strain');
    repopulate(unhide_profession, [], 'profession');
    apply_macro_filter();
    flash_state = false;
  }

  var render = function() {
    clear_hiddens();
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

  var remove_source_duplication = function() {
    $('.fixed-table-body').find('td:first-child').empty();
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
    var make_interactable_header_flash = function(k) {
      return '<span class="glyphicon glyphicon-flash clickable" data-column-flash="' + k + '" /> ';
    }

    var control_remove = {};
    $.each(col_indexes, function(k, _junk) {
      control_remove[k] = make_interactable_header_remove(k);
    });
    a.push(control_remove);

    var control_flash = {};
    $.each(strain_only_indexes, function(k, _junk) {
      control_flash[k] = make_interactable_header_flash(k);
    });
    a.push(control_flash);

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
    strain_only_indexes = {};
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
      strain_only_indexes[k] = true;
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
    attach: attach,
    clear_hiddens: clear_hiddens
  }
}()