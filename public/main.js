// on click of the save button, need to change the salved value to true and then reload the page
$(document).ready(function() {
    console.log("ready");
    var savedID;

    $("input#savedCheck").on("click", function() {
        console.log($(this).data("_id"));
        thisId = $(this).data("_id");

        console.log($(this).is(":checked"))
        if ($(this).is(":checked")) {
            updateSaveTrue(thisId)
        }
        else {
            updateSaveFalse(thisId)
        }  
    })

    function updateSaveTrue (thisId) {
        var updateSave = {
            saved: true
        }

        $.ajax({
            method: "PUT",
            url: "/save/" + thisId,
            data: updateSave,
        }).then(function(data) {
            console.log("ajax save")
        })
    }

    function updateSaveFalse (thisId) {
        var updateSave = {
            saved: false
        }

        $.ajax({
            method: "PUT",
            url: "/unsave/" + thisId,
            data: updateSave,
        }).then(function(data) {
            console.log("ajax remove save")
        })
    }

    $(".comment").on("click", function() {
        console.log("comment btn");
        savedID = $(this).attr("data-_id");
        console.log(savedID)
    })

    $(".saved-btn").on("click", function() {
        // use the savedID global variable to make an ajax call to post a comment to the game with the id of the savedID
        var comment = {
            comment: ()
        };

        $.ajax({
            method: "POST",
            url: "/addComment/" + savedID,
            data: comment,
        }).then(function(data) {
            console.log("comment added to DB")
        })
    })
})

