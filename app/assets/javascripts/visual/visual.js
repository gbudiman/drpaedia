var visual = function() {
  var cols;
  var rows;
  var table;

  var attach = function() {
    table = $('#vis-table');
    dynaloader.load_remote().then(function() {
      cols = build_columns();
      rows = build_rows();
      var mat = cross(rows, cols);

      render();
    });
  }

  var render = function() {
    render_head();
    render_body();
  }

  var render_head = function() {
    var head = table.find('thead');
    var t = '<th></th>';

    $.each(cols, function(i, k) {
      if (k.is_splitter) {
        t += '<th class="cols-splitter"></th>';
      } else {
        t += '<th>'
          +    '<div class="head-rotate">' + k.name + '</div>'
          +  '</th>';
      }
      
    })

    head.append('<tr>' + t + '</tr>');
  }

  var render_body = function() {
    var body = table.find('tbody');
    var sorted = Object.keys(rows).sort();
    var t = '';

    $.each(sorted, function(_junk, k) {
      var cs = '<td class="row-head">' + k + '</td>';
      $.each(cols, function(j, l) {
        cs += '<td></td>';
      })

      t += '<tr>'
        +    cs
        +  '</tr>';
    })

    body.append(t);
  }

  var build_rows = function() {
    var h = {};
    $.each(skills.data(), function(k, v) {
      if (!['conc', 'adv', 'npc'].includes(v.type)) {
        h[k] = v;
      }
    });

    return h;
  }

  var build_columns = function() {
    var d = new Array();
    var strain_data = strains.data();
    var prof_data = profession_basic.all();

    var strain_keys = Object.keys(strain_data).sort();
    var prof_keys = Object.keys(prof_data).sort();

    $.each(strain_keys, function(i, k) {
      d.push({
        name: k,
        strain: k,
        props: strain_data[k] || {}
      })
    })

    d.push({
      is_splitter: true
    })

    $.each(prof_keys, function(i, k) {
      d.push({
        name: k,
        profession: k,
        props: strain_data[k] || {}
      })
    })
    
    return d;
  }

  var cross = function(skills, receptors) {
    $.each(skills, function(k, sdata) {
      var a = new Array();
      $.each(receptors, function(r, rdata) {
        a.push(rdata);
      })

      sdata.receptors = a;
    })

    return skills;
  }

  return {
    attach: attach
  }
}()