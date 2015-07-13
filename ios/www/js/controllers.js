angular.module('starter.controllers', [])

.controller('AddDogCtrl', function($scope, $ionicActionSheet,$ionicViewSwitcher, $state, $timeout, $ionicLoading, Storage) {
  $scope.dog = {img:"img/add_dog.png", name:"", age:"", breed:""};
  
  $scope.add_dog = function(){
	var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'From Camera' },
       { text: 'From Library' }
     ],
     titleText: 'Take a Photo',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
            if (index == 0) {
                  console.log($scope.dog);
                  navigator.camera.getPicture(function(imageData){
                     $scope.dog.img = "data:image/jpeg;base64,"+imageData;
                     $scope.$apply();
                  }, function(error){
                        console.log(error);            
                  }, { quality: 50, sourceType:Camera.PictureSourceType.CAMERA, destinationType: Camera.DestinationType.DATA_URL, targetWidth:300, targetHeight:300});

            }else{
                  navigator.camera.getPicture(function(imageData){
                     $scope.dog.img = imageData;
                     $scope.$apply();
                  }, function(error){
                        console.log(error);            
                  }, { quality: 50, sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI, targetWidth:300, targetHeight:300});
            }
      
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
    // hideSheet();
   }, 2000);
  };

  $scope.goDogs = function(){
		$ionicLoading.show();
		$timeout(function(){
			$ionicLoading.hide();
			$state.go("dogs");
		}, 500);
  };

  $scope.showAlert = function(title, template) {
      title = title!=""?title+" : ":title;
      window.plugins.toast.showLongTop(title +template);
  };
})

.controller('DogsCtrl', function($scope, $state) {
	 $scope.doRefresh = function(){
		$scope.$broadcast('scroll.refreshComplete');
	 };

	 $scope.goAddDogs = function(){
		$state.go("add_dog");
	 }
	 
	 $scope.gotoDetail = function(){
		$state.go("dog_detail");
	 };
})

.controller('DogDetailCtrl', function($scope, $ionicHistory, $timeout) {
	$scope.goBack = function(){
		$ionicHistory.goBack(); 
	};

	$scope.showDetail = false;
	$scope.goDetailTxt = function(){
		$scope.showDetail = true;
	};
	$scope.goGraph = function(){
		$scope.showDetail = false;
		$timeout(function(){
			drawChart();		
		});
	};
	
	var drawChart = function(){
		var options = {
			title: {
				text: "WED June 26th 2015",
				fontColor:"#fff"
			},
			theme: "theme1",
			animationEnabled: true,
			axisY:{
				lineColor: "#d07101",
				lineDashType: "dot",
				gridColor: "#f69544",
				labelFontColor: "#f69544",
				tickColor: "#d07101",
			},
			axisX:{
				lineColor: "#d07101",
				lineDashType: "dot",
				gridColor: "#9e6333",
				labelFontColor: "white",
				tickColor: "#d07101",
				valueFormatString: "HH TT" ,
			},
			data: [
			{
				type: "line", //change it to line, area, column, pie, etc
				color:"#fff",
				dataPoints: [

					{ x: new Date("Sun Feb 03 2013 09:04:09"), y: 10},       
					{ x: new Date("Sun Feb 03 2013 10:05:09"), y: 20 }, 
					{ x: new Date("Sun Feb 03 2013 11:06:09"), y: 30 }, 
					{ x: new Date("Sun Feb 03 2013 16:07:09"), y: 10}, 
					{ x: new Date("Sun Feb 03 2013 17:04:09"), y: 21}, 
					{ x: new Date("Sun Feb 03 2013 18:04:09"), y: 50} ,
					{ x: new Date("Sun Feb 03 2013 19:06:09"), y: 30 }, 
					{ x: new Date("Sun Feb 03 2013 20:07:09"), y: 10}, 
					{ x: new Date("Sun Feb 03 2013 21:04:09"), y: 21}, 
					{ x: new Date("Sun Feb 03 2013 22:04:09"), y: 50} ,
					
				]
			}
			],
			backgroundColor: "#f69544"
		};

		var chart = new CanvasJS.Chart("chartContainer",options);
		
		chart.render();	

		$('#chartContainer').css('background-color', 'rgba(158, 167, 184, 0.2)');
	};

	$timeout(function(){
		drawChart();		
	});
})
;
