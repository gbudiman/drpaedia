var generic = function() {
  var traverse_to_parent = function(id) {
    var obj = $('#' + id).parent();
    var id = obj.attr('id');

    while(id != 'skill-pool' && id != 'skills-acquired' && id != 'skills-planned') {
      obj = obj.parent();
      id = obj.attr('id');
    }

    return '#' + id;
  }

  return {
    traverse_to_parent: traverse_to_parent
  }
}();
