// on click of the save button, need to change the salved value to true and then reload the page
$(document).ready(function() {
    console.log("ready");
    var savedID;

    //  statement for on load if a card is saved and for checking the saved box and running the update saved value functions
    $("input#savedCheck").on("click", function() {
        console.log($(this).data("_id"));
        thisId = $(this).data("_id");

        console.log($(this).is(":checked"))
        if ($(this).is(":checked")) {
            updateSaveTrue(thisId);
            $(this).closest(".card").addClass("saved-glow");
        }
        else {
            updateSaveFalse(thisId);
            $(this).closest(".card").removeClass("saved-glow");
            location.reload()
        }  
    })
    // updates the select game's saved value to true
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
    // updates the game's saved value to false
    function updateSaveFalse (thisId) {
        var updateSave = {
            saved: false,
            note: []
        };

        $.ajax({
            method: "PUT",
            url: "/unsave/" + thisId,
            data: updateSave,
        }).then(function(data) {
            console.log("ajax remove save")
        })
    }
    // saving the unique id to the global varibale to be used for comments
    $(".comment").on("click", function() {
        console.log("comment btn");
        savedID = $(this).attr("data-_id");
        console.log("saved ID " + savedID)
        getNotes(savedID);
    });
    // post ajax request to the comment route. each comment is added to the note array of the associated comment
    $(document).on("click", ".save-btn", function() {
        console.log("saved btn log for ID" + savedID);
        var note = {
            note: [$("#commentInput").val()]
        };

        $.ajax({
            method: "POST",
            url: "/addComment/" + savedID,
            data: note,
        }).then(function(data) {
            location.reload()
            console.log("note added to DB")
        });
    });
    // remove note by grabbing the games unique id and the data id of the note (the note text) and doing a put request to the delete comment route
    $(document).on("click", ".delete-comment-btn", function() {
        savedID = $(this).closest("div.notes").attr("data-_id");
        noteToDelete = $(this).closest("p.note").attr("data-id");
        console.log("del ID " + savedID);
        console.log("note text " + noteToDelete)
        var note = {
            note: noteToDelete
        }
        $.ajax({
            method: "PUT",
            url: "/deleteComment/" + savedID,
            data: note
        }).then(function(data) {
            location.reload()
            console.log("deleted note in DB")
        });
    })

    // function for grabbing all saved notes
    function getNotes(savedGameID) {
        $.ajax({
            url: "/getNote/" + savedGameID,
            type: "GET"
          }).then(function(data) {
              console.log(data)
          })
    }
})

