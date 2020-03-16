'use strict';

var allImages = [];
var roundsNumber = 5;
var click = 0;

function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.numClicked = 0;
  this.timesRendered = 0;
  allImages.push(this);
}

new Product('bag', 'assets/bag.jpg');
new Product('banana', 'assets/banana.jpg');
new Product('bathroom', 'assets/bathroom.jpg');
new Product('boots', 'assets/boots.jpg');
new Product('breakfast', 'assets/breakfast.jpg');
new Product('bubblegum', 'assets/bubblegum.jpg');
new Product('chair', 'assets/chair.jpg');
new Product('cthulhu', 'assets/cthulhu.jpg');
new Product('dog-duck', 'assets/dog-duck.jpg');
new Product('dragon', 'assets/dragon.jpg');
new Product('pen', 'assets/pen.jpg');
new Product('pet-sweep', 'assets/pet-sweep.jpg');
new Product('scissors', 'assets/scissors.jpg');
new Product('shark', 'assets/shark.jpg');
new Product('sweep', 'assets/sweep.png');
new Product('tauntaun', 'assets/tauntaun.jpg');
new Product('unicorn', 'assets/unicorn.jpg');
new Product('usb', 'assets/usb.gif');
new Product('water-can', 'assets/water-can.jpg');
new Product('wine-glass', 'assets/wine-glass.jpg');

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

renderImages();

function clickHandler(event) {
  if(click >= roundsNumber) {
    alert('No more attempts!');
  } else {
    click++;
    for (var i = 0; i < allImages.length; i++) {
      if (allImages[i].name === event.target.name) {
        allImages[i].numClicked++;
        console.log(allImages[i]);
      }
    }
    renderImages();
  }
}

function generateRandomImages() {
  var index = Math.floor(Math.random() * allImages.length);
  while (
    allImages[index].name === image1.name ||
    allImages[index].name === image2.name ||
    allImages[index].name === image3.name
  ) {
    index = Math.floor(Math.random() * allImages.length)
  }
  return allImages[index];
}

image1.addEventListener('click', clickHandler)
image2.addEventListener('click', clickHandler);
image3.addEventListener('click', clickHandler);


var resultListEl = document.getElementById('result');

function renderResultList() {
    for (var i = 0; i < allImages.length; i++) {
      var li = document.createElement('li');
      li.textContent(allImages[i].name + allImages[i].numClicked);
      resultListEl.appendChild(li);
    }
}

