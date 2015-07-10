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
        var connectedUser = null;

        var set = function(newObj) {
        	if(connectedUser != null)
        		return;
	      	connectedUser = newObj;
	  	};

	  	var get = function(){
	      	return connectedUser;
	  	};

	  	var update = function(){
	  		http.post(window.location.origin + '/api/getUser', { userId: connectedUser._id } ).
                  success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('Success : data', data);
                    if(data == null){
                        console.log('could not update', data);
                    }else{
                        connectedUser = data;
                    }

                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('Error : data', data);
                    console.log('Error : status', status);
                    console.log('Error : headers', headers);
                    console.log('Error : config', config);
                    // Redirect user back to login page
                  });
	  	}

	  	return {
	    	set: set,
	    	get: get,
	    	update: update
	  	};
});