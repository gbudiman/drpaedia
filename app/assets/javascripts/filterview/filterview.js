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
    apply();
  }

  var apply = function() {
    $('div[data-accessible]').each(function() {
      var show = true;
      var is_accessible = $(this).attr('data-accessible') == 'true';
      var is_discounted = $(this).attr('data-discounted') == 'true';
      var is_lore = $(this).attr('data-type') == 'lore';
      var is_psionics = $(this).attr('data-type') == 'psionics';

      if (filters.filter_accessible && !is_accessible) { show = false; }
      if (filters.filter_discounted && !is_discounted) { show = false; }
      if (is_lore && filters.filter_lore) { show = false; }
      if (is_psionics && filters.filter_psionics) { show = false; }

      if (show) { $(this).show(); }
      else { $(this).hide(); }
    })
  }

  var apply_all = function() {
    filters.filter_accessible = $('#filter-accessible').prop('checked');
    filters.filter_discounted = $('#filter-discounted').prop('checked');
    filters.filter_lore = $('#filter-lore').prop('checked');
    filters.filter_psionics = $('#filter-psionics').prop('checked');

    $('div[data-accessible]').show();
    apply();
  }

  return {
    apply_all: apply_all,
    attach: attach
  }
})()