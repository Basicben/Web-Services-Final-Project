suiteApp
.factory("placelocation",function(){
        var location = {};

        var changeLocation = function(newObj) {
	      	location = newObj;
	  	};

	  	var getLocation = function(){
	      	return location;
	  	};

	  	return {
	    	changeLocation: changeLocation,
	    	getLocation: getLocation
	  	};
})
.factory("friendselection",function(){
        var friends = {};

        var setFriends = function(newObj) {
	      	friends = newObj;
	  	};

	  	var getFriends = function(){
	      	return friends;
	  	};

	  	return {
	    	setFriends: setFriends,
	    	getFriends: getFriends
	  	};
})
.factory("connectedUser",function(){
        var connectedUser = {};

        var set = function(newObj) {
	      	connectedUser = newObj;
	  	};

	  	var get = function(){
	      	return connectedUser;
	  	};

	  	return {
	    	set: set,
	    	get: get
	  	};
});