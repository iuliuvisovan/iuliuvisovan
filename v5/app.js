document.addEventListener(
  'DOMContentLoaded',
  () => {
    const logos = document.querySelectorAll('.logo img');
    console.log('logos', logos);

    [...logos].forEach((x) => {
      x.addEventListener('mouseover', () => {
        logos.forEach((y) => {
          y.classList.add('greyed');
          y.src = y.src.replace('-hovered', '');
        });

        x.src = x.src.replace('.png', '-hovered.png');
      });

      x.addEventListener('mouseleave', () => {
        logos.forEach((y) => {
          y.src = y.src.replace('-hovered', '');
        });
      });
    });
  },
  false
);
