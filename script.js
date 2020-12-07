//html setup
var itemsHTMLCollection = document.getElementsByClassName('parallex-item');

var itemsArray = Array.from(itemsHTMLCollection);

// input
var input = {
  mouseX: {
    start: 0,
    end: window.innerWidth,
    current: 0
  },
  mouseY: {
    start: 0,
    end: window.innerHeight,
    current: 0
  }
};
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// output
var output = {
  x:{
    start: -150,
    end: 150,
    current: 0,
  },
  y:{
    start: -150,
    end: 150,
    current: 0,
  },
  zIndex:{
    range: 10000,
  },
  scale:{
    start: 1 ,
    end: 0.3,
  },
  blur: {
    startingDepth: 0.15,
    range: 10,
  },
};
output.x.range = output.x.end - output.x.start; 
output.y.range = output.y.end - output.y.start;
output.scale.range = output.scale.end - output.scale.start;


var mouse = {
  x: window.innerWidth * .5,
  y: window.innerHeight * .5
}


var updateInputs = function () {
  // mouse x input
  input.mouseX.current = mouse.x;  
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  // mouse y input
  input.mouseY.current = mouse.y;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}

var updateOutputs = function () {
  // output x  i y da se pomjeraju suprotno od misa
  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
  output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);
  // output x i y da prate misa
  //output.x.opposite = output.x.start + (input.mouseX.fraction * output.x.range);
  //output.y.opposite = output.y.start + (input.mouseY.fraction * output.y.range);
}

var updateEachParallaxItem = function() {
   //apply output to HTML
  itemsArray.forEach(function (item, k) {
    var depth = parseFloat(item.dataset.depth, 10);
    var itemOutput = {
      x: output.x.current - (output.x.current * depth),
      y: output.y.current - (output.y.current * depth),
      zIndex: output.zIndex.range - (output.zIndex.range * depth),
      scale: output.scale.start + (output.scale.range * depth),
      blur: output.blur.range * (depth - output.blur.startingDepth),
    }
    item.style.filter = 'blur('+itemOutput.blur+'px)';
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = 'scale('+itemOutput.scale+') translate('+itemOutput.x+'px, '+ itemOutput.y+'px)';
  });
  //console.log('output.x.current', output.x.current)
}

var handleMouseMove = function (event) {  
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  updateInputs();
  updateOutputs();
  updateEachParallaxItem();
};

var handleResize = function() {
  input.mouseX.end = window.innerWidth - 200;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.end = window.innerHeight - 200;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);

  updateInputs();
  updateOutputs();
  updateEachParallaxItem();