// requiring mongoose
var mongoose = require("mongoose");
// 
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title: {
        type: String,
        required: true
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
        required: true
    },
    type: {
        type: String,
        requiired: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

});

var Game = mongoose.model("Game", GameSchema);

module.exports = Game;



