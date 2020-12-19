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
  enterWebsite();

  setTimeout(() => {
    document.getElementById('loadingText').remove();
    document.getElementById('loadedText').classList.add('visible');
    document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';
  }, 600);
});

setTimeout(() => {
  const vid = document.getElementById('mainvid');
  vid.pause();
}, 4000);

function enterWebsite() {
  document.getElementById('loadingOverlay').remove();
  document.getElementById('homepage').classList.add('entered');

  setTimeout(() => {
    playVideos();
    setTimeout(() => {
      pauseVideos();
      enableButtonTriggers();
      showStillImage('home');
    }, 4500);
  }, 1600);
}

const playVideos = () => {
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
  [...document.getElementsByClassName('still-image ' + page)][0].classList.add('active');
};

const showVideo = () => {
  [...document.getElementsByClassName('trigger' + ' page')][0].classList.remove('active');
};

document.getElementById('paperTrigger').addEventListener('mouseenter', function () {
  document.getElementById('pageWrapper').classList.add('zoomed');
});
document.getElementById('paperTrigger').addEventListener('mouseleave', function () {
  console.log('MOUSE LEAVE PPAER');

  document.getElementById('pageWrapper').classList.remove('zoomed');
});

[...document.querySelectorAll('.trigger.button')].forEach((trigger) => {
  trigger.addEventListener('mouseenter', function () {
    document.getElementById('pageWrapper').classList.add('zoomed');
    console.log('daded');
  });
  trigger.addEventListener('mouseleave', function () {
    document.getElementById('pageWrapper').classList.add('zoomed');
  });
});
