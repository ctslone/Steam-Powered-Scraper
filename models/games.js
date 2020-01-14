var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newGameSchema = new.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    }
});

var topGameSchema = new.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    }
});

var currentGameSchema = new.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    }
});

var upcomingGameSchema = new.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    }
});

