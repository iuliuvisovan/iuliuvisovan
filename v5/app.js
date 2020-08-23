document.addEventListener('DOMContentLoaded', () => { 
  const logos = document.querySelectorAll('.logo');
  console.log('logos', logos);

  [...logos].forEach(x => {
    console.log('x',x);
    
    const currentRotation = x.style;

    console.log('currentRotation', currentRotation);
    
  })
  
}, false);