var ticTacRef;
var IDs;
angular.module("TicTacSkate", ["firebase"])
 .controller("playerTurn", function($scope, $firebase){
 	
 	ticTacRef = new Firebase("https://skatetictac.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

	var xTurn = {turn: false};
	var gameover = false;
	var X = "skatedog.jpeg";
	var O = "UndieSkate.jpg";
	var counter = 0;
	var playerSymbol;

 	// Wait until everything really is loaded
 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			// What???  No Board????  Let's build one.
	 		$scope.fbRoot.$add( { boxes:[['','',''],['','',''], ['','','']],
 	 			xTurn:true, gameover:false, X:"skatedog.jpeg", O:"UndieSkate.jpg", counter:0, rowx:0, rowo:0,
			columnx:0, columno:0, dia1x:0, dia1o:0, dia2x:0, dia2o:0, winner: "" } );
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}

	});

 	// $scope.makeMove = function(idx){
 	// 	if($scope.obj.boxes[idx]=="")
 	// 	{
		// 	$scope.obj.boxes[idx] = $scope.obj.xTurn ?'X':'O';
		// 	$scope.obj.xTurn = !$scope.obj.xTurn;
		// 	$scope.obj.$save();
 	// 	}



// var iam - function() {
//      return mySymbol == ($scope.obj.xturn ? 'X' : 'O'); 
// };
 
// makeMove =

// if($scope.obj.board[idx] == "" && (hasNotBeenTaken($scope.obj.xturn) || iAm($scope.obj.xturn))


// if($scope.obj.board[idx] == "" && (hasNotBeenTaken() || iAm())




 	function xTaken() 
 	{
 		for(var i = 0; i < $scope.obj.boxes.length; i++)
 		{
 			if($scope.obj.boxes[i].indexOf(X) == -1)
 				return true;
 			else if(playerSymbol == X && $scope.obj.xTurn)
				return true;
			else
				return false;
 		}
 	}

 	function imHere ()
 	{
 		if(playerSymbol != X && $scope.obj.xTurn == false)
 			return true;
 	}



	$scope.clickhere = function(r,c) 
	{
		if($scope.obj.winner == X || $scope.obj.winner == O)
			return gameover = true;
		if(xTaken() || imHere() && $scope.obj.boxes[r][c] != X && $scope.obj.boxes[r][c] != O && !gameover) 
		{
			// if(xTurn.turn = !xTurn.turn)
			// 	$scope.obj.boxes[r][c] = X;
			// else
			// 	$scope.obj.boxes[r][c] = O;
			$scope.obj.boxes[r][c] = $scope.obj.xTurn ? X : O;
			playerSymbol = $scope.obj.xTurn ? X : O;
			$scope.obj.xTurn = !$scope.obj.xTurn;
			counter++;
		}
		if (counter == 9)
			alert("Road Rash - Game End!");
		$scope.obj.$save();
	}



     // return mySymbol == ($scope.obj.xturn ? 'X' : 'O'); 


// var app = angular.module("TicTacSkate", ["firebase"]);

// app.controller("playerTurn", function($scope, $firebase)
// {

// 	var allvariablesRef = new Firebase("https://skatetictac.firebaseio.com/");

// 		$scope.allvariables = $firebase(allvariables);

	// // }


	// function playerTurn ($scope) {
	// 	//do something
	
	// 	$scope.xTurn.val = true
	// $scope.boxes = [['','',''],['','',''], ['','','']];
	$scope.winningPlayer = function () 
	{	

		for(a=0; a < 3; a++) 
		{
			
			var rowx = 0; var rowo = 0;
			var columnx = 0;  var columno = 0;
			var dia1x = 0;  var dia1o = 0;
			var dia2x = 0;  var dia2o =0; 

			for(b=0; b<3; b++)
			{
				
				if($scope.obj.boxes[a][b] == X) {rowx++} 
				
				if($scope.obj.boxes[b][a] == X) {columnx++} 
				
				if($scope.obj.boxes[b][b] == X) {dia1x++}

				if($scope.obj.boxes[b][2-b] == X) {dia2x++}

				
				if($scope.obj.boxes[a][b] == O) {rowo++}

				if($scope.obj.boxes[b][a] == O) {columno++}

				if($scope.obj.boxes[b][b] == O) {dia1o++}

				if($scope.obj.boxes[b][2-b] == O) {dia2o++} 
			};

		
			if(rowx == 3) 
				$scope.obj.winner = X;
			if(columnx == 3) 
				$scope.obj.winner = X;
			if(dia1x == 3) 
				$scope.obj.winner = X;
			if(dia2x == 3) 
				$scope.obj.winner = X;
			if(rowo == 3) 
				$scope.obj.winner = O;
			if(columno == 3) 
				$scope.obj.winner = O;
			if(dia1o == 3) 
				$scope.obj.winner = O;
			if(dia2o == 3) 
				$scope.obj.winner = O;
		};	
		$scope.obj.$save();
	};

	// $scope.reset = function () {
	// 	console.log("Before: " +  $scope.boxes);
	// 	for (var row = 0; row < $scope.boxes.length; row++) {
	// 		console.log("row: " + row);
	// 		for (var cell = 0; cell < $scope.boxes.length; cell++) {
	// 			$scope.boxes[row][cell] = null;
	// 			console.log("cell: " + cell);
	// 		};
	// 	};	
	// };

	$scope.reset = function() 
	{
		$scope.obj.boxes = [['','',''],['','',''], ['','','']];
		gameover = false;
		$scope.obj.winner = ''; 
		xTurn.turn = false;
		counter = 0;
		$scope.obj.$save();
	}	
});



