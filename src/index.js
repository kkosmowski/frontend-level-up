import './styles/style.scss';
import Logo from './assets/images/logo-zonex.svg';

const renderLogo = () => {
  document.querySelector('.header__logo').src = Logo;
};

const renderBackgroundsDependingOnDevice = () => {
  // optimize assets depending on whether the device is a mobile or desktop
  const isMobile = window.innerWidth < 600;

  document.querySelector('.main-header').classList.add(isMobile ? 'mobile' : 'desktop');
};

renderLogo();
renderBackgroundsDependingOnDevice();
