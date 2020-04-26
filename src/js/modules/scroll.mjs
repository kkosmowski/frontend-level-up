function debounce(f, wait, immediate) { // debounce function to avoid too many event listener function executions
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) f.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) f.apply(context, args);
  };
}

const handleScroll = (header) => {
  const headerBar = document.querySelector('.header__bar');
  const mobileMenu = document.querySelector('.main-nav--mobile');
  const goToTheTop = document.querySelector('.go-to-the-top');
  const height = window.innerHeight;

  const checkScrollY = debounce(() => {
    window.scrollY > height
      ? goToTheTop.classList.add('sticky')
      : goToTheTop.classList.remove('sticky');

    if (window.scrollY > header.getBoundingClientRect().height) {
      headerBar.classList.add('scrolled');
      mobileMenu.classList.add('scrolled');
    } else {
      headerBar.classList.remove('scrolled');
      mobileMenu.classList.remove('scrolled');
    }
  }, 30);

  window.addEventListener('scroll', checkScrollY);
};

export default handleScroll;
