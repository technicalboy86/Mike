// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, Storage) {
  $ionicPlatform.ready(function() {
    
  });

  $rootScope.$on('$stateChangeStart', function (event, next) {
/*
    if(first){
      first = false;
      var mUser = Storage.getObject("user");
      if (mUser.userid != null && mUser.userid != "") {
        //$location.path("/collect");
        //return;
      }
      console.log(mUser);
    }  
*/
	var nextPath = next.url;

    currentPath = "/app/tabs" + nextPath;
	$rootScope.currentPath = currentPath;
  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.tabs.style("standard");
  
  $stateProvider

  .state('add_dog', {
    url: "/add_dog",
    templateUrl: "templates/add_dog.html",
    controller: 'AddDogCtrl',
    cache:false
  })
 
  .state('app', {
    url: "/app",
	abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabsCtrl',
  })
  
  
  .state('dogs', {
    url: "/dogs",
	templateUrl: "templates/dogs.html",
    controller: 'DogsCtrl',
    cache:false
  })
	
  .state('dog_detail', {
    url: "/dog_detail",
	templateUrl: "templates/dog_detail.html",
    controller: 'DogDetailCtrl',
    cache:false
  })
	;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/add_dog');
}).directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function(value){
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});
