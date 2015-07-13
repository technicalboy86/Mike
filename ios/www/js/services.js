var url = "";

angular.module('starter.services', [])

.factory('Auth', function($http, Storage) {
  var objService = {
    
    signin: function(username, password){
      
    },
    signup: function(fullname, email, password, phone, isSosmed){
      var promise;
      
      promise = $http({
        method  : 'POST',
        url     : url + 'app/signup',
        data    : "fullname="+fullname+"&email="+email+"&password="+password+"&phone="+phone+"&sosmed="+isSosmed,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        var data = response.data;
        return data;
      });
      
      return promise;
    }
  };
  
  return objService;
})

.factory('ConnectionService', function() {
  var objService = {
    check: function() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 1;//'Unknown connection';
      states[Connection.ETHERNET] = 2;//'Ethernet connection';
      states[Connection.WIFI]     = 3;//'WiFi connection';
      states[Connection.CELL_2G]  = 4;//'Cell 2G connection';
      states[Connection.CELL_3G]  = 5;//'Cell 3G connection';
      states[Connection.CELL_4G]  = 6;//'Cell 4G connection';
      states[Connection.CELL]     = 7;//'Cell generic connection';
      states[Connection.NONE]     = 8;//'No network connection';
          
      return states[networkState];
    }
  };
  
  return objService;
})

.factory('Storage', function(){
  return {
    getItem: function (key) {
      return localStorage.getItem(key);
    },

    getObject: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },

    setItem: function (key, data) {
      localStorage.setItem(key, data);
    },

    setObject: function (key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },

    remove: function (key) {
      localStorage.removeItem(key);
    },

    clearAll : function () {
      localStorage.clear();
    }
  };
})
;
