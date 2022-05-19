import {iosVhFix} from './utils/ios-vh-fix';
import {initModals, modals} from './modules/modals/init-modals';
const settings = {
  tempAboutTextStorage: '',
};

const textBlocks = document.querySelectorAll('[data-about="text-block"]');
const aboutButton = document.querySelector('[data-about="button"]');
const modalWindow = document.querySelector('[data-modal="modal-window"]');

window.addEventListener('DOMContentLoaded', () => {
  const darkBackground = document.querySelector('.page--dark-background');
  iosVhFix();

  window.addEventListener('load', () => {
    initModals();

    const onEscButtonPress = (evt) => {
      if (evt.key === 'Escape') {
        darkBackground.classList.remove('page--dark-background--active');
        document.removeEventListener('keydown', onEscButtonPress);
      }
    };

    const onCloseButtonClick = (evt) => {
      modals.close('modal-window');
      darkBackground.classList.remove('page--dark-background--active');
      darkBackground.removeEventListener('click', onCloseButtonClick);
    };

    const onOpenButtonClick = () => {
      modals.open('modal-window');
      modalWindow.querySelectorAll('input').forEach((element) => {
        element.value = '';
      });
      darkBackground.classList.add('page--dark-background--active');
      darkBackground.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscButtonPress);
      document.querySelector('[data-modal-close="modal-close"]').addEventListener('click', onCloseButtonClick);
    };
    document.querySelector('[data-modal-button="open-modal-button"]').addEventListener('click', onOpenButtonClick);
  });

});

if (window.window.innerWidth < 768) {
  document.querySelector('.intro__button').textContent = ('бесплатная консультация');
  document.querySelector('.catalog__title').textContent = ('Товары и услуги Smart\u00A0Device');
  settings.tempAboutTextStorage = textBlocks[1].textContent;
  textBlocks[1].textContent = settings.tempAboutTextStorage.slice(0, 109);

  const accordions = document.querySelectorAll('[data-footer="accordion"]');

  const closeAllAccordions = () => {
    accordions.forEach((accordion) => {
      accordion.classList.add('footer__accordion--is-closed');
    });
  };

  const onAccordionClick = (evt) => {
    const accordionContainer = evt.target.closest('div');
    if (!accordionContainer.classList.contains('footer__accordion--is-closed')) {
      accordionContainer.classList.add('footer__accordion--is-closed');
      return;
    }
    closeAllAccordions();
    accordionContainer.classList.remove('footer__accordion--is-closed');
  };

  accordions.forEach((accordion) => {
    accordion.addEventListener('click', onAccordionClick);
  });

  closeAllAccordions();
}

const onAboutButtonClick = () => {
  textBlocks.forEach((textBlock, index) => {
    if (index > 1) {
      textBlock.classList.toggle('about__content--closed');
    }
  });
  if (aboutButton.textContent === 'Подробнее') {
    aboutButton.textContent = 'Скрыть';
    if (window.window.innerWidth < 768) {
      textBlocks[1].textContent = settings.tempAboutTextStorage;
    }

  } else {
    aboutButton.textContent = 'Подробнее';
    if (window.window.innerWidth < 768) {
      textBlocks[1].textContent = settings.tempAboutTextStorage.slice(0, 109);
    }

  }
};

aboutButton.addEventListener('click', onAboutButtonClick);

const contactForms = document.querySelectorAll('[data-page="form"]');

const onModalSubmit = (evt) => {
  const currentForm = evt.target.closest('form');

  evt.preventDefault();
  const regexpTel = /^\d+$/;
  const regexpName = /^[А-Яа-яa-zA-Z\s]*$/;
  const name = currentForm.querySelector('[data-form="contacts-form-name"]');
  const phone = currentForm.querySelector('[data-form="contacts-form-phone"]');

  name.classList.remove('page__invalid-input');
  phone.classList.remove('page__invalid-input');

  let valid = true;
  let phoneNumbers = phone.value;

  if (!regexpName.test(name.value)) {
    name.classList.add('page__invalid-input');
    valid = false;
  }
  if (!regexpTel.test(phone.value)) {
    phone.classList.add('page__invalid-input');
    valid = false;
  }
  if (phoneNumbers.replace(/[^0-9\.]+/g, '').length > 10) {
    phone.classList.add('page__invalid-input');
    valid = false;
  }

  if (valid) {
    currentForm.submit();
    localStorage.setItem('smart-device-data', JSON.stringify({name: name.value, phone: phone.value}));
  }
};

contactForms.forEach((contactForm) => {
  contactForm.addEventListener('submit', onModalSubmit);
});


const smoothLinks = document.querySelectorAll('[data-page="smooth-link"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
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
