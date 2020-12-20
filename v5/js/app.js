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

window.hasLoaded = false;

const mainVideo = document.getElementById('mainVid');

function waitForVideoLoad() {
  return new Promise((resolve, reject) => {
    window.resolveWaitForVideoLoad = resolve;
  });
}

mainVideo.addEventListener('canplaythrough', () => {
  if (!hasLoaded) {
    enterWebsite();
    window.hasLoaded = true;

    setTimeout(() => {
      document.getElementById('loadingText').remove();
      document.getElementById('loadedText').classList.add('visible');
      document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';

      document.querySelector('.loading-overlay').classList.add('loaded');
    }, 1000);
  } else {
    window.resolveWaitForVideoLoad && window.resolveWaitForVideoLoad();
  }
});

mainVideo.src = './media/mainrender.mp4';
try {
  mainVideo.load();
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
      showStillImageWithTransition('home');
    }, 4000);
  }, 800);
}

const showStillImageWithTransition = (page) => {
  return new Promise((resolve, reject) => {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    setTimeout(() => {
      document.querySelector('.still-image.' + page).classList.add('active');
      setTimeout(() => {
        document.querySelector('video').style.display = 'none';
        resolve();
      }, 800);
    }, 900);
  });
};

const showVideoWithTransition = async () => {
  return new Promise((resolve, reject) => {
    document.querySelector('video').style.display = 'block';
    document.querySelector('.still-image.active')?.classList?.remove('active');
    document.querySelector('.page-wrapper').classList.remove('zoomed');
    setTimeout(() => {
      resolve();
    }, 600);
  });
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

const disableButtonTriggers = () => {
  [...document.getElementsByClassName('trigger')].forEach((trigger) => {
    trigger.classList.remove('available');
  });

  document.querySelector('.button-image.hovered').classList.remove('hovered');
};

function showCatGifs() {
  document.getElementById('catgifs').classList.add('visible');
  document.getElementById('showCatGifsLink').remove();
}

[...document.querySelectorAll('.trigger.button')].forEach((trigger) => {
  trigger.addEventListener('mouseenter', function () {
    document.querySelector('.button-image.' + trigger.dataset.for).classList.add('hovered');
  });
  trigger.addEventListener('mouseleave', function () {
    document.querySelector('.button-image.' + trigger.dataset.for).classList.remove('hovered');
  });
});

const pageIntros = {
  workexperience: {
    start: 4.0,
    duration: 1.8,
  },
};

const pageOutros = {
  workexperience: {
    start: 4.0 + 2.2,
    duration: 2.0,
  },
};

async function goToPage(pageName) {
  window.currentPage = pageName;
  disableButtonTriggers();

  await showVideoWithTransition();
  mainVideo.currentTime = pageIntros[pageName].start;

  await waitForVideoLoad();

  mainVideo.play();
  await wait(pageIntros[window.currentPage].duration);
  mainVideo.pause();

  mainVideo.currentTime = pageOutros[pageName].start;

  await waitForVideoLoad();

  mainVideo.play();
  await wait(pageOutros[window.currentPage].duration);
  mainVideo.pause();

  await showStillImageWithTransition();

  enableButtonTriggers();
}

async function wait(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
}
