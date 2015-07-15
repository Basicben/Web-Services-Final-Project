suiteApp
/***************************
 *  SignUp Controller
 ***************************/
.controller('signupCntrl', function($scope,$rootScope)  {

	$scope.facebookInsert = function(){
		$scope.$parent.angFacebookLogin();
	};
     
})

/***************************
 *  Home Controller
 ***************************/
.controller('homeCntrl', function($scope,$rootScope) {
     
})

/***************************
 *  Welcome Controller
 ***************************/
.controller('welcomeCntrl', function($scope,$rootScope,$location,connectedUser) {
     
    console.log('welcomeCntrl');

    $scope.enterApp = function(){
    	if(connectedUser.get() != null && !connectedUser.get().userObject.isNew){
    		$location.path('home');
    	}
        if(connectedUser.get().userObject.isNew){
            $location.path('guide');
        }
    }
     
})

/***************************
 *  myFriends Controller
 ***************************/
.controller('myFriendsCntrl', function($scope,$rootScope,$http,connectedUser) {
        console.log('myFriendsCntrl');

        $scope.friendList = connectedUser.get().userObject.friendsList;
        $scope.categoryList = [];
        $scope.selectedCategoryList = [];

        $scope.addRemoveCategory = function(category,index){
            //push into a new array the ID of the category and the userFriendId
            category.IsSelected = !category.IsSelected;
            // if selected is true -> push to array.
            // if false, delete this category from array.
            if(category.IsSelected){
                $scope.selectedCategoryList.push(category._id);
            }
            else{
                // splice
                $scope.selectedCategoryList.splice($scope.selectedCategoryList.indexOf(category),1);
            }
        };

        //Sorting display of friends from categorized friends to uncategorized friends
        $scope.nullsCategoriesToBottom = function(obj) {
            if(obj.categories.length != 0){
                return -1;
            }
            else{
                return 0;
            }
        };

        $scope.addRemoveCategory = function(category,index){
                //push into a new array the ID of the category and the userFriendId
            category.IsSelected = !category.IsSelected;
                // if selected is true -> push to array.
                // if false, delete this category from array.
            if(category.IsSelected){
                $scope.selectedCategoryList.push(category._id);
            }
            else{
                    // splice
                $scope.selectedCategoryList.splice($scope.selectedCategoryList.indexOf(category),1);
            }
        };

        var lastIndex = -1;
        $scope.selectFriend = function(friend,index,$event){
            friend.IsSelected = !friend.IsSelected;
            var clickedElement = $event.currentTarget;
            if(friend.IsSelected){
                var elm = $('.width30');
                if(elm && lastIndex != -1){
                    elm.removeClass('width30');
                    $scope.friendList[lastIndex].IsSelected = false;
                }
                lastIndex =  index;
                $(clickedElement).find('.friend-select').addClass('width30');
                $scope.pickCategories(friend);
            }
            else{
                lastIndex =  -1;
                $(clickedElement).find('.friend-select').removeClass('width30');
                $scope.clearCategories();
            }
        }

        $scope.clearCategories = function(){
            $scope.categoryList.forEach(function(c){
                c.IsSelected = false;
                $scope.selectedCategoryList = [];
            })
        }

        $scope.pickCategories = function(friend){
            $scope.clearCategories();
            friend.categories.forEach(function(val,key){
                $scope.categoryList.forEach(function(category){
                    if(val == category._id){
                        category.IsSelected = true;
                        $scope.selectedCategoryList.push(category._id);
                    }
                });
            });
            console.log('$scope.selectedCategoryList',$scope.selectedCategoryList)
        }

        //Page reload for the first time
        $(document).ready(function(){
            // make api call to bring user's friends

                $http.post(window.location.origin + '/api/getCategories').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        //console.log('Success : data', data);
                        
                        // if user has signed up or not
                        if(data == null){
                            //$location.path('signup');
                            console.log('(data = null) in getCategories:');
                        }else{
                            $scope.categoryList = data;
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
                        //$location.path('signup');
                    });
        });
})

/***************************
 *  suitMyFriends Controller
 ***************************/
.controller('suitmyfriendsCntrl', function($scope,$rootScope,$http,connectedUser) {

        $scope.friendIndex = 0;
        $scope.lastCateogryName = '';
        $scope.friendList = [];
        $scope.categoryList = [];
        $scope.categoriazedFriend = {
            UserId:connectedUser.get()._id,
            FriendId:0,
            Categories:[]
        };


        //Wipe function
        $("#friendPictureSection").wipetouch({
            tapToClick: true, // if user taps the screen, triggers a click event
            wipeLeft: function() {

                var friend = $scope.friendList[$scope.friendIndex];
                $scope.categoriazedFriend.FriendId = friend.id;
                $scope.disSelectAllCategories();

                if($scope.categoriazedFriend.Categories.length != 0) {
                    $scope.friendList.splice($scope.friendList.indexOf(friend),1);
                    $scope.sendObjOfUserCategoryFriend($scope.categoriazedFriend);
                    $scope.$apply();
                }
                else{
                    console.log("Nothing was insert!");
                }

                if($scope.friendIndex < $scope.friendList.length - 1){
                    if($scope.friendList.length == 1)
                        $scope.friendIndex = 0;
                    else
                        $scope.friendIndex++;
                }
                else{
                    $scope.friendIndex = 0;
                }

                $scope.clearcategoriazedFriendObj();
                $scope.$apply();
            },
            wipeRight: function() {
                var friend = $scope.friendList[$scope.friendIndex];
                $scope.categoriazedFriend.FriendId = friend.id;
                $scope.disSelectAllCategories();

                if($scope.categoriazedFriend.Categories.length != 0) {
                    $scope.friendList.splice($scope.friendList.indexOf(friend),1);
                    $scope.sendObjOfUserCategoryFriend($scope.categoriazedFriend);
                    $scope.$apply();
                }
                else{
                    console.log("Nothing was insert!");
                }

                if($scope.friendIndex < $scope.friendList.length - 1){
                    if($scope.friendList.length == 1)
                        $scope.friendIndex = 0;
                    else
                        $scope.friendIndex++;
                }
                else{
                    $scope.friendIndex = 0;
                }

                $scope.clearcategoriazedFriendObj();
                $scope.$apply();
            }
        });

        //Pushing selected categories to a new obj.array
        $scope.selectCategory = function(category,$e){

            if($e.originalEvent != null) return;
            if ($e) $e.stopImmediatePropagation();
            //push into a new array the ID of the category and the userFriendId
            category.IsSelected = !category.IsSelected;
            // if selected is true -> push to array.
            // if false, delete this category from array.
            if(category.IsSelected){
                $scope.categoriazedFriend.Categories.push(category);
                $scope.lastCateogryName = category.Name;
            }
            else{
                $scope.categoriazedFriend.Categories.splice($scope.categoriazedFriend.Categories.indexOf(category),1);
            }

            console.log('selectCategory',$scope.categoriazedFriend,category);

        };

        //Disselect all categories
        $scope.disSelectAllCategories = function(){
            angular.forEach($scope.categoryList, function(value){
                if(value.IsSelected){
                    value.IsSelected = false;
                }
            });
            $scope.$apply();
        };

        //Disselect all categories
        $scope.clearcategoriazedFriendObj = function(){
            $scope.categoriazedFriend.FriendId = 0;
            $scope.categoriazedFriend.Categories = [];
        };

        //Sending the new object(categoriazedFriends[userId,friendId,categories]) to server
        $scope.sendObjOfUserCategoryFriend = function(obj){
            $http.post(window.location.origin + '/api/userCategoryFriendInsert',{categoriazedFriend : obj}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //After sending the new categorized friend into the DB, update the friendList
                    $scope.updateFriendsList();
                    // if user has signed up or not
                    if(data == null){
                        console.log('(data = null) in userCategoryFriendInsert:');
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
                    //$location.path('signup');
                });
        };

        //Updating the friendList
        $scope.updateFriendsList = function(){
            connectedUser.update();
        };

        //Updating the friendList
        $scope.clearCategorizedFriends = function() {
            $scope.friendList = [];
            connectedUser.get().userObject.friendsList.forEach(function(friend){
                if(friend.categories.length == 0){
                    $scope.friendList.push(friend);
                }
            });
        };
/*************             First load of the page                ********/


        $(document).ready(function(){

            

            $scope.clearCategorizedFriends();
            if($scope.friendList.length == 0){
                console.log("There is no more friends to categorized! Well Done!");
            }

            $http.post(window.location.origin + '/api/getCategories').
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    // if user has signed up or not
                    if(data == null){
                        console.log('(data = null) in getCategories:');
                    }else{
                        $scope.categoryList = data;
                        console.log(data);
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
                    //$location.path('signup');
                });

        });
})

/***************************
 *  inviteFriends Controller
 ***************************/
.controller('inviteFriendsCntrl', function($scope,$rootScope,$http,invitation,connectedUser) {

        $scope.friendList = connectedUser.get().userObject.friendsList;
        $scope.selectedFriends = [];
        $scope.selectedCategoryList = [];
        $scope.categoryList = [];

        $scope.invitation = {
            name: null,
            placeName: null,
            friends:null
        };

        $scope.autoComplete = {
            value: null,
            details: {},
            options: {
                types: 'establishment',
                country: 'isr'
            }
        };

        $scope.autoCompleteTemplate = '';

        // Watch for Landmark input.
        $scope.$watch('autoComplete.details', function (n, o) {
            console.log('n',n);
            $scope.autoComplete.value = n;
            if(!jQuery.isEmptyObject(n)){
                var location = $scope.autoComplete.value.geometry.location;
                $scope.markers['marker1'] = {
                    lat: location[Object.keys(location)[0]],
                    lng: location[Object.keys(location)[1]],
                    message: n.formatted_address,
                    focus: true,
                    draggable: false
                };

                $scope.center = {
                    lat: location[Object.keys(location)[0]],
                    lng: location[Object.keys(location)[1]],
                    zoom: 12
                }
            }
        });

        angular.extend($scope, {
            center: {
                lat: 32.066158,
                lng: 34.777819,
                zoom: 12
            },
            markers: {

            },
            defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.addRemoveCategory = function(category,index){
                //push into a new array the ID of the category and the userFriendId
            category.IsSelected = !category.IsSelected;
                // if selected is true -> push to array.
                // if false, delete this category from array.
            if(category.IsSelected){
                $scope.selectedCategoryList.push(category._id);
            }
            else{
                    // splice
                $scope.selectedCategoryList.splice($scope.selectedCategoryList.indexOf(category),1);
            }
        };

        $scope.sendInvitation = function(){
            if($scope.autoComplete.value == null || $scope.autoComplete.value.formatted_address == null) {
                swal({
                    title: "Oops..",
                    text: "You forgot to enter a place",
                    timer: 2000,
                    showConfirmButton: false });
                return;
            }

            $scope.autoCompleteObj = {
                address_components: $scope.autoComplete.value.address_components,
                adr_address: $scope.autoComplete.value.adr_address,
                formatted_address: $scope.autoComplete.value.formatted_address,
                geometry: $scope.autoComplete.value.geometry,
                name: $scope.autoComplete.value.name,
                id: $scope.autoComplete.value.id,
                types: $scope.autoComplete.value.types,
                place_id: $scope.autoComplete.value.place_id,
            }

            console.log('$scope.autoCompleteObj',$scope.autoCompleteObj);

            invitation.changeLocation($scope.autoCompleteObj);
            $scope.$parent.changeURL('selectfriends');
        };

        $scope.selectFriend = function(friend){
            friend.IsSelected = !friend.IsSelected;
            if(friend.IsSelected){
                // If here, Push object to array
                $scope.selectedFriends.push(friend);
            }else{
                // If here, Delete object from array
                $scope.selectedFriends.splice($scope.selectedFriends.indexOf(friend),1);
            }
        };

        $scope.chooseWithMe = function(){
            invitation.setWithMe($scope.selectedFriends);
            $('.withme-wrapper').removeClass('height100');
        };

        $scope.addRemoveWithMe = function(){
            var obj = $('.withme-wrapper');
            if(obj.hasClass('height100')){
                obj.removeClass('height100');
            }else{
                obj.addClass('height100');
                if($scope.friendList.length <= 0){
                    $scope.friendList = connectedUser.get().userObject.friendsList;
                }
            }
        };


    $(document).ready(function(){
        $http.post(window.location.origin + '/api/getCategories').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        
                        // if user has signed up or not
                        if(data == null){
                            //$location.path('signup');
                            console.log('(data = null) in getCategories:');
                        }else{
                            $scope.categoryList = data;
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
                        //$location.path('signup');
                    });
    });
})

/***************************
 *  selectFriends Controller
 ***************************/
.controller('selectFriendsCntrl', function($scope,$rootScope,$http,invitation,connectedUser){

        // Array contains selected friends we would like to send the invitation to.
        $scope.selectedFriends = [];
        $scope.selectedCategoryList = [];
        $scope.categoryList = [];
        $scope.selectedCircle = [];
        $scope.selectedUsers = [];

        //This function checks if there an object in an array
        $scope.containsObject = function(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (angular.equals(list[i], obj)) {
                return true;
            }
        }

        return false;
    };

    $(document).ready(function () {
        // Array contains friend list.
        $scope.friendList = connectedUser.get().userObject.friendsList;

        $scope.circleList = [];
        // Array contains circles types.
        $scope.friendList.forEach(function(value,key){
            if(value.circles != null && value.circles.length > 0){
                value.circles.forEach(function(cValue,key){
                    
                    var obj = {
                        value:cValue.value,
                        IsSelected:false
                    };

                    if( !$scope.containsObject(obj,$scope.circleList) )
                        $scope.circleList.push(obj);
                });
            }

        });


        $http.post(window.location.origin + '/api/getCategories').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        
                        // if user has signed up or not
                        if(data == null){
                            //$location.path('signup');
                            console.log('(data = null) in getCategories:');
                        }else{
                            $scope.categoryList = data;
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
                        //$location.path('signup');
                    });

    });    


        $scope.selectFriend = function(friend){
            friend.IsSelected = !friend.IsSelected;
            if(friend.IsSelected){
                // If here, Push object to array
                $scope.selectedFriends.push(friend);
            }else{
                // If here, Delete object from array
                $scope.selectedFriends.splice($scope.selectedFriends.indexOf(friend),1);
            }
        };

        $scope.addRemoveCategory = function(category,index){
                //push into a new array the ID of the category and the userFriendId
            category.IsSelected = !category.IsSelected;
                // if selected is true -> push to array.
                // if false, delete this category from array.
            if(category.IsSelected){
                $scope.selectedCategoryList.push(category._id);
            }
            else{
                    // splice
                $scope.selectedCategoryList.splice($scope.selectedCategoryList.indexOf(category),1);
            }
        };

        $scope.selectCircle = function(circle){
            circle.IsSelected = !circle.IsSelected;
            if(circle.IsSelected){
                // If here, Push object to array
                $scope.selectedCircle.push(circle.value);
            }else{
                // If here, Delete object from array
                $scope.selectedCircle.splice($scope.selectedCircle.indexOf(circle.value),1);
            }
        };

        $scope.selectAll = function(){
            if($scope.selectedFriends.length == $scope.friendList.length){
                $scope.unsellectAll();
                return;
            }

            angular.forEach($scope.friendList, function(friend){
                if(friend.IsSelected == false){
                    friend.IsSelected = true;
                    $scope.selectedFriends.push(friend);
                }
            });
        };

        $scope.unsellectAll = function(){
            angular.forEach($scope.friendList, function(friend){
                if(friend.IsSelected == true){
                    friend.IsSelected = false;
                    $scope.selectedFriends.splice($scope.selectedFriends.indexOf(friend),1);
                }
            });
        };

        $scope.sendAll = function(){
            if($scope.selectedFriends == null || $scope.selectedFriends.length <= 0){
              swal({
                  title: "Oops..",
                  text: "You forgot to invite friend/s",
                  timer: 2000,
                  showConfirmButton: false });

              return;
            }

            // Add selected friend object to factory object so it would be reachable from all controllers
            invitation.setInviteFriends($scope.selectedFriends);
            // Transfer to Invitation Page
            $scope.$parent.changeURL('invitation');


        }

        $scope.toggleCircle = function(){
            $( "#circles-wrapper" ).toggle( "fast", function() {
                // Animation complete.
            });
        }

        $scope.toggleCategory = function(){
            $( "#category-wrapper" ).toggle( "fast", function() {
                // Animation complete.
            });
        }
})

/***************************
 *  invitations Controller
 ***************************/
.controller('invitationsCntrl', function($scope,$rootScope,$http,invitation,connectedUser){

    $scope.eventLocation = invitation.getLocation();
    $scope.invitedFriendList = invitation.getInviteFriends();
    $scope.withMeList = invitation.getWithMe();
    $scope.showFriends = false;
    
    $scope.showHideFriends = function(){
        if($scope.showFriends){
            $('.friendsInvited-wrapper').removeClass('height100');
            $scope.showFriends = false;
        }else{
            $('.friendsInvited-wrapper').addClass('height100');
            $scope.showFriends = true;
        }
    };

    $scope.dontInvite = function(friendObj){
        invitation.deleteFriendInvitation(friendObj);
    };

    $scope.clearInvitation = function(){
        invitation.clearInvitation();
        $scope.$parent.changeURL('home');
    };

    $scope.invitation = {
        UserId:null,
        eventLocation:null,
        invitedFriendList:null,
        withMeList:null
    };

    $scope.sendInvitation = function(){
        // invitationObj HTTP POST
        $scope.invitation.UserId = connectedUser.get()._id;
        $scope.invitation.eventLocation = $scope.eventLocation;
        $scope.invitation.invitedFriendList = $scope.invitedFriendList;
        $scope.invitation.withMeList = $scope.withMeList;

        $http.post(window.location.origin + '/api/userEventInsert', { invitationObj: $scope.invitation } ).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    invitation.clearInvitation();
                    $scope.$parent.changeURL('home');
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('Error : data', data);
                    console.log('Error : status', status);
                    console.log('Error : headers', headers);
                    console.log('Error : config', config);
                    // Redirect user back to login page
                    //$location.path('signup');
                });

        

    }

}).controller('guideCntrl', function($scope,$rootScope,$http,connectedUser){

    $scope.carouselIndex = 0;
    $scope.categoryList = [];
    $scope.templates = [
        { id:1, templateUrl:'../templates/guide/1.html' },
        { id:2, templateUrl:'../templates/guide/2.html' },
        { id:3, templateUrl:'../templates/guide/3.html' },
        { id:4, templateUrl:'../templates/guide/4.html' },
    ]

        $(document).ready(function () {
            $http.post(window.location.origin + '/api/getCategories').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        
                        // if user has signed up or not
                        if(data == null){
                            //$location.path('signup');
                            console.log('(data = null) in getCategories:');
                        }else{
                            $scope.categoryList = data.categoryObj;
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
                        //$location.path('signup');
                    });
        });

    

});


