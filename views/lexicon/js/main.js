require(['jquery', 'bootstrap-tour'], function() {

  $(document).ready(function() {

    var tour = new Tour({
      template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><div class='btn__group'><button class='btn btn-default' data-role='prev'>« Prev</button><button class='btn btn-default' data-role='next'>Next »</button></div><button class='btn btn-default' data-role='end'>End Tour</button></div></nav></div>",
      steps: [
      {
        element: ".editor",
        placement: "left",
        title: "Look at this!",
        content: "<p>This could potentially be the new Jadu Document Editor.</p>"
      },
      // steps: [
      // {
      //   element: ".notifications",
      //   placement: "bottom",
      //   title: "Notifications",
      //   content: "<p>When things happen that you need to know about, they'll appear here.</p><p>Click the badge to see more information.</p>"
      // },
      // {
      //   element: ".actions-menu",
      //   title: "The Actions Menu",
      //   content: "<p>Click this to see all of the actions you can perform on the items on this page.</p><p>Some actions may be disabled until you select one or more items.</p>"
      // }
    ]});

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();


  });

});
