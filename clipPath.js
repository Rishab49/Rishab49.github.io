 //variable declarations


 var Xcoordinate, Ycoordinate;
 var clickedState = false;
 var checkedState = false;
 var count = 0;
 var coordinateArray = [];
 var hideShowCounter = 0;
 var element;
 var curveCoordinates = [512, 350];
 var temp = [];
 var canResize = false;
 var firstClick=true;



 //elements declaration

 const SVGELEMENT = document.getElementsByTagName('svg')[0];
 const COORDINATEBOX = document.getElementsByClassName('coordinateBox')[0];
 const BUILTPATH = document.getElementsByClassName('built-path')[0];
 const CONTROLLER = document.getElementsByClassName('controller')[0];
 const CURVEOPTIONS = document.getElementsByClassName('curve-options')[0];
 const MAINCONTAINER = document.getElementsByClassName('main-container')[0];

 const MOVER = document.getElementsByClassName('mover')[0];
 const INPUTELEMENTX1 = document.getElementsByClassName('inputXCoordinate1')[0];
 const INPUTELEMENTY1 = document.getElementsByClassName('inputYCoordinate1')[0];
 const CURVECHECKBOX = document.getElementsByClassName('curve-checkbox')[0];
 const HIDEANDSHOW = document.getElementsByClassName('hide-show')[0];
 const CONTAINER = document.getElementsByClassName('container')[0];
 const GENERATE = document.getElementsByClassName('generate')[0];
 const CLIPPER = document.getElementsByClassName('clipper')[0];
 const INPUTBACK = document.getElementsByClassName('back')[0];
 const INPUTRESET = document.getElementsByClassName('reset')[0];
 const STARTX=document.getElementsByClassName('startX')[0];
 const STARTY=document.getElementsByClassName('startY')[0];



 //document events  


 document.addEventListener('mousemove', function (event) {
     Xcoordinate = event.clientX;
     Ycoordinate = event.clientY;
     COORDINATEBOX.style.top = Ycoordinate + 2 + 'px';
     COORDINATEBOX.style.left = Xcoordinate + 2 + 'px';
     COORDINATEBOX.innerText = '' + Xcoordinate + ' ,' + ' ' + Ycoordinate;

 });


 document.addEventListener('mousemove', function () {
     if (clickedState) {
         CONTROLLER.style.top = Ycoordinate - 10 + 'px';
         CONTROLLER.style.left = Xcoordinate - 10 + 'px';
     }
     if (checkedState) {
         document.getElementsByClassName('anchor2')[0].setAttribute('d', 'M' + " " + Xcoordinate + " " + Ycoordinate + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
         document.getElementsByClassName('curve')[0].setAttribute('d', 'M' + " " + getCoordinateFromArray(coordinateArray.length - 1) + ' ' + 'Q' + " " + curveCoordinates[0] + " " + curveCoordinates[1] + " " + Xcoordinate + " " + Ycoordinate);

     }
     if (canResize) {
         document.getElementsByClassName('anchor2')[0].setAttribute('d', 'M' + " " + temp[0] + " " + temp[1] + ' ' + 'L' + " " + Xcoordinate + " " + Ycoordinate);
         document.getElementsByClassName('anchor1')[0].setAttribute('d', 'M' + " " + getCoordinateFromArray(coordinateArray.length - 1) + ' ' + 'L' + " " + Xcoordinate + " " + Ycoordinate);

     }

 })



 document.addEventListener('keydown', function (event) {
     if (event.key === 'r') {
         canResize = true;
         checkedState = false;
         CURVECHECKBOX.checked = false;
         temp[0] = temp[0] == undefined ? Xcoordinate : temp[0];
         temp[1] = temp[1] == undefined ? Ycoordinate : temp[1];
         console.log('clicked');
     }
 })


 document.addEventListener('keyup', function (event) {
     if (event.key === 'r') {
         temp[0] = undefined;
         temp[1] = undefined;
         curveCoordinates[0] = Xcoordinate;
         curveCoordinates[1] = Ycoordinate;
         INPUTELEMENTX1.value = Xcoordinate;
         INPUTELEMENTY1.value = Ycoordinate;
         canResize = false;
         checkedState = true;
         CURVECHECKBOX.checked = true;
         document.getElementsByClassName('anchor2')[0].setAttribute('d', 'M' + " " + Xcoordinate + " " + Ycoordinate + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);

     }
 })



 // svg element event

 SVGELEMENT.addEventListener('click', function () {
if(firstClick){
    var x1 = INPUTELEMENTX1.value;
     var y1 = INPUTELEMENTY1.value;
     var val = "";
     val += "M"+" "+ Xcoordinate+" "+Ycoordinate;
     coordinateArray.push( "M"+" "+ Xcoordinate+" "+Ycoordinate);
     BUILTPATH.setAttribute('d', val);


     if (checkedState) {
         DestroyAnchors();

         CreateAnchors();
     }
     firstClick=false;
}
else{
    var x1 = INPUTELEMENTX1.value;
    var y1 = INPUTELEMENTY1.value;
    var val = BUILTPATH.getAttribute('d');
    val += checkedState ? ' Q' + ' ' + x1 + ' ' + y1 + ' ' + Xcoordinate + ' ' + Ycoordinate : ' L' + ' ' + Xcoordinate + ' ' + Ycoordinate;
    coordinateArray.push(checkedState ? ' Q' + ' ' + x1 + ' ' + y1 + ' ' + Xcoordinate + ' ' + Ycoordinate : ' L' + ' ' + Xcoordinate + ' ' + Ycoordinate);
    BUILTPATH.setAttribute('d', val);


    if (checkedState) {
        DestroyAnchors();

        CreateAnchors();
    }

}
     
 })



 //controller events

 MOVER.addEventListener('click', function () {
     count % 2 == 0 ? clickedState = true : clickedState = false;
     count++;
 })



 CURVECHECKBOX.addEventListener('click', function () {
     if (this.checked) {
         CURVEOPTIONS.style.display = "block";
         checkedState = true;
         CreateAnchors();
     }
     else {
         CURVEOPTIONS.style.display = "none";
         checkedState = false;
         DestroyAnchors();
     }
 })


 HIDEANDSHOW.addEventListener('click', function () {
     if (hideShowCounter % 2 == 0) {
         CONTAINER.style.display = "none";
     }
     else {
         CONTAINER.style.display = "block";
     }
     hideShowCounter++;
 })



 GENERATE.addEventListener('click', function () {
     document.getElementsByClassName('code-to-copy')[0].innerText="Path : "+BUILTPATH.getAttribute('d');
     BUILTPATH.setAttribute('stroke-width', "0");
     var points = BUILTPATH.getAttribute('d');
     element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
     element.setAttribute('d', points);
     element.setAttribute('fill', "transparent");
     element.setAttribute('stroke', "black");
     element.setAttribute('stroke-width', "0");


     CLIPPER.appendChild(element);
     MAINCONTAINER.style.clipPath = "url(#path)";
     console.log('this isthe chekced state',checkedState);
     if(checkedState){ DestroyAnchors()};
     
     CURVECHECKBOX.checked = false;
     checkedState = false;
    document.getElementsByClassName('code-to-copy')[0].style.display="block";

 })

 INPUTBACK.addEventListener('click', function () {
     let val = BUILTPATH.getAttribute('d');
     let val2 = coordinateArray[coordinateArray.length - 1];

     val = val.replace(val2, '');

     BUILTPATH.setAttribute('d', val);
     coordinateArray.pop();


     DestroyAnchors();
     CreateAnchors();


 })



 INPUTRESET.addEventListener('click', function () {
     BUILTPATH.setAttribute('d', "M 0 0");
     BUILTPATH.setAttribute('stroke-width', "2");
     MAINCONTAINER.style.clipPath = "";

     coordinateArray = ['M 0 0'];
     document.getElementsByClassName('code-to-copy')[0].style.display="none";
 })



 // input events

 INPUTELEMENTX1.addEventListener('change', function () {
     curveCoordinates[0] = this.value;
     document.getElementsByClassName('anchor2')[0].setAttribute('d', 'M' + " " + Xcoordinate + " " + Ycoordinate + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
     document.getElementsByClassName('anchor1')[0].setAttribute('d', 'M' + " " + getCoordinateFromArray(coordinateArray.length - 1) + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
 })
 INPUTELEMENTY1.addEventListener('change', function () {
     curveCoordinates[1] = this.value;
     document.getElementsByClassName('anchor2')[0].setAttribute('d', 'M' + " " + Xcoordinate + " " + Ycoordinate + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
     document.getElementsByClassName('anchor1')[0].setAttribute('d', 'M' + " " + getCoordinateFromArray(coordinateArray.length - 1) + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
 })


STARTX.addEventListener('change',function(event){
    let initialValue=BUILTPATH.getAttribute('d');
    let arr=initialValue.split(' ');
    arr[1]=this.value;
    let convertedValue=arr.join(' ');
    BUILTPATH.setAttribute('d',convertedValue);
})


STARTY.addEventListener('change',function(event){
    let initialValue=BUILTPATH.getAttribute('d');
    let arr=initialValue.split(' ');
    arr[2]=this.value;
    let convertedValue=arr.join(' ');
    BUILTPATH.setAttribute('d',convertedValue);
})

 //functions to get coordinate form path

 function getCoordinateFromArray(ind) {
     let arr = coordinateArray[ind].split(' ');
     return arr[arr.length - 2] + " " + arr[arr.length - 1];

 }

 //function to delete anchor paths

 function DestroyAnchors() {
     SVGELEMENT.removeChild(document.getElementsByClassName('anchor1')[0]);
     SVGELEMENT.removeChild(document.getElementsByClassName('anchor2')[0]);
     SVGELEMENT.removeChild(document.getElementsByClassName('curve')[0]);
 }

 //function to create anchor paths

 function CreateAnchors() {
     let element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
     element.setAttribute('stroke', "yellow");
     element.setAttribute('stroke-width', "2");
     element.setAttribute('fill', "transparent");
     element.setAttribute('class', "anchor1");
     element.setAttribute('d', 'M' + " " + getCoordinateFromArray(coordinateArray.length - 1) + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
     SVGELEMENT.appendChild(element);



     let element2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
     element2.setAttribute('stroke', "yellow");
     element2.setAttribute('stroke-width', "2");
     element2.setAttribute('fill', "transparent");
     element2.setAttribute('class', "anchor2");
     element2.setAttribute('d', 'M' + " " + Xcoordinate + " " + Ycoordinate + ' ' + 'L' + " " + curveCoordinates[0] + " " + curveCoordinates[1]);
     SVGELEMENT.appendChild(element2);

     let element3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
     element3.setAttribute('stroke', "yellow");
     element3.setAttribute('stroke-width', "2");
     element3.setAttribute('fill', "transparent");
     element3.setAttribute('class', "curve");
     element3.setAttribute('d', 'M' + " " + getCoordinateFromArray(coordinateArray.length - 1) + ' ' + 'Q' + " " + curveCoordinates[0] + " " + curveCoordinates[1] + " " + Xcoordinate + " " + Ycoordinate);
     SVGELEMENT.appendChild(element3);


 }

