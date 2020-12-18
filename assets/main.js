console.log("Hola World");
var 
    canvas          = document.getElementById("canvas");
    ctx             = canvas.getContext('2d');
    ismousedown     = false,
    coords          = [];
canvas.width    =   window.innerWidth;
canvas.height    =   window.innerHeight;

//code



//Moving box
// var x           = 50;
// ctx.fillStyle    = 'blue';
// ctx.fillRect(50, 50, 200, 200);

// setInterval(function()
// {
//     ctx.fillStyle = "white";
//     ctx.fillRect(0,0,canvas.width, canvas.height)
//     ctx.fillStyle    = 'blue';
//     ctx.fillRect(x++, 50, 200, 200);
// }, 50);


//Triangle
// ctx.strokeStyle = "red";
// ctx.linewidth = 5;

// ctx.scale(1, 1);
// ctx.beginPath();
// ctx.moveTo(50,50);
// ctx.lineTo(25, 100);
// ctx.lineTo(75, 100);
// ctx.closePath();
// ctx.stroke();

//Text
// ctx.font = '20px Roboto';
// ctx.fillText("Hola World", canvas.width/2 ,canvas.height/2);
// ctx.textAlign = "center";


    canvas.addEventListener('mousedown', function()
    {
        ismousedown = true;
    })
    canvas.addEventListener('mouseup', function()
    {
        ismousedown = false;
        ctx.beginPath();
        coords.push('mouseup');
    })
    ctx.lineWidth = 10;
canvas.addEventListener('mousemove', function(e)
{
    if( ismousedown )
    {
        coords.push([e.clientX, e.clientY]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        
        // ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});
function save()
{
    localStorage.setItem('coords', JSON.stringify(coords));
}
function replay()
{
    var timer = setInterval(function()
    {
        if (!coords.length )
        {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        var 
            crd = coords.shift();
            e = {
                clientX: crd["0"],
                clientY: crd["1"]
            };

            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            
            // ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
            ctx.fill();
          
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
    

    }, 15);
}
function clear()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle="black";
}
document.addEventListener('keydown', function(e)
{
    console.log(e.keyCode);
    if( e.keyCode == 83 )
    {
        // save
        save();
        console.log('saved');
    }
    if (e.keyCode == 82)
    {
        //replay
        coords = JSON.parse(localStorage.getItem('coords'));

        clear();
        replay();
    }

    if (e.keyCode == 67)
    {
        //clear
        clear();   
        console.log('clerad');
    }
});