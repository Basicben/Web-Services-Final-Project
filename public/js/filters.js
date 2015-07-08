suiteApp
    .filter('sortByCategory', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(friend, selectedCategoryList) {
    console.log('sortByCategory !!!!!!!!!!!!!!!!!!!!!!');
      if(selectedCategoryList == null || selectedCategoryList.length == 0)
        return friend;

        if(friend.Categories.length != 0) {
          for (var i = 0; i < friend.Categories.length; i++) {
              if(selectedCategoryList.indexOf(friend.Categories[i]._id) != -1){
                  return friend;
              }
          }
      }
      return false;
  }

});