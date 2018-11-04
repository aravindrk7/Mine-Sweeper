var winner=0;
var losser=0;
function cell(x,y,size,i,j)
{		
	this.x = x;
	this.y = y;
	this.i = i;
	this.j = j;
	this.size = size;
	this.count = 0;
	this.flag=false;
	this.bee = false;
	this.revealed = false;
}
cell.prototype.show = function(min,sec,totalbees)
{

	fill(255);
	rect(410,10,80,40,20);
	fill(0);
	textSize(30);
	text("flag",425,40);
	this.min=min;
	this.sec=sec;
	this.totalbees=totalbees;
	if(winner == 1)
	{
		fill(255);
		textSize(30);
		text("***************************",450,140);
		textSize(50);
		text("!!You Won!!",480,190);
		textSize(30);
		text("***************************",450,240);

		for(var i = 0;i < 10;i++)
  {
    for(var j = 0;j < 10;j++)
    {
    	if(grid[i][j].bee)
    	{
    		this.revealed=true;
    	}
    }
}


	}
	else if(losser == 1)
	{
		fill(255);
		textSize(50);
		text("!!You lost!!",480,200);
	}
	else if(this.sec !=0 || this.min !=0)
	{
		fill(255);
		textSize(50);
		text(" Time left  ",490,140);
		textSize(50);
		text(nf(this.min,2)+":",540,220);
		textSize(50);
		text(nf(this.sec % 60,2),610,220);
	}
	else if(this.sec ==0 && this.min ==0)
	{
		fill(255);
		textSize(50);
		text("!!Times up!!",480,200);
	}
	if(((this.sec ==0 && this.min ==0)) && winner == 0 && losser == 0)
	{
		fill(255);
		textSize(50);
		text("Game Over",120,200);
	}
	else
	{

	fill(255);
	stroke(1);
	rect(this.x,this.y,this.size,this.size);
	if(this.flag)
	{
		stroke(6);
		fill(0);
		line(this.x+12,this.y+6,this.x+12,this.y+34);
		line(this.x+11,this.y+6,this.x+11,this.y+34);
		fill('#ff0000');
		triangle(this.x+12,this.y+6,this.x+12,this.y+20,this.x+30,this.y+13);
	}
	else
	{
		fill(255);
		rect(this.x,this.y,this.size,this.size);
	}
	if(this.revealed)
	{
		if(this.bee)
		{
			if(winner == 0)
			{
			fill('#ff0000');
			rect(this.x,this.y,this.size,this.size);
			fill(120);
			ellipse(this.x + 20,this.y + 20,this.size * 0.5);
			}
			else
			{
				fill('#00ff00')
			rect(this.x,this.y,this.size,this.size);
			fill(120);
			ellipse(this.x + 20,this.y + 20,this.size * 0.5);
			}
		}
		else
		{
			if(this.count == 0)
			{
				fill(200);
				rect(this.x,this.y,this.size,this.size);	
			}
			else
			{
			fill(200);
			rect(this.x,this.y,this.size,this.size);
			fill(0);
			textSize(17);
			text(this.count,this.x + 16,this.y + 26);
			}
		}
	}
}

}




cell.prototype.contain = function(x,y)
{
	return (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
}

cell.prototype.reveal = function()
{
	this.revealed = true;
	if(this.count == 0)
	{
		this.opencell();
	}
}

cell.prototype.opencell = function()	
{	
		for(var i = -1;i <= 1;i++)
		{ 
 	 		for(var j = -1;j <= 1;j++)
  			{
  				var a=this.i + i;
  				var b=this.j + j;
  				if(a > -1 && a < 10 && b > -1 && b < 10)
  				{
  					var near=grid[a][b];
  					if(!near.bee && !near.revealed)
  					{
  						near.reveal();
  					}
				}
			}
		}
}
cell.prototype.neighbourscount = function()
{
	if(this.bee)
	{
		this.count = -1;
	}
	var total = 0;
for(var i = -1;i <= 1;i++)
{ 
 	for(var j = -1;j <= 1;j++)
  	{
  		var a=this.i + i;
  		var b=this.j + j;
  		if(a > -1 && a < 10 && b > -1 && b < 10)
  		{
  	   		var neighbours = grid[a][b];
  			if(neighbours.bee)
  			{
  				total++;
  			}
  		}
  	}
}
this.count = total;			
}

cell.prototype.check = function()
{
    var win=0;
for(var i = 0;i < 10;i++)
  {
    for(var j = 0;j < 10;j++)
    {
    	var rev=grid[i][j];
      if(rev.revealed)
      {
        win++;
      }
    }
  }

  if(win + this.totalbees == 100)
	{
		winner=1;
	}
	if(win == 100)

	{
		losser=1;
	}
}

cell.prototype.button1 = function(x,y)
{
return (x > 410 && x < 490&& y > 10 && y < 50);
}

cell.prototype.flagfun = function()
{
		this.flag=true;
}
cell.prototype.unflagfun = function()
{
		this.flag=false;
}

