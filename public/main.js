// on click of the save button, need to change the salved value to true and then reload the page
$(document).ready(function() {
    console.log("ready");
    var savedID;

    //  statement for on load if a card is saved

    $("input#savedCheck").on("click", function() {
        console.log($(this).data("_id"));
        thisId = $(this).data("_id");
        // currentCard = 

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
        };

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
        console.log("saved ID " + savedID)
        getNotes(savedID);
    });

    $(document).on("click", ".save-btn", function() {
        // use the savedID global variable to make an ajax call to post a comment to the game with the id of the savedID
        console.log("saved btn log for ID" + savedID);
        // var noteArray = [];
        // target the note container id and then find the child with the class of note, push the child to the note array and then the note key in the note object will become note array
        // var noteDiv = $(this).closest("h5.modal-title").text();
        // console.log(noteDiv)
        // handlebars will render a new note for each note in the note array inside the notes card
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
    // remove note
    $(document).on("click", ".delete-comment-btn", function() {
        savedID = $(this).closest("div.notes").attr("data-_id");
        noteToDelete = $(this).closest("p.note").text();
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

