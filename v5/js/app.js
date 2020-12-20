const catGifs = [
  'https://i.pinimg.com/originals/ac/f9/a5/acf9a5214d40c8d911bd236b037f8b66.gif',
  'https://media1.giphy.com/media/8zdi3lQp3fzKU/giphy.gif',
  'https://i.makeagif.com/media/4-18-2018/0nyw45.gif',
  'https://media.tenor.com/images/33845bc4ed116b73a6815d9cf8873972/tenor.gif',
  'https://www.sadanduseless.com/wp-content/uploads/2019/07/cat-vs-cucumber3.gif',
  'https://i.pinimg.com/originals/25/58/cc/2558cc0f605acfa7a31d563030723c96.gif',
  'https://media1.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
  'https://i.imgur.com/2JZKwrO.gif',
  'https://kittybloger.files.wordpress.com/2014/03/25-funny-cat-gifs-15.gif',
];

var currentGif = 0;

function showNextGif() {
  currentGif++;
  if (currentGif > 7) {
    currentGif = 0;
  }
  document.getElementById('catgif').src = catGifs[currentGif];
}

const videoElement = document.getElementById('mainVid');

videoElement.addEventListener('canplaythrough', () => {
  enterWebsite();

  setTimeout(() => {
    document.getElementById('loadingText').remove();
    document.getElementById('loadedText').classList.add('visible');
    document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';

    document.querySelector('.loading-overlay').classList.add('loaded');
  }, 1000);
});

videoElement.src = './media/mainrender.mp4';
try {
  videoElement.load();
} catch (e) {}

function enterWebsite() {
  document.querySelector('.loading-overlay').classList.add('inactive');
  setTimeout(() => {
    document.querySelector('.loading-overlay').remove();
  }, 2000);
  document.querySelector('.page-wrapper').classList.add('entered');

  setTimeout(() => {
    playVideo();
    setTimeout(() => {
      pauseVideo();
      enableButtonTriggers();
      showStillImage('home');
    }, 4000);
  }, 800);
}

const showStillImage = (page) => {
  document.querySelector('.page-wrapper').classList.add('zoomed');
  setTimeout(() => {
    document.querySelector('.still-image.' + page).classList.add('active');
    setTimeout(() => {
      document.querySelector('video').style.display = 'none';
    }, 800);
  }, 1500);
};

const playVideo = () => {
  const vids = [...document.getElementsByTagName('video')];
  vids.forEach((vid) => {
    vid.play();
  });
};

const pauseVideo = () => {
  const vids = [...document.getElementsByTagName('video')];
  vids.forEach((vid) => {
    vid.pause();
  });
};

const enableButtonTriggers = () => {
  [...document.getElementsByClassName('trigger')].forEach((trigger) => {
    trigger.classList.add('available');
  });
};

const showVideo = () => {
  document.querySelector('video').style.display = 'block';
  setTimeout(() => {
    document.querySelector('.page-wrapper').classList.remove('zoomed');
    document.querySelector('.still-image.active').classList.remove('active');
  }, 800);
};

function showCatGifs() {
  document.getElementById('catgifs').classList.add('visible');
  document.getElementById('showCatGifsLink').remove();
}

// handlePaperHover();
// function handlePaperHover() {
//   document.getElementById('paperTrigger').addEventListener('mouseenter', function () {
//     document.querySelector('.page-wrapper').classList.add('zoomed');
//   });
//   document.getElementById('paperTrigger').addEventListener('touchstart', function () {
//     if (!window.isZoomed) {
//       document.querySelector('.page-wrapper').classList.add('zoomed');
//       window.isZoomed = true;
//     } else {
//       document.querySelector('.page-wrapper').classList.remove('zoomed');
//       window.isZoomed = false;
//     }
//   });
//   document.getElementById('paperTrigger').addEventListener('mouseleave', function () {
//     document.querySelector('.page-wrapper').classList.remove('zoomed');
//   });
// }

[...document.querySelectorAll('.trigger.button')].forEach((trigger) => {
  trigger.addEventListener('mouseenter', function () {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    document.querySelector('.button-image.' + trigger.dataset.for).classList.add('hovered');
  });
  trigger.addEventListener('mouseleave', function () {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    document.querySelector('.button-image.' + trigger.dataset.for).classList.remove('hovered');
  });
});
