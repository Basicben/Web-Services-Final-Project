// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    makeApiCalls();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('not_authorized');
    return null;
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log('Please log into Facebook');
    return null;
  }
}

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1624886064424328',
    cookie     : true,  // enable cookies to allow the server to access 
                          // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  //FB.getLoginStatus(function(response) {
  //  statusChangeCallback(response);
  //});

  };

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
var makeApiCalls = function(callback){
  var i =0;
  var friendList = [];
  FB.api('/me', function(response) {
      USER = response;
      FB.api('/' + response.id + '/picture?height=38', function (smallResponse) {
        USER.smallProfilePicture = smallResponse.data.url;
        FB.api('/' + response.id + '/picture?height=200', function (mediumResponse) {
          USER.mediumProfilePicture = mediumResponse.data.url;


          FB.api('/me/friends?fields=id,name,gender,picture{url},hometown,work', function(response) {
          
            console.log('response',response);
            friendList = response;
            callback(friendList);

          });

        });
      });
  });
}



var getUserFriendsFromFB = function(friends,pushFriend){
    
    console.log('friends',friends);
    
}

var facebookLogin = function(callback){
  FB.login(function(response) {
    // handle the response
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      makeApiCalls(callback)
    } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    }
  }, {scope: 'public_profile,email,user_friends,user_hometown,user_location,user_birthday'});  
}

var getUser = function(){
  return USER;
}
