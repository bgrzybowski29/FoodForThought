(function($, Modernizr) {

  // Default State
var isAnimating     = false,
  animateInClass  = $('#select-entrances').val(),
  animateOutClass = $('#select-exits').val(),

  // Cache Selectors
  $container      = $('#form__container'),
  $progress       = $('#form__progress'),
  $select         = $('select'),
  $entrances      = $('#select-entrances'),
  $exits 				  = $('#select-exits'),
  $lucky          = $('#lucky'),

  // Browsers emit custom event on css animation end
  animateEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

/**
* Reset all animation State
* @param {obj} $current exiting field obj
* @param {obj} $next    entering field obj
*/
function resetAnimation($current, $next) {
isAnimating = false;
$current.removeClass('is-current animated ' + animateOutClass);
$next.removeClass(animateInClass);
}

/**
* Run animation
* @param {obj} $current exiting field obj
* @param {obj} $next    entering field obj
*/
function startAnimation($current, $next) {
if (isAnimating || !Modernizr.cssanimations) { return; }

// set flag to debounce multiple clicks
isAnimating = true;

// begin animating out field
$current.addClass(animateOutClass);

// begin animating in field
$next
  .addClass(animateInClass)
  .one(animateEndEvent, function() {
    resetAnimation($current, $next);
  });
}

/**
* Helper action to click first input on field
*/
function clickField() {
$('.field.is-current').find('input:first').click();
}

/**
* Helper action to set height of container
* @param {number} height set container value
*/
function setContainerHeight(height) {
$container.height(height);
}

/**
* 
* Fade out all labeles except selected
* @param {object} el current label being clicked
*/
function fadeLabels(el) {
var $siblings = $(el).siblings('label');
return $siblings
        .addClass('animated fadeOut')
        .one(animateEndEvent, function() {
          setTimeout(function() {
            $siblings.removeClass('fadeOut');
          }, 1000);
        });
}


/**
* Start animation process
*/
function handleClick(e) {
if (isAnimating) { return; }
var $this = $(this).parent('.field');
var $next = $this.is(':last-child') ? $this.parent().children(':first') : $this.next();

// Set container height to height of next field
setContainerHeight($next.outerHeight());

// Update progress dots
setProgressDot($next);

// Fade all labels except selected
fadeLabels(e.target);

// let user feel like selection was made, then start animation
setTimeout(function() {
  $next.addClass('is-current animated');
  startAnimation($this, $next);
}, 200);

setTimeout(function() {
  $('input').prop('checked', false);
}, 1000);
}

/**
* set anim classes and click form
*/
function handleSelect() {
animateInClass = $entrances.val();
animateOutClass = $exits.val();
clickField();
}

/**
* Randomize select dropdowns
* @param {obj} e jquery event obj
*/
function handleLucky(e) {
e.preventDefault();
if (isAnimating) { return; }

$select.each(function(i, obj) {
  var $obj = $(obj);
  var $options = $obj.find('option');
  var rand = Math.floor(Math.random() * $options.length);
  $obj.val($options.eq(rand).val());
});

handleSelect();
}

/**
* Create progress list based on length of questions
*/
function setupProgress() {
var val = $('.field').length;
var i = 0;
while (i < val) {
  $progress.append('<li/>');
  i++;
}
setProgressDot();
}

/**
* Update progress dot to current question
* @param {object} $el $ object representing next question
*/
function setProgressDot($el) {
$progress.find('li')
 .removeClass('is-current')
 .eq($el ? $('.field').index($el) : 0)
 .addClass('is-current');
}

/**
* Setup all listeners on page
*/
function setupListeners() {
$container.on('click', 'label', handleClick);
$select.on('change', handleSelect);
$lucky.on('click', handleLucky);
}


function init() {

// Setup first field
var $firstField = $container.children(':first');
$firstField.addClass('is-current animated');
setContainerHeight($firstField.outerHeight());

// setup progress bar
setupProgress();

// Add listeners to page
setupListeners();

}

init();

}(window.jQuery, window.Modernizr));
