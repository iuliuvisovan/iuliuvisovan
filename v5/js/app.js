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

setTimeout(() => {
  enterWebsite();
}, 500);

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
  setTimeout(() => {
    document.getElementById('loadingText').remove();
    document.getElementById('loadedText').classList.add('visible');
    document.getElementById('showCatGifsLink').innerText = 'Actually I think some cat gifs would be nice';
  }, 600);
});

setTimeout(() => {
  const vids = [...document.getElementsByTagName('video')];
  vids.forEach((vid) => {
    vid.play();
  });
}, 500);

setTimeout(() => {
  const vid = document.getElementById('mainvid');
  vid.pause();
}, 4000);

function enterWebsite() {
  document.getElementById('loadingOverlay').remove();
  document.getElementById('homepage').classList.add('entered');

  setTimeout(() => {
    document.getElementById('mainVid').play();
    setTimeout(() => {
      document.getElementById('mainVid').pause();
      [...document.getElementsByClassName('trigger')].forEach((trigger) => {
        trigger.classList.add('available');
      });
    }, 2132);
  }, 1500);
}

setTimeout(() => {
  document.getElementById('paperTrigger').addEventListener('mouseenter', function () {
    document.getElementById('pageWrapper').style.transform = 'scale(1.3) translateY(-100px)';
  });
  document.getElementById('paperTrigger').addEventListener('mouseleave', function () {
    document.getElementById('pageWrapper').style.transform = 'scale(1) translateY(0px)';
  });
}, 0);
