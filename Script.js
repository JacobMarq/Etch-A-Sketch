const sketchScreenContainer = document.getElementById("SketchScreenContainer");
const _low = 16;
const _medium = 32;
const _high = 64;
let density = _high;
let gridDensity = density * (density * 2);
let screenSurfaceArea = sketchScreenContainer.offsetHeight * sketchScreenContainer.offsetWidth;
let sizeFinder = screenSurfaceArea / gridDensity;
let elementSize = Math.sqrt(sizeFinder);
let sketchElementID = document.getElementsByClassName("SketchElement");

function PopulateGrid()
{
    for (i = 0; i < gridDensity; i++) {
        var sketchElement = document.createElement('div');
        sketchElement.className = "SketchElement";
        sketchElement.classList.add("SketchElementEmpty")
        sketchElement.addEventListener("mouseover", setColor);
    
        sketchScreenContainer.appendChild(sketchElement);
    }
    sketchElementID = document.getElementsByClassName("SketchElement");
}
function DepopulateGrid()
{
    var elementsOnGrid;
    elementsOnGrid = sketchElementID.length;

    for (i = 0; i < elementsOnGrid; i++){
        sketchScreenContainer.removeChild(sketchElementID[0]);
    }
}

/*function setColor(element)
{
    element.target.style.backgroundColor = "black";
}*/
function setColor(element)
{
    element.target.classList.remove("SketchElementEmpty");
    element.target.classList.add("SketchElementUsed");
}

/*function setElementSize()
{
    sketchElement.style.width = (elementSize + "px");
    sketchElement.style.height = (elementSize + "px");
}*/
function setElementSize()
{
    document.documentElement.style.setProperty('--sketch-width', elementSize + "px")
}


function ClearGrid()
{
    for (i = 0; i < sketchElementID.length; i++){
        sketchElementID[i].classList.add("SketchElementEmpty");
        sketchElementID[i].classList.remove("SketchElementUsed");
    }
}
function ResetGrid(scale)
{
    DepopulateGrid();
    density = scale;
    CalculateScreenSize();
    console.log(sizeFinder);
    console.log(elementSize);
    PopulateGrid();
    setElementSize();
}

function CalculateScreenSize()
{
    gridDensity = density * (density * 2);
    screenSurfaceArea = sketchScreenContainer.offsetHeight * sketchScreenContainer.offsetWidth;
    sizeFinder = screenSurfaceArea / gridDensity;
    elementSize = Math.sqrt(sizeFinder);
}

PopulateGrid();
setElementSize();
erase.addEventListener("click", ()=>ClearGrid());
low.addEventListener("click", ()=>ResetGrid(_low));
medium.addEventListener("click", ()=>ResetGrid(_medium));
high.addEventListener("click", ()=>ResetGrid(_high));
/*console.log(screenSurfaceArea); 
console.log(sizeFinder); 
console.log(elementSize);*/