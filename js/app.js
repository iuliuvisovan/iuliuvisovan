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
  };

  xhr.onprogress = function (e) {
    if (e.lengthComputable) {
      window.loadedPercentage = (e.loaded / e.total) * 100;
      blueLog('> loading: ' + window.loadedPercentage + '%');
      document.querySelector('.progress-bar-line').style.width = window.loadedPercentage.toFixed(2) + '%';

      if (e.loaded == e.total) {
        setTimeout(() => {
          caches = window.caches;

          caches.open('main-video').then((cache) => {
            cache.add('./media/mainrender.mp4').then(() => {
              // Now the file is cached. Start rendering the app!
              showLoaded();
            });
          });
        }, 2000);
      }
    }
  };

  xhr.send();
}

setTimeout(() => {
  if (window.loadedPercentage < 15) {
    document.querySelector('#slowInternetText').style.display = 'inline';
  }
}, 5000);

preloadVideo();

var currentGif = 1;

function showNextGif() {
  currentGif++;
  if (currentGif > 6) {
    currentGif = 0;
  }

  document.querySelector('#catGif').src = `./media/gifs/${currentGif}.mp4`;
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

function playInterval(transition) {
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

      blueLog(`Attempted to force play after ${seconds} second \n`);
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

  blueLog(
    `${new Date().getMinutes() + ':' + new Date().getSeconds()}] vid seek: ${mainVideo.currentTime.toFixed(2)} (needed ${
      window.currentRequiredSeek
    })`,
  );

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
    showLoaded();
  } else {
    window.resolveWaitForVideoLoad && window.resolveWaitForVideoLoad();
  }
});

function showLoaded() {
  if (window.hasLoaded) {
    return;
  }

  window.hasLoaded = true;

  document.getElementById('loadingText').remove();
  document.getElementById('loadedText').classList.add('visible');
  document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';

  document.querySelector('.loading-overlay').classList.add('loaded');
}

function enterWebsite() {
  document.querySelector('.loading-overlay').classList.add('dismissed');
  document.querySelector('.page-wrapper').classList.add('entered');

  setTimeout(async () => {
    await playInterval(pageIntros['lobby']);

    zoomIn('home');
    enableCurrentPageTriggers('home');
    hidePlaceholderImage();

    if (window.location.hash && window.location.hash !== '#home') {
      goToPage(window.location.hash.slice(1));
    }
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

[...document.querySelectorAll('.trigger')].forEach((trigger) => {
  trigger.addEventListener('mouseover', () => {
    document.querySelector('#hoverSoundEffect').currentTime = 0;
    document.querySelector('#hoverSoundEffect').play();
  });
});

const enableCurrentPageTriggers = (page) => {
  [...document.querySelectorAll('.trigger.' + page)].forEach((trigger) => {
    trigger.classList.add('active');
  });
};

const disableAllTriggers = () => {
  [...document.querySelectorAll('.trigger')].forEach((trigger) => {
    trigger.classList.remove('active');
  });
};

function showCatGifs() {
  document.getElementById('catGifs').classList.add('visible');
  document.getElementById('showCatGifsLink').remove();
}

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

window.addEventListener('popstate', () => {
  if (window.location.hash == '' || window.location.hash == '#home') {
    goToPage('home');
  }
});

async function goToPage(targetPage) {
  if (!pageIntros[targetPage]) {
    return;
  }

  history.pushState(targetPage, '', '#' + targetPage);

  disableAllTriggers();

  await zoomOut();

  await playTransition(targetPage);

  document.querySelector('.page-wrapper').classList.remove('on-' + window.currentPage);
  document.querySelector('.page-wrapper').classList.add('on-' + targetPage);

  await zoomIn(targetPage);

  enableCurrentPageTriggers(targetPage);

  window.currentPage = targetPage;
}

async function playTransition(targetPage) {
  blueLog(`> playing: pageOutros[${window.currentPage}] \n`);
  await playInterval(pageOutros[window.currentPage]);

  blueLog(`> playing: pageIntros[${targetPage}] \n`);
  await playInterval(pageIntros[targetPage]);
}
