import Logo from '../../assets/images/logo-zonex.svg';
import { isMobile } from './responsiveness';

const renderLogo = () => {
  document.querySelector('.header__logo > img').src = Logo;
};

const renderBackgroundsBasedOnDevice = (header) => {
  // optimize assets depending on whether the device is a mobile or desktop
  header.classList.add(isMobile ? 'mobile' : 'desktop');
};

const handleMobileMenu = (header, overlay, mobileMenuButton) => {
  const headerWrapper = document.querySelector('.header__wrapper');
  const desktopMenu = document.querySelector('.main-nav');
  const mobileMenu = desktopMenu.cloneNode(true);
  let mobileMenuVisible = false;
  mobileMenu.classList.remove('main-nav');
  mobileMenu.classList.add('main-nav--mobile');

  header.append(mobileMenu);

  const showMenu = () => {
    mobileMenu.classList.add('visible');
    overlay.classList.add('overlay--nav', 'active', 'visible');
  };

  const hideMenu = () => {
    mobileMenu.classList.remove('visible');
    overlay.classList.remove('active', 'visible', 'overlay--nav');
  };

  mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuVisible = !mobileMenuVisible;

    mobileMenuVisible && !overlay.classList.contains('overlay--select') ? showMenu() : hideMenu();
  });

  overlay.addEventListener('click', (e) => {
    e.stopPropagation();

    if (mobileMenuVisible) {
      mobileMenuVisible = !mobileMenuVisible;
      hideMenu();
    }
  });

  [mobileMenu, headerWrapper].map((item) => item.addEventListener('click', () => {
    mobileMenuVisible = !mobileMenuVisible;
    hideMenu();
  }));
};

export { renderBackgroundsBasedOnDevice, renderLogo, handleMobileMenu };
