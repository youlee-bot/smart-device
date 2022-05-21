export const aboutBlock = () => {
  const settings = {
    tempAboutTextStorage: '',
  };

  const textBlocks = document.querySelectorAll('[data-about="text-block"]');
  const aboutButton = document.querySelector('[data-about="button"]');

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
};
