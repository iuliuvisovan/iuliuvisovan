const mainVideo = document.getElementById('mainVid');

function preloadVideo() {
  var url = './media/mainrender.mp4';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function (oEvent) {
    var blob = new Blob([oEvent.target.response], { type: 'video/mp4' });

    mainVideo.src = URL.createObjectURL(blob);

    try {
      mainVideo.load();
    } catch (e) {}

    //video.play()  if you want it to play on load
  };

  xhr.onprogress = function (e) {
    if (e.lengthComputable) {
      const loadedPercentage = ((e.loaded / e.total) * 100).toFixed(2);
      blueLog('> loading: ' + loadedPercentage + '%');
      document.querySelector('.progress-bar-line').style.width = loadedPercentage + '%';
    }
  };

  xhr.send();
}

preloadVideo();

var currentGif = 0;

function showNextGif() {
  currentGif++;
  if (currentGif > 7) {
    currentGif = 0;
  }

  [...document.querySelectorAll('.cat-gif')].forEach((x) => {
    x.style.display = 'none';
  });
  [...document.querySelectorAll('.cat-gif')][currentGif].style.display = 'block';
}

window.hasLoaded = false;

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

function blueLog(text) {
  return;
  document.querySelector('#blueLogs').innerText = text;
}

function orangeLog(text) {
  document.querySelector('#blueLogs').innerText = text;
}

function playTransition(transition) {
  mainVideo.play();

  mainVideo.currentTime = transition.start;
  window.currentStartTime = transition.start;

  blueLog(`> set currentTime to ${transition.start}, playing to ${transition.end} \n`);

  window.currentRequiredSeek = transition.end;

  listenToVideoSeek();

  setTimeout(() => {
    window.canPause = true;
  }, 1500);

  forcePlayIfNotPlayingAfterSeconds(1, transition);
  forcePlayIfNotPlayingAfterSeconds(2, transition);
  forcePlayIfNotPlayingAfterSeconds(3, transition);

  return new Promise((resolve, reject) => {
    window.resolvePlayUntil = resolve;
  });
}

function forcePlayIfNotPlayingAfterSeconds(seconds, transition) {
  setTimeout(() => {
    //If video has not started playing yet
    if (mainVideo.currentTime == transition.start) {
      mainVideo.play();

      mainVideo.currentTime = transition.start;
      window.currentStartTime = transition.start;

      orangeLog(`Attempted to force play after ${seconds} second \n`);
    }
  }, seconds * 1000);
}

function listenToVideoSeek() {
  window.checkSeekInterval = setInterval(checkVideoSeek, 100);
}

function checkVideoSeek() {
  //hide still image if played atleast 100ms
  if (mainVideo.currentTime > window.currentStartTime) {
    document.querySelector('.still-image.active')?.classList.remove('active');
  }

  blueLog(`${new Date().getMinutes() + ':' + new Date().getSeconds()}] vid seek: ${mainVideo.currentTime.toFixed(2)} (needed ${window.currentRequiredSeek})`);

  if (!window.canPause) {
    return;
  }

  if (window.currentRequiredSeek && mainVideo.currentTime >= window.currentRequiredSeek) {
    mainVideo.pause();
    window.canPause = false;

    window.currentRequiredSeek = undefined;
    clearInterval(window.checkSeekInterval);

    window.resolvePlayUntil && window.resolvePlayUntil();
  }
}

mainVideo.addEventListener('canplaythrough', () => {
  if (!window.hasLoaded) {
    // enterWebsite();
    window.hasLoaded = true;

    document.getElementById('loadingText').remove();
    document.getElementById('loadedText').classList.add('visible');
    document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';

    document.querySelector('.loading-overlay').classList.add('loaded');
  } else {
    window.resolveWaitForVideoLoad && window.resolveWaitForVideoLoad();
  }
});

function enterWebsite() {
  document.querySelector('.loading-overlay').classList.add('dismissed');
  setTimeout(() => {
    document.querySelector('.page-wrapper').classList.add('entered');
  }, 600);

  setTimeout(async () => {
    await playTransition(pageIntros['lobby']);

    zoomIn('home');
    enableCurrentPageTriggers('home');
    hidePlaceholderImage();
  }, 600);

  setTimeout(() => {
    document.querySelector('.loading-overlay').remove();
  }, 2000);
}

const hidePlaceholderImage = () => {
  document.querySelector('.placeholder-image').style.opacity = 0;
};

const zoomIn = (page) => {
  return new Promise((resolve, reject) => {
    document.querySelector('.page-wrapper').classList.add('zoomed');
    setTimeout(() => {
      showStillImage(page);

      resolve(true);
    }, 1000);
  });
};

const showStillImage = (page) => {
  const stillImage = document.querySelector('.still-image.' + page);
  if (stillImage) {
    stillImage.classList.add('active');
  }
};

const zoomOut = async () => {
  return new Promise((resolve, reject) => {
    document.querySelector('.page-wrapper').classList.remove('zoomed');
    setTimeout(() => {
      resolve();
    }, 1000);
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
    trigger.classList.add('active');
  });
};

const disableAllTriggers = () => {
  [...document.querySelectorAll('.trigger')].forEach((trigger) => {
    trigger.classList.remove('active');
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
  lobby: {
    start: 0,
    end: 4.0,
  },
  workexperience: {
    start: 6.5,
    end: 8.1,
  },
  personalprojects: {
    start: 11.2,
    end: 12.6,
  },
  wheretofindme: {
    start: 15.0,
    end: 17.2,
  },
  home: {
    start: 20.2,
    end: 21.9,
  },
};

const pageOutros = {
  home: {
    start: 4.4,
    end: 5.9,
  },
  workexperience: {
    start: 8.7,
    end: 10.2,
  },
  personalprojects: {
    start: 13.1,
    end: 14.8,
  },
  wheretofindme: {
    start: 18.4,
    end: 20.4,
  },
};

window.currentPage = 'home';

async function goToPage(targetPage) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  disableAllTriggers();

  await zoomOut();

  await playTransitionSafari(targetPage);

  // if (isSafari) {
  //   await playTransitionSafari(targetPage);
  // } else {
  //   await playTransitionChrome(targetPage);
  // }

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
  blueLog(`> playing: pageOutros[${window.currentPage}] \n`);
  await playTransition(pageOutros[window.currentPage]);

  blueLog(`> playing: pageIntros[${targetPage}] \n`);
  await playTransition(pageIntros[targetPage]);
}

async function wait(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
}
