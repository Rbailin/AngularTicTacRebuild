function playerTurn ($scope) {
// 	//do something
	
// 	$scope.xTurn.val = true
	$scope.boxes = [['','',''],['','',''], ['','','']];
	var xTurn = {var: false};
	var gameover = false;
	var X = "skatedog.jpeg";
	var O = "UndieSkate.jpg";
	

	$scope.clickhere = function(r,c) {
		if($scope.winner == X || $scope.winner == O){
			return gameover = true;
		}
			if($scope.boxes[r][c] != X || $scope.boxes[r][c] != O && !gameover) {
			if(xTurn.var = !xTurn.var)
				$scope.boxes[r][c] = X;
			else
				$scope.boxes[r][c] = O;
		}
	}

	$scope.winningPlayer = function () {	

		for(a=0; a < 3; a++) {
			
			var rowx = 0; var rowo = 0;
			var columnx = 0;  var columno = 0;
			var dia1x = 0;  var dia1o = 0;
			var dia2x = 0;  var dia2o =0; 

			for(b=0; b<3; b++){
				
				if($scope.boxes[a][b] == X) {rowx++} 
				
				if($scope.boxes[b][a] == X) {columnx++} 
				
				if($scope.boxes[b][b] == X) {dia1x++}

				if($scope.boxes[b][2-b] == X) {dia2x++}

				
				if($scope.boxes[a][b] == O) {rowo++}

				if($scope.boxes[a][b] == O) {columno++}
				
				if($scope.boxes[a][b] == O) {dia1o++}
				
				if($scope.boxes[b][2-b] == O) {dia2o++} 
			};

		
			if(rowx == 3) 
				$scope.winner = X;
			if(columnx == 3) 
				$scope.winner = X;
			if(dia1x == 3) 
				$scope.winner = X;
			if(dia2x == 3) 
				$scope.winner = X;
			if(rowo == 3) 
				$scope.winner = O;
			if(columno == 3) 
				$scope.winner = O;
			if(dia1o == 3) 
				$scope.winner = O;
			if(dia2o == 3) 
				$scope.winner = O;
		};	

			
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

	$scope.reset = function() {
		$scope.boxes = [['','',''],['','',''], ['','','']];
	}	
};



