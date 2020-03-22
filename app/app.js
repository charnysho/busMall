'use strict';

//global variables
var allImages = [];
var roundsNumber = 25;
var click = 0;

//constructor of products
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.numClicked = 0;
  this.timesRendered = 0;
  allImages.push(this);
}

//create new objects and save to local storage
if (localStorage.allImages) {
  allImages = JSON.parse(localStorage.allImages);
} else {
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
  localStorage.allImages = allImages;
}

//get elements from html
var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');

// render unique images
function renderImages() {
  var newImageIndexes = generateUniqueImageIndexes(allImages, [image1.name, image2.name, image3.name]);

  var newImage1 = allImages[newImageIndexes[0]];
  image1.src = newImage1.imagePath;
  image1.name = newImage1.name;
  newImage1.timesRendered++;

  var newImage2 = allImages[newImageIndexes[1]];
  image2.src = newImage2.imagePath;
  image2.name = newImage2.name;
  newImage2.timesRendered++;

  var newImage3 = allImages[newImageIndexes[2]];
  image3.src = newImage3.imagePath;
  image3.name = newImage3.name;
  newImage3.timesRendered++;

  localStorage.allImages = JSON.stringify(allImages);
}

// generate unique indexes
function generateUniqueImageIndexes(images, usedImageNames) {
  var newImageIndexes = [];
  while (newImageIndexes.length < 3) {
    var index = Math.floor(Math.random() * images.length);
    if (!usedImageNames.includes(images[index].name)) {
      newImageIndexes.push(index);
      usedImageNames.push(images[index].name);
    }
  }
  return newImageIndexes;
}

// get element from html
var resultListEl = document.getElementById('result');

renderImages();
renderResultList();

// click handler for three images
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
        localStorage.allImages = JSON.stringify(allImages);
      }
    }
    renderResultList();
    renderImages();
  }
}

var elements = [image1, image2, image3];

// remove click listener for three images
function removeClickListener() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeEventListener('click', clickHandler);
  }
}

//render result list
function renderResultList() {
  resultListEl.innerHTML = '';
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

// draw chart
function drawChart() {
  createDataForChart();
  createColors();
  // eslint-disable-next-line no-undef
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

// create data for chart
function createDataForChart() {
  for(var i = 0; i < allImages.length; i++) {
    numClickedList.push(allImages[i].numClicked);
    timesRenderedList.push(allImages[i].timesRendered);
    nameList.push(allImages[i].name);
  }
}

var backgroundColorList = [];
var tmpBackgroundColorList = [];
var bordersList = [];

// set colors for chart
function createColors() {
  for(var i = 0; i < allImages.length; i++) {
    backgroundColorList.push('#2c786c');
    tmpBackgroundColorList.push('#AAAA00');
    bordersList.push('#f8b400');
  }
}
