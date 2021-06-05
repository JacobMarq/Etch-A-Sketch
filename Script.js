const sketchScreenContainer = document.getElementById("SketchScreenContainer");
const Container = document.getElementById("Container");
const _low = 16;
const _medium = 32;
const _high = 64;
let density = _high;
let gridDensity = density * (density * 2);
let sketchElementClass = document.getElementsByClassName("SketchElement");
let sketchButtons = document.getElementsByClassName("sketchbutton");
let neon = false;
let greyscale = false;
let colorScheme;
let screenHeight;
let screenWidth;

//let screenSurfaceArea = sketchScreenContainer.offsetHeight * sketchScreenContainer.offsetWidth;
//let sizeFinder = screenSurfaceArea / gridDensity;
//let elementSize = Math.sqrt(sizeFinder);

function PopulateGrid()
{

    gridDensity = density * (density * 2);
    
    for (i = 0; i < gridDensity; i++) {
        var sketchElement = document.createElement('div');
        sketchElement.className = "SketchElement";
        sketchElement.classList.add("SketchElementEmpty");
        sketchElement.addEventListener("mouseover", setColor);
        sketchElement.addEventListener("touchmove", setColor);
        
        document.documentElement.style.setProperty('--grid-width', `repeat(${density * 2}, 1fr)`);
        document.documentElement.style.setProperty('--grid-height', `repeat(${density}, 1fr)`);

        sketchScreenContainer.insertAdjacentElement("beforeend", sketchElement);
    }

    sketchElementClass = document.getElementsByClassName("SketchElement");
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
    var elementsOnGrid = sketchElementClass.length;

    for (i = 0; i < elementsOnGrid; i++){
        sketchScreenContainer.removeChild(sketchElementClass[0]);
    }
}
function ResetGrid(scale)
{
    DepopulateGrid();
    density = scale;
    PopulateGrid();
}

function ClearGrid()
{
    for (i = 0; i < sketchElementClass.length; i++){
        sketchElementClass[i].classList.add("SketchElementEmpty");
        sketchElementClass[i].classList.remove("SketchElementUsed");
        sketchElementClass[i].style.removeProperty("background-color");
    }
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
    if (scheme === 1)
    {
        ColorScheme.textContent = "CLASSIC";
        neon = false;
        greyscale = false;
        Container.style.backgroundColor = "rgb(119, 0, 0)";
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
        let rainbowtext = "NEON";
        ColorScheme.textContent = "";

        //creates a rainbow effect by generating one letter at a time with a random color 
        for (i = 0; i < rainbowtext.length; i++) {
            let r = Math.floor(Math.random() * 255)+ 20;
            let g = Math.floor(Math.random() * 255)+ 20;
            let b = Math.floor(Math.random() * 255)+ 20;
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

/*var fixedscreen = document.getElementById("SketchScreenContainer");

fixedscreen.addEventListener('touchmove', function(e){
    e.preventDefault();
}, false);*/

PopulateGrid();
ChangeColorScheme();
erase.addEventListener("click", ()=>ClearGrid());
low.addEventListener("click", ()=>ResetGrid(_low));
medium.addEventListener("click", ()=>ResetGrid(_medium));
high.addEventListener("click", ()=>ResetGrid(_high));
changecolorscheme.addEventListener("click", ()=>ChangeColorScheme());