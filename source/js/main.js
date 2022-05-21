import {iosVhFix} from './utils/ios-vh-fix';

import {initModals, modals} from './modules/modals/init-modals';
import IMask from 'imask';
import {aboutBlock} from './modules/blocks/about.block';

const modalWindow = document.querySelector('[data-modal="modal-window"]');
const contactForms = document.querySelectorAll('[data-page="form"]');

window.addEventListener('DOMContentLoaded', () => {
  const darkBackground = document.querySelector('.page--dark-background');
  iosVhFix();

  const inputElements = document.querySelectorAll('.page__phone-input');
  contactForms.forEach((contactForm) => {
    contactForm.addEventListener('submit', onModalSubmit);
  });
  inputElements.forEach((input) => {
    const maskOptions = {
      mask: '+{7}(000)000-00-00',
    };
    IMask(input, maskOptions);
  });

  window.addEventListener('load', () => {
    initModals();

    const onEscButtonPress = (evt) => {
      if (evt.key === 'Escape') {
        darkBackground.classList.remove('page--dark-background--active');
        document.removeEventListener('keydown', onEscButtonPress);
      }
    };

    const onCloseButtonClick = () => {
      modals.close('modal-window');
      darkBackground.classList.remove('page--dark-background--active');
      darkBackground.removeEventListener('click', onCloseButtonClick);
    };

    const onOpenButtonClick = () => {
      modals.open('modal-window');
      modalWindow.querySelectorAll('input').forEach((element) => {
        element.value = '';
        element.classList.remove('page__invalid-input');
      });
      darkBackground.classList.add('page--dark-background--active');
      darkBackground.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscButtonPress);
      document.querySelector('[data-modal-close="modal-close"]').addEventListener('click', onCloseButtonClick);
    };
    document.querySelector('[data-modal-button="open-modal-button"]').addEventListener('click', onOpenButtonClick);
  });
});

aboutBlock();

const onModalSubmit = (evt) => {
  const currentForm = evt.target.closest('form');
  evt.preventDefault();
  const regexpTel = /^(\+7)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/;
  const regexpName = /^[А-Яа-яa-zA-Z\s]*$/;

  const name = currentForm.querySelector('.page__name-input');
  const phone = currentForm.querySelector('.page__phone-input');
  const personalData = currentForm.querySelector('.page__personal-data-input');

  name.classList.remove('page__invalid-input');
  phone.classList.remove('page__invalid-input');
  personalData.classList.remove('page__invalid-input');

  let valid = true;
  let phoneNumbers = phone.value;

  if (personalData.checked !== true) {
    personalData.classList.add('page__invalid-input');
    valid = false;
  }
  if ((!regexpName.test(name.value)) || (name.value.length === 0)) {
    name.classList.add('page__invalid-input');
    valid = false;
  }
  if (!regexpTel.test(phone.value)) {
    phone.classList.add('page__invalid-input');
    valid = false;
  }
  if (phoneNumbers.length > 16) {
    phone.classList.add('page__invalid-input');
    valid = false;
  }

  if (valid) {
    currentForm.submit();
    localStorage.setItem('smart-device-data', JSON.stringify({name: name.value, phone: phone.value}));
  }
};

const smoothLinks = document.querySelectorAll('[data-page="smooth-link"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', (e) => {
    e.preventDefault();
    const targetLink = smoothLink.getAttribute('href').replace('#', '.');
    if (targetLink !== '.') {
      document.querySelector(targetLink).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
}
