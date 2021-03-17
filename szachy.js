var board = 
[
	['rookW','knightW','bishopW','queenW','kingW','bishopW','knightW','rookW'],
	['pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW'],
	['','','','','','','',''],
	['','','','','','','',''],
	['','','','','','','',''],
	['','','','','','','',''],
	['pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB'],
	['rookB','knightB','bishopB','queenB','kingB','bishopB','knightB','rookB']
];



$(".fieldW").click(choose);
$(".fieldB").click(choose);

var current_element;
var current_id;
var figure_chosen = false;
var turn = "white";
var letter = /W/;

function choose()
{
	if(figure_chosen==false && letter.test($(this).html()))
	{
		figure_chosen=true;
		current_element=this;
		current_id=$(this).attr('id');
		avaliableMoves(current_id);
	}
	else if($(this).hasClass("possible_moveB") || $(this).hasClass("possible_moveW"))
	{
		
		if(turn=="white")	{turn="black";	letter = /B/; $("#turn").html("Black<br>player<br>turn");}
		else if(turn=="black")	{turn="white";	letter = /W/; $("#turn").html("White<br>player<br>turn");}
		
		if(board[$(this).attr('id').charAt(1)-1][$(this).attr('id').charCodeAt(0)-97]=='kingB')
		{
			$("#turn").html("White<br>won!");
			$(".fieldW").css("backgroundColor","#d6ac76");
			$(".fieldB").css("backgroundColor","#6d3d12");
		}
			
		if(board[$(this).attr('id').charAt(1)-1][$(this).attr('id').charCodeAt(0)-97]=='kingW')
		{
			$("#turn").html("Black<br>won!");
			$(".fieldW").css("backgroundColor","#d6ac76");
			$(".fieldB").css("backgroundColor","#6d3d12");
		}	
		
		figure_chosen=false;
		
		//changing pictures
		$(this).html($(current_element).html());
		$(current_element).html('');
		avaliableMoves(current_id);
		
		if($(this).attr('id')=='g1' && board[0][4]=='kingW') //castling - roszada
		{
			$("#f1").html('<img src="img/rookW.png">')
			$("#h1").html('');
			board[0][7]='';
			board[0][5]='rookW';
		}
		
		if($(this).attr('id')=='c1' && board[0][4]=='kingW') //castling - roszada
		{
			$("#d1").html('<img src="img/rookW.png">')
			$("#a1").html('');
		board[0][0]='';
		board[0][3]='rookW';
		}
		
		if($(this).attr('id')=='g8' && board[7][4]=='kingB') //castling - roszada
			{
			$("#f8").html('<img src="img/rookB.png">')
			$("#h8").html('');
			board[7][7]='';
			board[7][5]='rookB';
		}
		
		if($(this).attr('id')=='c8' && board[7][4]=='kingB') //castling - roszada
		{
			$("#d8").html('<img src="img/rookB.png">')
			$("#a8").html('');
			board[7][0]='';
			board[7][3]='rookB';
		}
		
		//moving piece in board[][]
		board[$(this).attr('id').charAt(1)-1][$(this).attr('id').charCodeAt(0)-97]=board[current_id.charAt(1)-1][current_id.charCodeAt(0)-97];
		board[current_id.charAt(1)-1][current_id.charCodeAt(0)-97]='';
	}
	else
	{
		alert('Niedozowlony ruch!');
		figure_chosen=false;
		avaliableMoves(current_id);
	}
console.log(board);
}

function lightUp(a,b)
{
	if((a%2==0 && b%2==0) || (a%2==1 && b%2==1))
		$("#"+String.fromCharCode(a)+(b)).toggleClass("possible_moveB");
	if((a%2==0 && b%2==1) || (a%2==1 && b%2==0))
		$("#"+String.fromCharCode(a)+(b)).toggleClass("possible_moveW");
}


function avaliableMoves(id)
{
	
	var y=id.charAt(1);
	var x=id.charCodeAt(0);
	var piece=board[y-1][x-97];

	switch (piece)
	{
		case "kingB":
			if(x-97<=6 && y<=7 && (board[y][x-96]=='' || /W/.test(board[y][x-96])))	lightUp(x*1+1,y*1+1);
			if(y<=7 && (board[y][x-97]=='' || /W/.test(board[y][x-97])))	lightUp(x,y*1+1);
			if(x-97>=1 && y<=7 && (board[y][x-98]=='' || /W/.test(board[y][x-98])))	lightUp(x-1,y*1+1);
			
			if(x-97<=6 && y>=2 && (board[y-2][x-96]=='' || /W/.test(board[y-2][x-96])))	lightUp(x*1+1,y*1-1);
			if(y>=2 && (board[y-2][x-97]=='' || /W/.test(board[y-2][x-97])))	lightUp(x,y*1-1);
			if(x-97>=1 && y>=2 && (board[y-2][x-98]=='' || /W/.test(board[y-2][x-98])))	lightUp(x-1,y*1-1);
			
			if(x-97<=6 && (board[y-1][x-96]=='' || /W/.test(board[y-1][x-96])))	lightUp(x*1+1,y);
			if(x-97>=1 && (board[y-1][x-98]=='' || /W/.test(board[y-1][x-98])))	lightUp(x-1,y);
			
			//castling - roszada
			if(x==101 && y==8 && board[7][0]=="rookB" && board[7][1]=='' && board[7][2]=='' && board[7][3]=='') 
			{
				lightUp(99,8);
			}
			if(x==101 && y==8 && board[7][7]=="rookB" && board[7][6]=='' && board[7][5]=='')
			{
				lightUp(103,8);
			}

		break;
		
		case "kingW":
			if(x-97<=6 && y<=7 && (board[y][x-96]=='' || /B/.test(board[y][x-96])))	lightUp(x*1+1,y*1+1);
			if(y<=7 && (board[y][x-97]=='' || /B/.test(board[y][x-97])))	lightUp(x,y*1+1);
			if(x-97>=1 && y<=7 && (board[y][x-98]=='' || /B/.test(board[y][x-98])))	lightUp(x-1,y*1+1);
			
			if(x-97<=6 && y>=2 && (board[y-2][x-96]=='' || /B/.test(board[y-2][x-96])))	lightUp(x*1+1,y*1-1);
			if(y>=2 && (board[y-2][x-97]=='' || /B/.test(board[y-2][x-97])))	lightUp(x,y*1-1);
			if(x-97>=1 && y>=2 && (board[y-2][x-98]=='' || /B/.test(board[y-2][x-98])))	lightUp(x-1,y*1-1);
			
			if(x-97<=6 && (board[y-1][x-96]=='' || /B/.test(board[y-1][x-96])))	lightUp(x*1+1,y);
			if(x-97>=1 && (board[y-1][x-98]=='' || /B/.test(board[y-1][x-98])))	lightUp(x-1,y);
			
			//castling - roszada
			if(x==101 && y==1 && board[0][0]=="rookW" && board[0][1]=='' && board[0][2]=='' && board[0][3]=='') 
			{
				lightUp(99,1);
			}
			if(x==101 && y==1 && board[0][7]=="rookW" && board[0][6]=='' && board[0][5]=='')
			{
				lightUp(103,1);
			}

		break;
		
		case "queenB":
		case "bishopB":
		
			while(x-97<=6 && y<=7)
			{
				if(board[y][x-96]=='')
				{
					y++; x++;
					lightUp(x,y);
				}
				else if(/W/.test(board[y][x-96]))
				{
					y++; x++;
					lightUp(x,y);
					y=8; x=105;
				}
				else {y=8; x=105;}
			}
			
			y=id.charAt(1);
			x=id.charCodeAt(0);
			
			while(x-97>=1 && y<=7)
			{
				if(board[y][x-98]=='')
				{
					y++; x--;
					lightUp(x,y);
				}
				else if(/W/.test(board[y][x-98]))
				{
					y++; x--;
					lightUp(x,y);
					y=8; x=97;
				}
				else {y=8; x=97;}
			}
			
			y=id.charAt(1);
			x=id.charCodeAt(0);
			
			while(x-97>=1 && y>=2)
			{
				if(board[y-2][x-98]=='')
				{
					y--; x--;
					lightUp(x,y);
				}
				else if(/W/.test(board[y-2][x-98]))
				{
					y--; x--;
					lightUp(x,y);
					y=1; x=97;
				}
				else {y=1; x=97;}
			}
			
			y=id.charAt(1);
			x=id.charCodeAt(0);
			
			while(x-97<=6 && y>=2)
			{
				if(board[y-2][x-96]=='')
				{
					y--; x++;
					lightUp(x,y);
				}
				else if(/W/.test(board[y-2][x-96]))
				{
					y--; x++;
					lightUp(x,y);
					y=1; x=105;
				}
				else {y=1; x=105;}
			}
			if(piece == "bishopB")	break;
		
			y=id.charAt(1);
			x=id.charCodeAt(0);
		
		case "rookB":
		
			while(y<=7)
			{
				if(board[y][x-97]=='')
				{
					y++;
					lightUp(x,y);
				}
				else if(/W/.test(board[y][x-97]))
				{
					y++;
					lightUp(x,y);
					y=8;
				}
				else y=8;
			}
			
			y=id.charAt(1);

			while(y>=2)
			{
				if(board[y-2][x-97]=='')
				{
					y--;
					lightUp(x,y);
				}
				else if(/W/.test(board[y-2][x-97]))
				{
					y--;
					lightUp(x,y);
					y=1;
				}
				else y=1;
			}
			
			y=id.charAt(1);
			
			while(x-97<7)
			{
				if(board[y-1][x-96]=='')
				{
					x++;
					lightUp(x,y);
					
				}
				else if(/W/.test(board[y-1][x-96]))
				{
					
					x++;
					lightUp(x,y);
					x=105;
				}
				else x=105;
			}
			
			var x=id.charCodeAt(0);
			
			while(x-97>0)
			{
				if(board[y-1][x-98]=='')
				{
					x--;
					lightUp(x,y);
					
				}
				else if(/W/.test(board[y-1][x-98]))
				{
					
					x--;
					lightUp(x,y);
					x=97;
				}
				else x=97;
			}
			
		break;
		
		case "queenW":
		case "bishopW":
		
			while(x-97<=6 && y<=7)
			{
				if(board[y][x-96]=='')
				{
					y++; x++;
					lightUp(x,y);
				}
				else if(/B/.test(board[y][x-96]))
				{
					y++; x++;
					lightUp(x,y);
					y=8; x=105;
				}
				else {y=8; x=105;}
			}
			
			y=id.charAt(1);
			x=id.charCodeAt(0);
			
			while(x-97>=1 && y<=7)
			{
				if(board[y][x-98]=='')
				{
					y++; x--;
					lightUp(x,y);
				}
				else if(/B/.test(board[y][x-98]))
				{
					y++; x--;
					lightUp(x,y);
					y=8; x=97;
				}
				else {y=8; x=97;}
			}
			
			y=id.charAt(1);
			x=id.charCodeAt(0);
			
			while(x-97>=1 && y>=2)
			{
				if(board[y-2][x-98]=='')
				{
					y--; x--;
					lightUp(x,y);
				}
				else if(/B/.test(board[y-2][x-98]))
				{
					y--; x--;
					lightUp(x,y);
					y=1; x=97;
				}
				else {y=1; x=97;}
			}
			
			y=id.charAt(1);
			x=id.charCodeAt(0);
			
			while(x-97<=6 && y>=2)
			{
				if(board[y-2][x-96]=='')
				{
					y--; x++;
					lightUp(x,y);
				}
				else if(/B/.test(board[y-2][x-96]))
				{
					y--; x++;
					lightUp(x,y);
					y=1; x=105;
				}
				else {y=1; x=105;}
			}
			if(piece == "bishopW")	break;
		
			y=id.charAt(1);
			x=id.charCodeAt(0);
		
		case "rookW":
		
			while(y<=7)
			{
				if(board[y][x-97]=='')
				{
					y++;
					lightUp(x,y);
				}
				else if(/B/.test(board[y][x-97]))
				{
					y++;
					lightUp(x,y);
					y=8;
				}
				else y=8;
			}
			
			y=id.charAt(1);

			while(y>=2)
			{
				if(board[y-2][x-97]=='')
				{
					y--;
					lightUp(x,y);
				}
				else if(/B/.test(board[y-2][x-97]))
				{
					y--;
					lightUp(x,y);
					y=1;
				}
				else y=1;
			}
			
			y=id.charAt(1);
			
			while(x-97<7)
			{
				if(board[y-1][x-96]=='')
				{
					x++;
					lightUp(x,y);
					
				}
				else if(/B/.test(board[y-1][x-96]))
				{
					
					x++;
					lightUp(x,y);
					x=105;
				}
				else x=105;
			}
			
			var x=id.charCodeAt(0);
			
			while(x-97>0)
			{
				if(board[y-1][x-98]=='')
				{
					x--;
					lightUp(x,y);
					
				}
				else if(/B/.test(board[y-1][x-98]))
				{
					
					x--;
					lightUp(x,y);
					x=97;
				}
				else x=97;
			}
			
		break;
		
		case "knightB":
		
			if(x-97<=6 && y<=6 && (board[y*1+1][x-96]=='' || /W/.test((board[y*1+1][x-96]))))
				lightUp(x*1+1,y*1+2);
			
			if(x-97>=1 && y<=6 && (board[y*1+1][x-98]=='' || /W/.test((board[y*1+1][x-98]))))
				lightUp(x*1-1,y*1+2);
				
			if(x-97<=6 && y>=3 && (board[y*1-3][x-96]=='' || /W/.test((board[y*1-3][x-96]))))
				lightUp(x*1+1,y*1-2);
			
			if(x-97>=1 && y>=3 && (board[y*1-3][x-98]=='' || /W/.test((board[y*1-3][x-98]))))
				lightUp(x*1-1,y*1-2);
			
			if(x-97>=2 && y>=2 && (board[y*1-2][x-99]=='' || /W/.test((board[y*1-2][x-99]))))
				lightUp(x*1-2,y*1-1);
			
			if(x-97>=2 && y<=7 && (board[y][x-99]=='' || /W/.test((board[y][x-99]))))
				lightUp(x*1-2,y*1+1);
			
			if(x-97<=5 && y>=2 && (board[y*1-2][x-95]=='' || /W/.test((board[y*1-2][x-95]))))
				lightUp(x*1+2,y*1-1);
			
			if(x-97<=5 && y<=7 && (board[y][x-95]=='' || /W/.test((board[y][x-95]))))
				lightUp(x*1+2,y*1+1);

		break;
		
		case "knightW":
		
			if(x-97<=6 && y<=6 && (board[y*1+1][x-96]=='' || /B/.test((board[y*1+1][x-96]))))
				lightUp(x*1+1,y*1+2);
			
			if(x-97>=1 && y<=6 && (board[y*1+1][x-98]=='' || /B/.test((board[y*1+1][x-98]))))
				lightUp(x*1-1,y*1+2);
				
			if(x-97<=6 && y>=3 && (board[y*1-3][x-96]=='' || /B/.test((board[y*1-3][x-96]))))
				lightUp(x*1+1,y*1-2);
			
			if(x-97>=1 && y>=3 && (board[y*1-3][x-98]=='' || /B/.test((board[y*1-3][x-98]))))
				lightUp(x*1-1,y*1-2);
			
			if(x-97>=2 && y>=2 && (board[y*1-2][x-99]=='' || /B/.test((board[y*1-2][x-99]))))
				lightUp(x*1-2,y*1-1);
			
			if(x-97>=2 && y<=7 && (board[y][x-99]=='' || /B/.test((board[y][x-99]))))
				lightUp(x*1-2,y*1+1);
			
			if(x-97<=5 && y>=2 && (board[y*1-2][x-95]=='' || /B/.test((board[y*1-2][x-95]))))
				lightUp(x*1+2,y*1-1);
			
			if(x-97<=5 && y<=7 && (board[y][x-95]=='' || /B/.test((board[y][x-95]))))
				lightUp(x*1+2,y*1+1);

		break;
	
		case "pawnB":
		
			if(y>=2)
			{
				if(board[y-2][x-97]=='')
					lightUp(x,y*1-1);
			
				if(/W/.test(board[y-2][x-96]) && x-96<=7)
					lightUp(x*1+1,y*1-1);
				
				if(/W/.test(board[y-2][x-98]) && x-98>=0)
					lightUp(x*1-1,y*1-1);
			}
			
			if(y==7 && board[5][x-97]==''&& board[4][x-97]=='')
			{
				lightUp(x,5);
			}
			
		break;
	
		case "pawnW":
		
			if(y<=7)
			{
				if(board[y][x-97]=='')
					lightUp(x,y*1+1);
			
				if(/B/.test(board[y][x-96]) && x-96<=7)
					lightUp(x*1+1,y*1+1);
				
				if(/B/.test(board[y][x-98]) && x-98>=0)
					lightUp(x*1-1,y*1+1);
			}
			
			if(y==2 && board[3][x-97]=='' && board[2][x-97]=='')
			{
				lightUp(x,4);
			}
			
		break;
	}
}



