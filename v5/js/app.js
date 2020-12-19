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

// setTimeout(() => {
//   enterWebsite();
// }, 400);

var currentGif = 0;

function showNextGif() {
  currentGif++;
  if (currentGif > 7) {
    currentGif = 0;
  }
  document.getElementById('catgif').src = catGifs[currentGif];
}

const videoElement = document.getElementById('mainVid');

videoElement.addEventListener('loadeddata', () => {
  // enterWebsite();

  document.getElementById('loadingText').remove();
  document.getElementById('loadedText').classList.add('visible');
  document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';

  document.querySelector('.loading-overlay').classList.add('loaded');
});

function enterWebsite() {
  document.querySelector('.loading-overlay').classList.add('inactive');
  setTimeout(() => {
    document.querySelector('.loading-overlay').remove();
  }, 2000);
  document.querySelector('.page-wrapper').classList.add('entered');

  setTimeout(() => {
    playVideo();
    setTimeout(() => {
      pauseVideos();
      enableButtonTriggers();
      showStillImage('home');
    }, 4500);
  }, 800);
}

const playVideo = () => {
  const vids = [...document.getElementsByTagName('video')];
  vids.forEach((vid) => {
    vid.play();
  });
};

const pauseVideos = () => {
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

const showStillImage = (page) => {
  document.querySelector('.still-image.' + page).classList.add('active');
};

const showVideo = () => {
  document.querySelector('.still-image.active').classList.remove('active');
};

handlePaperHover();
function handlePaperHover() {
  document.getElementById('paperTrigger').addEventListener('mouseenter', function () {
    document.querySelector('.page-wrapper').classList.add('zoomed');
  });
  document.getElementById('paperTrigger').addEventListener('mouseleave', function () {
    document.querySelector('.page-wrapper').classList.remove('zoomed');
  });
}

[...document.querySelectorAll('.trigger.button')].forEach((trigger) => {
  trigger.addEventListener('mouseenter', function () {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    document.querySelector('.video-wrapper').classList.add('with-highlighted-button');
  });
  trigger.addEventListener('mouseleave', function () {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    document.querySelector('.video-wrapper').classList.remove('with-highlighted-button');
  });
});
