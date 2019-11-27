$(function(){
    $("#nav-placeholder").load("nav.html");

    // get current URL path and assign 'active' class
	var pathname = window.location.pathname;
    var activeLink = $('nav a[href="'+pathname+'"]');
    activeLink.addClass('active');
    activeLink.append(' <span class="sr-only">(current)</span>');
});
