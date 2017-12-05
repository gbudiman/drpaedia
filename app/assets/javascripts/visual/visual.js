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
    var head = table.find('thead');
    var t = '';

    $.each(cols, function(i, k) {
      t += '<th>'
        +    k.name
        +  '</th>';
    })

    console.log(t);
    head.append('<tr>' + t + '</tr>');
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