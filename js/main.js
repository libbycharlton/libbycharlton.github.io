$( document ).ready(function() {

  // Globally cache the jQuery reference to the document to avoid repeated lookups.
  // This should be used as the base of all document-wide
  // searches where a closer context isn't available e.g.
  // var $someElement = $.root.find(someSelector);
  $.root = $(document.body);

  /* -----------------------------------------------
   * Scroll to anchor
   */
  $('.anchor__link').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
      target
        .attr('tabindex', -1)
        .focus();
    }
  });

  /* -----------------------------------------------
   * Mobile menu
   * https://www.adchsm.com/slidebars/
   */
  function setUpMobileMenu() {
    var controller = new slidebars();
    controller.init();

    $('.mobile-nav-btn').on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      controller.toggle( 'mobile-nav' );
    });
  }

  function checkIfMobile() {
    // Make sure it fires along with CSS by querying a CSS declaration 
    // https://www.wiliam.com.au/wiliam-blog/jquery-and-css-media-queries
    var $mobileNavButton = $.root.find('.mobile-nav-btn');
    if ($mobileNavButton.css('display') == 'block' ){
      // If the hamnburger menu is visible, we're in a 'mobile' state
      // Add a hook for (modded) Slidebars CSS
      $.root.addClass('is-mobile');
      // Initialise the plugin
      setUpMobileMenu();
    } else {
      $.root.removeClass('is-mobile');
      var $canvas = $.root.find('[off-canvas]');
      // @todo: Slidebars is dynamically setting a margin-right on .masthead 
      // when you toggle from mobile to desktop size, which hides the desktop menu offscreen
      // I can't seem to over-ride it
    }
  };

  // Test for mobile on page load, and on window resize
  checkIfMobile();
  $(window).resize(function(){
    checkIfMobile();
  });

  /* -----------------------------------------------
   * Expanding sections
   * Show more details in tuition table
   */
  // @todo: make it class-based and resuable
  if( $('#tuition-details').length ) {

    var $tuitionDetails = $.root.find('#tuition-details'),
        $tuitionTrigger = $.root.find('#tuition-trigger'),
        $triggerControl = $tuitionTrigger.parent(),
        $triggerLabel = $tuitionTrigger.text();

    // @todo: check if this is an accessible way to hide
    $($tuitionDetails). hide();
    $($tuitionTrigger).click(function (e) {
        e.preventDefault();
        // Remove link
        // @todo: dynamically set element type
        $($triggerControl).replaceWith('<h5 class="trigger">' + $triggerLabel + '</h5>');
        $($tuitionDetails).slideDown(300);
    });
  }

});
