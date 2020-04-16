import './styles/style.scss';
import Logo from './assets/images/logo-zonex.svg';

const renderLogo = () => {
  document.querySelector('.header__logo').src = Logo;
};

renderLogo();
