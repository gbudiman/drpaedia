var skill_preq = function() {

  var get = function(skill) {
    //if (data[skill] != undefined) return data[skill];
    //return build(skill);
    return skills.data()[skill].conditions;
  }

  var get_specific = function(skill, key) {
    var g = get(skill);
    var anchor = g[key];

    if (anchor == undefined) {
      if (g.innate_preq == undefined) return null;
      
      anchor = g.innate_preq[key];
      return anchor;
    }

    return anchor.preq;
  }

  return {
    get: get,
    get_specific: get_specific,
    invalidate_all: function() { data = {}; }
  }
}()
;
