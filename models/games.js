// requiring mongoose
var mongoose = require("mongoose");
// 
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    saved: {
        type: Boolean,
        required: true
    }

});

// GameSchema.methods.updateSaved = function() {
//     this.saved = true;
//     return this.saved;
// }

var Game = mongoose.model("Game", GameSchema);

module.exports = Game;



