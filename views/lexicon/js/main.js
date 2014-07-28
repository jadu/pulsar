require(['jquery', 'bootstrap-tour'], function() {

  $(document).ready(function() {

    var tour = new Tour({
      backdrop: true,
      template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><div class='btn__group'><button class='btn btn-default' data-role='prev'>« Prev</button><button class='btn btn-default' data-role='next'>Next »</button></div><button class='btn btn-default' data-role='end'>End Tour</button></div></nav></div>",
      steps: [
      {
        element: ".actions-menu",
        title: "The Actions Menu",
        content: "Click here to see all of the actions that you can perform on the items on this page. Some might be disabled until you select one or more items."
      }
    ]});

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();


  });

});
