'use strict';

var allImages = [];
var roundsNumber = 25;
var click = 0;

function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.numClicked = 0;
  this.timesRendered = 0;
  allImages.push(this);
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');

function renderImages() {
  var newImage1 = generateRandomImages();
  image1.src = newImage1.imagePath;
  image1.name = newImage1.name;
  newImage1.timesRendered++;

  var newImage2 = generateRandomImages();
  image2.src = newImage2.imagePath;
  image2.name = newImage2.name;
  newImage2.timesRendered++;

  var newImage3 = generateRandomImages();
  image3.src = newImage3.imagePath;
  image3.name = newImage3.name;
  newImage3.timesRendered++;
}

function generateRandomImages() {
  var index = Math.floor(Math.random() * allImages.length);
  while (
    allImages[index].name === image1.name ||
    allImages[index].name === image2.name ||
    allImages[index].name === image3.name
  ) {
    index = Math.floor(Math.random() * allImages.length);
  }
  return allImages[index];
}

renderImages();

var resultListEl = document.getElementById('result');

function clickHandler(event) {
  if (click >= roundsNumber) {
    renderResultList();
    removeClickListener();
    drawChart();
  } else {
    click++;
    for (var i = 0; i < allImages.length; i++) {
      if (allImages[i].name === event.target.name) {
        allImages[i].numClicked++;
      }
    }
    renderImages();
  }
}

var elements = [image1, image2, image3];

function removeClickListener() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeEventListener('click', clickHandler);
  }
}

function renderResultList() {
  for (var i = 0; i < allImages.length; i++) {
    var li = document.createElement('li');
    li.textContent = allImages[i].name + ': votes ' + allImages[i].numClicked +
    ', was shown ' + allImages[i].timesRendered + ' times';
    resultListEl.appendChild(li);
  }
}

image1.addEventListener('click', clickHandler);
image2.addEventListener('click', clickHandler);
image3.addEventListener('click', clickHandler);

var canvas = document.getElementById('myChart');
var ctx = canvas.getContext('2d');

var backgroundColorList = [];
var tmpBackgroundColorList = [];
var bordersList = [];

createcolors();

function createcolors() {
  for(var i = 0; i < allImages.length; i++) {
    backgroundColorList.push('#2c786c');
    tmpBackgroundColorList.push('#AAAA00');
  }
}

createBorders();

function createBorders() {
  for(var i = 0; i < allImages.length; i++) {
    bordersList.push('#f8b400');
  }
}

function drawChart() {
  createDataForChart();
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameList,
      datasets: [{
        label: 'Number of Votes',
        stack: 'votes',
        data: numClickedList,
        backgroundColor: backgroundColorList,
        borderColor: bordersList,
        borderWidth: 1.5
      },{
        label: 'Number of Shows',
        stack: 'shows',
        data: timesRenderedList,
        backgroundColor: tmpBackgroundColorList,
        borderColor: bordersList,
        borderWidth: 1.5
      },
      ]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

var numClickedList = [];
var timesRenderedList = [];
var nameList = [];

function createDataForChart() {
  for(var i = 0; i < allImages.length; i++) {
    numClickedList.push(allImages[i].numClicked);
    timesRenderedList.push(allImages[i].timesRendered);
    nameList.push(allImages[i].name);
  }
}
