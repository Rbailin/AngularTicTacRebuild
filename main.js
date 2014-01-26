var ticTacRef;
var IDs;
angular.module("TicTacSkate", ["firebase"])
 .controller("playerTurn", function($scope, $firebase){
 	
 	ticTacRef = new Firebase("https://skatetictac.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

	// var xTurn = {turn: false};
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



 	function xTaken() 
 	{
 		var joinedboxes = $scope.obj.boxes.join();
 		if(joinedboxes.match(X) == null)
 			return true;
 		else if(joinedboxes.match(O) == null && playerSymbol != X)
 			return true;
 		else 
 			return false;
 	}

 	function imHere ()
 	{
 		if(playerSymbol == X && $scope.obj.xTurn)
 			return true;
 		else if(playerSymbol == O && $scope.obj.xTurn == false)
 			return true;
 	}



	$scope.clickhere = function(r,c) 
	{
		if($scope.obj.winner == X || $scope.obj.winner == O)
			return gameover = true;
		if(xTaken() || imHere() && $scope.obj.boxes[r][c] != X && $scope.obj.boxes[r][c] != O && !gameover) 
		{
	
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


	$scope.reset = function() 
	{
		$scope.obj.boxes = [['','',''],['','',''], ['','','']];
		gameover = false;
		$scope.obj.winner = ''; 
		$scope.obj.xTurn  = true;
		counter = 0;
		$scope.obj.$save();
	}	
});



