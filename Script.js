const sketchScreenContainer = document.getElementById("SketchScreenContainer");
const Container = document.getElementById("Container");
const _low = 16;
const _medium = 32;
const _high = 64;
let density = _high;
let gridDensity = density * (density * 2);
let screenSurfaceArea = sketchScreenContainer.offsetHeight * sketchScreenContainer.offsetWidth;
let sizeFinder = screenSurfaceArea / gridDensity;
let elementSize = Math.sqrt(sizeFinder);
let sketchElementID = document.getElementsByClassName("SketchElement");
let sketchButtons = document.getElementsByClassName("sketchbutton");
let neon = false;
let greyscale = false;
let colorScheme;

function PopulateGrid()
{
    function CalculateScreenSize()
    {
        gridDensity = density * (density * 2);
        screenSurfaceArea = sketchScreenContainer.offsetHeight * sketchScreenContainer.offsetWidth;
        sizeFinder = screenSurfaceArea / gridDensity;
        elementSize = Math.sqrt(sizeFinder);
    }
    function setElementSize()
    {
        document.documentElement.style.setProperty('--sketch-width', elementSize + "px")
    }

    CalculateScreenSize();
    
    for (i = 0; i < gridDensity; i++) {
        var sketchElement = document.createElement('div');
        sketchElement.className = "SketchElement";
        sketchElement.classList.add("SketchElementEmpty");
        sketchElement.addEventListener("mouseover", setColor);
    
        sketchScreenContainer.appendChild(sketchElement);
    }

    setElementSize();
    sketchElementID = document.getElementsByClassName("SketchElement");
}
function setColor(element)
{
    element.target.classList.remove("SketchElementEmpty");
    element.target.classList.add("SketchElementUsed");
    if(neon)
    {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        this.style.backgroundColor = (`rgb(${r}, ${g}, ${b})`);
    }
    if(greyscale)
    {
        if (this.style.backgroundColor.match(/rgba/))
        {
            let currentAlpha = Number(this.style.backgroundColor.slice(-4, -1));
            if (currentAlpha <= 0.9)
            {
                this.style.backgroundColor = `rgba(0, 0, 0, ${currentAlpha + 0.1})`;
            }
        }
        else if(this.style.backgroundColor == 'rgb(0, 0, 0)')
        {
            return;
        }
        else
        {
            this.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
        }
    }
}
function DepopulateGrid()
{
    var elementsOnGrid;
    elementsOnGrid = sketchElementID.length;

    for (i = 0; i < elementsOnGrid; i++){
        sketchScreenContainer.removeChild(sketchElementID[0]);
    }
}

function ClearGrid()
{
    for (i = 0; i < sketchElementID.length; i++){
        sketchElementID[i].classList.add("SketchElementEmpty");
        sketchElementID[i].classList.remove("SketchElementUsed");
        sketchElementID[i].style.removeProperty("background-color");
    }
}

function ResetGrid(scale)
{
    DepopulateGrid();
    density = scale;
    PopulateGrid();
}

function ChangeColorScheme()
{
    if (colorScheme > 0)
    {
        switch(colorScheme)
        {
            case(1):
            {
                colorScheme = 2;
                SetColorWay(colorScheme);
                break;
            }
            case(2):
            {
                colorScheme = 3;
                SetColorWay(colorScheme);
                break;
            }
            case(3):
            {
                colorScheme = 1;
                SetColorWay(colorScheme);
                break;
            }
        }
    }
    else
    {
        colorScheme = 1;
        SetColorWay(colorScheme);
    }
}
function SetColorWay(scheme)
{
    DepopulateGrid();
    ColorScheme.style.removeProperty("color");
    //document.documentElement.style.setProperty('CssVariable', newvalue);
    if (scheme === 1)
    {
        ColorScheme.textContent = "CLASSIC";
        neon = false;
        greyscale = false;
        Container.style.backgroundColor = ("rgb(119, 0, 0)");
        sketchScreenContainer.style.backgroundColor = "rgb(212, 212, 212)";
        document.documentElement.style.setProperty('--sketchborder-color', "rgb(80, 0, 0)");
        document.documentElement.style.setProperty('--sketchused-color', "rgb(82, 82, 82)");
        document.documentElement.style.setProperty('--sketchempty-color', "rgb(212, 212, 212)");
        ColorScheme.style.color = "goldenrod";
        
        for (i = 0; i < sketchButtons.length; i++){
            sketchButtons[i].classList.remove("neonbutton");
        }
    }
    else if (scheme === 2)
    {   
        function GenerateColor()
        {
            let color = Math.floor(Math.random() * 255)+ 20;
            return(color);
        }
        let rainbowtext = "NEON";
        ColorScheme.textContent = "";

        for (i = 0; i < rainbowtext.length; i++) {
            let r = GenerateColor();
            let g = GenerateColor();
            let b = GenerateColor();
            var rainbowLetter = document.createElement('span');
            rainbowLetter.style.color = (`rgb(${r}, ${g}, ${b})`);
            rainbowLetter.classList.add("RainbowLetters");
            rainbowLetter.textContent = rainbowtext[i];
            document.documentElement.style.setProperty("--rletter-shadow", "0 0 .125em white");
        
            ColorScheme.appendChild(rainbowLetter);
        }
        
        neon = true;
        greyscale = false;
        Container.style.backgroundColor = ("rgb(174, 6, 216)");
        sketchScreenContainer.style.backgroundColor = "black";
        document.documentElement.style.setProperty('--sketchborder-color', "rgb(130, 0, 180)");
        document.documentElement.style.setProperty('--sketchempty-color', "black");
        
        for (i = 0; i < sketchButtons.length; i++){
            sketchButtons[i].classList.add("neonbutton");
        }
    }
    else if (scheme === 3)
    {
        ColorScheme.textContent = "GREYSCALE";
        neon = false;
        greyscale = true;
        Container.style.backgroundColor = ("rgb(125, 125, 125)");
        sketchScreenContainer.style.backgroundColor = "white";
        document.documentElement.style.setProperty('--sketchborder-color', "rgb(80, 80, 80)");
        document.documentElement.style.setProperty('--sketchempty-color', "white");
        ColorScheme.style.color = "gray";

        for (i = 0; i < sketchButtons.length; i++){
            sketchButtons[i].classList.remove("neonbutton");
        }
    }
    PopulateGrid();
}

PopulateGrid();
ChangeColorScheme();
//SetColorWay(1);
erase.addEventListener("click", ()=>ClearGrid());
low.addEventListener("click", ()=>ResetGrid(_low));
medium.addEventListener("click", ()=>ResetGrid(_medium));
high.addEventListener("click", ()=>ResetGrid(_high));
changecolorscheme.addEventListener("click", ()=>ChangeColorScheme());
/*console.log(screenSurfaceArea); 
console.log(sizeFinder); 
console.log(elementSize);*/