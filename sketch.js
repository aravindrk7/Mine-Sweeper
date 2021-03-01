var b=0;
var t = 0;
var min = 1;
var sec = 1;
var grid;
locked = false;
var cols = 10;
var rows = 10;
var totalbees=17;
var s = 40;
var canvas;
function setup() 
{
  //NoCanvas();
  canvas=createCanvas(801,401);
  var x = (windowWidth - 801) / 2;
  var y = (windowHeight - 401) / 2;
  canvas.position(x, y);
  var timer = select('#timer');
  function mine_time()
  {
    t++;
    if(min != 0 || sec != 0)
    {
      sec=601-t;
      min=floor(sec/60);

      //timer.html("Time left - "+nf(min,2)+":"+nf(sec%60,2));
    }
    //else
    //{
     // timer.html("Time left - 00:00");
    //}
  }
  setInterval(mine_time,1000);

  grid = arr(cols,rows);
  for(var i = 0;i < cols;i++)
  {
  	for(var j = 0;j < rows;j++)
  	{
  		grid[i][j] = new cell(i*s,j*s,s,i,j);
  	}
  }

  for(var k = 0;k < totalbees;k++)
  {
  	var i=floor(random(10));
  	var j=floor(random(10));
    while(grid[i][j].bee)
    {
      i=floor(random(10));
      j=floor(random(10));
    }
  	grid[i][j].bee = true;
  }

  for(var i = 0;i < cols;i++)
  {
  	for(var j = 0;j < rows;j++)
  	{
  		grid[i][j].neighbourscount();
  	}
  }

} 
function draw() 
{
  background(51);
  for(var i = 0;i < cols;i++)
  {
  	for(var j = 0;j < rows;j++)
  	{
  		grid[i][j].show(min,sec,totalbees);
  	}
  }	
}

function gameover() 
{
  for(var i = 0;i < 10;i++)
  {
    for(var j = 0;j < 10;j++)
    {
      grid[i][j].revealed=true;
    }
  } 
}

function mousePressed() 
{
  for(var i = 0;i < cols;i++)
  {
  	for(var j = 0;j < rows;j++)
  	{
      if(grid[i][j].button1(mouseX,mouseY))
      {
        fill(200);
        rect(410,10,80,40,20);
        fill(0);
    textSize(30);
        text("flag",425,40);
        locked=true;
      }
  		else if(grid[i][j].contain(mouseX,mouseY))
  		{
        if(mouseIsPressed)
        {
        if(mouseButton == LEFT)
        {
          if(!locked)
          {
            if(grid[i][j].flag)
            {
              grid[i][j].unflagfun();
            }
            else if(!grid[i][j].bee)
            {
              grid[i][j].reveal();  
            }
            
          else if(grid[i][j].bee)
          {
            gameover();
          }
          }
          else if(locked)
          {
             grid[i][j].flagfun();
             locked=false;  
          }
          grid[0][0].check();
        }
        if(mouseButton == RIGHT)
        {
          console.log("hi");
        }
        }


  		}
  	}
  }	
}

function arr(rows,cols)
{
	var array = new Array(cols);
	for(var i = 0;i < array.length;i++)
	{
		array[i] = new Array(rows);
	}
	return array;
}