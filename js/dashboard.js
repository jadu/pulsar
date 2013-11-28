require(['jquery-ui', 'jquery-ui-touch'], function() {

  var widget_content = '';

  $('.tray__detail .widget').draggable({
    connectToSortable: '.dashboard',
    helper: 'clone',
    revert: 'invalid',

    // Fetch widget content when dragging starts
    start: function(event, ui) {
      var widget = $(ui.helper.context).data('widget');
      widget_content = '';

      $.ajax({
          url: '/views/widgets/' + widget + '/index.php'
        }).done(function(data) {
          widget_content = data;
        });
    }
    
  });


  $( ".dashboard" ).sortable({
    forcePlaceholderSize: true,
    opacity: 0.5,
    revert: 100,
    tolerance: 'pointer',

    // Recapture the widget state when any re-arrangement is done
    change: capture_state,

    // Populate widget content when widget is dropped into dashboard
    receive: function(e, ui) {
      var $this = $(this);

      // If the fetch started by the dragging event hasn't finished, keep checking for the response...
      isFetched();

      function isFetched() {
        if (widget_content != '') {

          var widget = $this.data().uiSortable.currentItem;
          var sender = ui.sender;

          widget.html(widget_content) // Populate widget content
            .uniqueId();      // Attach unique identifier

          // Reset last-appended flag
          $('.dashboard [data-last-appended=true]').not(widget)
            .attr('data-last-appended', 'false');

          // Populate data attributes in new widget instance
          widget.data('widget', sender.data('widget'))
                .data('widget-title', sender.data('widget-title'))
                .data('widget-description', sender.data('widget-description'))
                .data('last-appended', 'true');

          // Update our state once we've properly fetched the widget contents
          capture_state();

          // Tidy up after ourselves
          widget_content = '';
        } else {

          // Wait a bit more...
          setTimeout(isFetched, 50);
        }
      }
    }
  });

  function capture_state(e, ui) {
    var widget_state = []; 

    // Grab the widget states
    $.map($('.dashboard').find('.widget'), function(el) {
      widget_state.push({
        guid:   "widget_guid",
        id:   $(el).attr('id'),
        settings: {
          name: $(el).data('widget')
        }
      });
    });

    // Create the json object that stores dashboard state
    var Dashboard = {
      title: "My Dashboard",
      widgets: widget_state
    };

    // Copy state to hidden field in the DOM
    console.log(JSON.stringify(Dashboard));
    $('#dashboard_state').val(JSON.stringify(Dashboard));
  };

  $('.dashboard').on('click', '.widget [data-widget-action=remove]', function() {
    $(this).closest('.widget').remove();
    capture_state();        
  });

  $('.tray__widgets li').on('click', function() {
    var $this = $(this);
    $('.tray__widgets').find('li').removeClass('active');
    $this.addClass('active');
    $('.widget__title').text($this.data('widget-title'));
    $('.widget__description').text($this.data('widget-description'));
    $('.widget__price').text($this.data('widget-price'));

    $('.tray__detail .widget').data('widget', $this.data('widget'))
      .data('widget-title', $this.data('widget-title'))
      .data('widget-description', $this.data('widget-description'))
      .show();
  });

});
