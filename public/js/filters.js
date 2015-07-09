suiteApp
    .filter('sortByCategory', function() {
        // In the return function, we must pass in a single parameter which contains all the friendsList objects.
        //
        return function(friendsList, selectedCategoryList) {

            var out = [];

            console.log("friends:",friendsList);
            console.log("selectedCategoryList:",selectedCategoryList);

            //If none of the categories were selected, than return the original friendsList
            if(selectedCategoryList == null || selectedCategoryList.length == 0){
                console.log("Returning empty friendsList");
                return friendsList;
            }

            //Running on friendsList array to check if someone has the same category._id
            angular.forEach(friendsList,function(friend){
                if(friend.categories.length != 0) {
                    for (var i = 0; i < friend.categories.length; i++) {
                        if(selectedCategoryList.indexOf(friend.categories[i]) != -1){
                            //if HERE we found a match --> Let's push it to the new list
                            out.push(friend);
                        }
                    }
                }
            });
            return out;
        }

    });