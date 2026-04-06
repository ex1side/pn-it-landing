import './style.scss';
import EmblaCarousel from 'embla-carousel';

const containerId = document.querySelector('.embla');
if (containerId) {
  const options = { loop: true };
  const viewportNode = containerId.querySelector('.embla__viewport');
  const prevBtn = containerId.querySelector('.embla__button--prev');
  const nextBtn = containerId.querySelector('.embla__button--next');
  const dotsNode = document.querySelector('.embla__dots');

  const emblaApi = EmblaCarousel(viewportNode, options);

  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) prevBtn.classList.remove('embla__button--disabled');
    else prevBtn.classList.add('embla__button--disabled');

    if (emblaApi.canScrollNext()) nextBtn.classList.remove('embla__button--disabled');
    else nextBtn.classList.add('embla__button--disabled');
  };

  const addDotBtnsAndClickHandlers = () => {
    dotsNode.innerHTML = emblaApi.scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('');

    const dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => emblaApi.scrollTo(index), false);
    });

    return dotNodes;
  };

  let dotNodes = [];

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    if (dotNodes[previous]) dotNodes[previous].classList.remove('embla__dot--selected');
    if (dotNodes[selected]) dotNodes[selected].classList.add('embla__dot--selected');
  };

  prevBtn.addEventListener('click', () => emblaApi.scrollPrev(), false);
  nextBtn.addEventListener('click', () => emblaApi.scrollNext(), false);

  const initDots = () => {
    dotNodes = addDotBtnsAndClickHandlers();
    toggleDotBtnsActive();
  };

  initDots();
  togglePrevNextBtnsState();

  emblaApi.on('select', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState)
    .on('reInit', initDots)
    .on('select', toggleDotBtnsActive);
}
