import PaymentProviders from '../../assets/images/payment.png';

const renderPaymentProviders = () => {
  // render footer payments image
  document.querySelector('.footer__payment-providers > img').src = PaymentProviders;
};

const handleFooterSelects = (header, overlay, mobileMenuButton) => {
  const customSelects = document.querySelectorAll('div.select');

  [header, overlay, mobileMenuButton].map((item) => item.addEventListener('click', () => {
    // custom blur

    [...customSelects].map((select) => {
      select.querySelector('input[type=checkbox]').checked = false;
    });

    overlay.classList.remove('active', 'overlay--select');
  }));

  [...customSelects].map((select) => {
    const checkbox = select.querySelector('input[type=checkbox]');
    const placeholder = select.querySelector('.placeholder');
    const name = select.dataset.name;

    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      if (checkbox.checked) overlay.classList.add('overlay--select', 'active');
    });

    select.addEventListener('click', (e) => {
      if (e.target.name === name) {
        e.target.checked = true;
        checkbox.checked = false;
        overlay.classList.remove('active', 'overlay--select');

        placeholder.textContent = e.target.value;
        [...select.querySelectorAll('.option')].map((option) => option.classList.remove('current'));
        e.target.parentNode.classList.add('current');
      }
    });
  });
};

const setFooterYear = () => {
  document.querySelector('.footer__year').innerHTML = (new Date()).getFullYear() + '&nbsp;';
};

export { handleFooterSelects, renderPaymentProviders, setFooterYear };
