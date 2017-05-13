var filterview = (function() {
  var filters = {
    filter_accessible: true,
    filter_discounted: false,
    filter_lore: true,
    filter_psionics: true,
  }

  var attach = function() {
    $('#filter-accessible').on('click', function() {
      update('filter_accessible', $(this).prop('checked'));
    })
    $('#filter-discounted').on('click', function() {
      update('filter_discounted', $(this).prop('checked'));
    })
    $('#filter-lore').on('click', function() {
      update('filter_lore', $(this).prop('checked'));
    })
    $('#filter-psionics').on('click', function() {
      update('filter_psionics', $(this).prop('checked'));
    })
  }

  var update = function(target, value) {
    filters[target] = value;
    apply(target);
  }

  var apply = function(target) {
    if (target == 'filter_lore') {
      if (filters[target]) {
        $('div[data-type="lore"]').hide();
      } else {
        $('div[data-type="lore"]').show();
      }
    } else if (target == 'filter_psionics') {
      if (filters[target]) {
        $('div[data-type="psionics"]').hide();
      } else {
        $('div[data-type="psionics"]').show();
      }
    } else if (target == 'filter_accessible') {
      if (filters[target]) {
        $('div[data-accessible=false]').hide();
      } else {
        $('div[data-accessible=false]').show();
      }
    } else if (target == 'filter_discounted') {
      if (filters[target]) {
        // show only discounted skills
        $('div[data-discounted=false]').hide();
      } else {
        $('div[data-discounted=false]').show();
      }
    }
  }

  var apply_all = function() {
    filters.filter_accessible = $('#filter-accessible').prop('checked');
    filters.filter_discounted = $('#filter-discounted').prop('checked');
    filters.filter_lore = $('#filter-lore').prop('checked');
    filters.filter_psionics = $('#filter-psionics').prop('checked');

    console.log(filters);
    $('div[data-accessible]').show();
    apply('filter_lore');
    apply('filter_psionics');
    apply('filter_accessible');
    apply('filter_discounted');
  }

  return {
    apply_all: apply_all,
    attach: attach
  }
})()