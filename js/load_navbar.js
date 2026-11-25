$(function () {
    $('#nav-placeholder').load('/nav.html nav', function () {
        for (const link of this.querySelectorAll('nav a[href]')) {
            if (link.href === `${window.location.origin}${window.location.pathname}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        }
    });
});
