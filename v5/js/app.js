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

function waitForVideoPlay() {
  return new Promise((resolve, reject) => {
    window.resolveWaitForVideoPlay = resolve;
  });
}

mainVideo.addEventListener('play', () => {
  window.resolveWaitForVideoPlay && window.resolveWaitForVideoPlay();
});

function playTransition(transition) {
  mainVideo.play();
  mainVideo.currentTime = transition.start;

  window.currentRequiredSeek = transition.end;
  return new Promise((resolve, reject) => {
    window.resolvePlayUntil = resolve;
  });
}

function listenToVideoSeek() {
  window.checkSeekInterval = setInterval(checkVideoSeek, 100);
}

function checkVideoSeek() {
  if (mainVideo.currentTime >= window.currentRequiredSeek) {
    mainVideo.pause();
    window.resolvePlayUntil && window.resolvePlayUntil();
  }
}

function stopVideoSeekListen() {
  clearInterval(checkSeekInterval);
}

mainVideo.addEventListener('canplaythrough', () => {
  if (!window.hasLoaded) {
    // enterWebsite();
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
      enableCurrentPageTriggers('home');
      zoomIn('home');
    }, 4500);
  }, 800);
}

const zoomIn = (page) => {
  return new Promise((resolve, reject) => {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    setTimeout(() => {
      console.log('page', page);

      // const videoRectAfterTransform = document.querySelector('video').getBoundingClientRect();

      // const stillImage = document.querySelector('.still-image.' + page);
      // stillImage.style.width = videoRectAfterTransform.width + 'px';
      // stillImage.style.height = videoRectAfterTransform.height + 'px';
      // stillImage.style.top = videoRectAfterTransform.top + 'px';
      // stillImage.style.left = videoRectAfterTransform.left + 'px';
      // stillImage?.classList?.add('active');
      resolve();
    }, 1000);
  });
};

const zoomOut = async () => {
  return new Promise((resolve, reject) => {
    // document.querySelector('.still-image.active')?.classList?.remove('active');
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

const enableCurrentPageTriggers = (page) => {
  [...document.querySelectorAll('.trigger.' + page)].forEach((trigger) => {
    trigger.classList.add('available');
  });
};

const disableAllTriggers = () => {
  [...document.querySelectorAll('.trigger')].forEach((trigger) => {
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
    start: 6.5,
    end: 8.1,
  },
  personalprojects: {
    start: 11.2,
    end: 12.6,
  },
  wheretofindme: {
    start: 15.4,
    end: 17.2,
  },
  home: {
    start: 20.2,
    end: 22.0,
  },
};

const pageOutros = {
  home: {
    start: 4.4,
    end: 6.0,
  },
  workexperience: {
    start: 8.7,
    end: 10.2,
  },
  personalprojects: {
    start: 13.0,
    end: 14.8,
  },
  wheretofindme: {
    start: 18.8,
    end: 20.4,
  },
};

window.currentPage = 'home';

async function goToPage(targetPage) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  disableAllTriggers();

  await zoomOut();

  if (isSafari) {
    await playTransitionSafari(targetPage);
  } else {
    await playTransitionChrome(targetPage);
  }

  document.querySelector('.page-wrapper').classList.remove('on-' + window.currentPage);
  document.querySelector('.page-wrapper').classList.add('on-' + targetPage);

  await zoomIn(targetPage);

  enableCurrentPageTriggers(targetPage);

  window.currentPage = targetPage;
}

async function playTransitionChrome(targetPage) {
  mainVideo.currentTime = pageOutros[window.currentPage].start;

  await waitForVideoLoad();
  mainVideo.play();
  await wait(pageOutros[window.currentPage].end - pageOutros[window.currentPage].start);
  mainVideo.pause();

  mainVideo.currentTime = pageIntros[targetPage].start;

  await waitForVideoLoad();
  mainVideo.play();
  await wait(pageIntros[targetPage].end - pageIntros[targetPage].start);
  mainVideo.pause();
}

async function playTransitionSafari(targetPage) {
  listenToVideoSeek();

  await playTransition(pageOutros[window.currentPage]);

  await playTransition(pageIntros[targetPage]);

  stopVideoSeekListen();
}

async function wait(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
}
