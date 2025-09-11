(function () {
    window.onload = function () {
        const currentPath = document.location.pathname;
        const navItems = document.querySelectorAll('.nav__item');
        const logoLink = document.querySelector('.header__logo-link');

        navItems.forEach(item => {
            const link = item.querySelector('.nav__link');
            let linkPathname = new URL(link.href).pathname;

            if (linkPathname === currentPath) {
                item.classList.add('nav__item--active');
                link.removeAttribute('href');
            }
        });
        
        if (logoLink && currentPath.endsWith('index.html')) {
            logoLink.classList.add('header__logo-link--active');
            logoLink.removeAttribute('href');
        }
    };
})();
