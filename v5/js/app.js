setTimeout(() => {
  const firstVideo = document.getElementById('first');

  const perfectRatio = 16 / 9;

  const actualRatio = window.innerWidth / window.innerHeight;

  console.log('window.innerWidth', window.innerWidth);
  console.log('window.innerHeight', window.innerHeight);

  const totalWidth = window.innerWidth;
  console.log('firstVideo.clientWidth', firstVideo.clientWidth);

  const leftSpace = totalWidth - firstVideo.clientWidth;
  console.log('leftSpace', leftSpace);

  const halfLeftSpace = leftSpace / 2;
  console.log('halfLeftSpace', halfLeftSpace);

  const marginLeft = -1 * firstVideo.clientWidth + halfLeftSpace;

  console.log('marginLeft', marginLeft);

//   firstVideo.style.marginLeft = `${marginLeft}px`;
}, 500);

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
