let currentColor = getRandomColor();

(function() {
  setARandomColor();
})();

function setARandomColor() {
  document.getElementById('color').style.backgroundColor = currentColor;
}

function guess() {
  const guessedColor = document.getElementById('guessedColor').value;
  if (guessedColor.length != 6) {
    alert('please input a 6 character hexdecimal color');
  } else {
    const currentIntColor = parseInt(currentColor.substr(1), 16);
    const guessedIntColor = parseInt(guessedColor, 16);

    const difference = Math.floor(currentIntColor - guessedIntColor);

    const score = 16777215 - difference;
    debugger;
    alert('Your points: ' + score);
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
