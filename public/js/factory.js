suiteApp
.factory("invitation",function(){
        var location = {};
        var friends = {};
        var friendsWithMe = {};

        var changeLocation = function(newObj) {
	      	location = newObj;
	  	};

	  	var getLocation = function(){
	      	return location;
	  	};

	  	var setInviteFriends = function(newObj) {
	      	friends = newObj;
	  	};

	  	var getInviteFriends = function(){
	      	return friends;
	  	};

	  	var setWithMe = function(newObj) {
	      	friendsWithMe = newObj;
	  	};

	  	var getWithMe = function(){
	      	return friendsWithMe;
	  	};

	  	var clearInvitation = function(){
	  		friends, friendsWithMe, location = {};
	  	}

	  	var deleteFriendInvitation = function(obj){
	  		friends.splice(friends.indexOf(obj),1);
	  	}

	  	return {
	    	changeLocation: changeLocation,
	    	getLocation: getLocation,
	    	setInviteFriends: setInviteFriends,
	    	getInviteFriends: getInviteFriends,
	    	setWithMe: setWithMe,
	    	getWithMe: getWithMe,
	    	clearInvitation: clearInvitation,
	    	deleteFriendInvitation: deleteFriendInvitation
	  	};
}).factory("connectedUser",function(){
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