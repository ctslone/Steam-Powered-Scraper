// on click of the save button, need to change the salved value to true and then reload the page
$(document).ready(function() {
    console.log("ready");

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
        console.log("comment btn")
    })
})

