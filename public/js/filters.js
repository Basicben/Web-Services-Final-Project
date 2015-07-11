suiteApp

    .filter('sortByCategory', function() {
        // In the return function, we must pass in a single parameter which contains all the friendsList objects.
        //
        return function(friendsList, selectedCategoryList) {

            var out = [];
            var j = 0;

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
                            j++;
                        }
                    }
                    if(j == selectedCategoryList.length){
                        console.log("out.push(friend)");
                        out.push(friend);
                    }
                }
                j = 0;
            });
            return out;
        }

    })

    .filter('sortByCircle', function() {
    // In the return function, we must pass in a single parameter which contains all the friendsList objects.
    //
    return function(friendsList, selectedCircle) {

        var out = [];
        var j = 0;

        console.log("friends:",friendsList);
        console.log("selectedCircle:",selectedCircle);

        //If none of the circles were selected, than return the original friendsList
        if(selectedCircle == null || selectedCircle.length == 0){
            console.log("Returning empty friendsList because none of the circles were chosen");
            return friendsList;
        }

        //Running on friendsList array to check if someone has the same circle._id
        angular.forEach(friendsList,function(friend){
            if(friend.circles.length != 0) {
                for (var i = 0; i < friend.circles.length; i++) {
                    if(selectedCircle.indexOf(friend.circles[i].value) != -1){
                        //if HERE we found a match --> Let's push it to the new list
                        j++;
                    }
                }
                if(j == selectedCircle.length){
                    console.log("out.push(friend)");
                    out.push(friend);
                }
            }
            j = 0;
        });
        return out;
    }

});