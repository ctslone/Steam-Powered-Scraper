// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// models
var db = require("./models")

// Database configuration
// var databaseUrl = "steamdb";
// var collections = ["steamData"];

// server
var PORT = 3000;

// setting up static folder for public html and css AND parsing req body as JSON
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting up handlebars main view
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to mongoDB using mongoose
// db name is steamdb
mongoose.connect("mongodb://localhost/steamdb", { useNewUrlParser: true, useUnifiedTopology: true })

// root route
app.get("/", function (req, res) {
    db.Games.find({type: "top"}).then(function(showAllTop) {
        res.render("index", {Games: showAllTop})
      })
})

// new free games
app.get("/scrape", function (req, res) {
    axios.get("https://store.steampowered.com/genre/Free%20to%20Play/").then(function (response) {
        var $ = cheerio.load(response.data);

        var newGames = {};
        var topGames = {};
        var currentGames = {};
        var upcomingGames = {};
        // grabbing all new games
        $("div#NewReleasesRows").children("a.tab_item").each(function (i, element) {

            newGames.title = $(element).find("div.tab_item_name").text();
            newGames.link = $(element).attr("href");
            newGames.photo = $(element).find("img.tab_item_cap_img").attr("src");
            newGames.tags = $(element).find("span.top_tag").text();
            newGames.type = "new";
            newGames.saved = false;
            newGames.note = ""
            // insert into games array
            // newGames.push({
            //     title: title,
            //     link: link,
            //     photo: photo,
            //     tags: tags,
            //     type: "new"
            // });
            // create a new entry into the db
            db.Games.create(newGames).then(function(addNewGames) {
                // console.log(addNewGames)
            }).catch(function(err) {
                console.log(err)
            })
        });

        $("div#TopSellersRows").children("a.tab_item").each(function (i, element) {

            topGames.title = $(element).find("div.tab_item_name").text();
            topGames.link = $(element).attr("href");
            topGames.photo = $(element).find("img.tab_item_cap_img").attr("src");
            topGames.tags = $(element).find("span.top_tag").text();
            topGames.type = "top";
            topGames.saved = false;
            topGames.note = ""
            // insert into test array
            // topGames.push({
            //     title: title,
            //     link: link,
            //     photo: photo,
            //     tags: tags,
            //     type: "top"
            // });

            db.Games.create(topGames).then(function(addTopGames) {
                // console.log(addTopGames)
            }).catch(function(err) {
                console.log(err)
            })
        });
        
        $("div#ConcurrentUsersRows").children("a.tab_item").each(function (i, element) {

            currentGames.title = $(element).find("div.tab_item_name").text();
            currentGames.link = $(element).attr("href");
            currentGames.photo = $(element).find("img.tab_item_cap_img").attr("src");
            currentGames.tags = $(element).find("span.top_tag").text();
            currentGames.type = "current";
            currentGames.saved = false;
            currentGames.note = ""
            // insert into test array
            // currentGames.push({
            //     title: title,
            //     link: link,
            //     photo: photo,
            //     tags: tags,
            //     type: "current"
            // });

            db.Games.create(currentGames).then(function(addCurrentGames) {
                // console.log(addCurrentGames)
            }).catch(function(err) {
                console.log(err)
            })
        });

        $("div#ComingSoonRows").children("a.tab_item").each(function (i, element) {

            upcomingGames.title = $(element).find("div.tab_item_name").text();
            upcomingGames.link = $(element).attr("href");
            upcomingGames.photo = $(element).find("img.tab_item_cap_img").attr("src");
            upcomingGames.tags = $(element).find("span.top_tag").text();
            upcomingGames.type = "upcoming";
            upcomingGames.saved = false;
            upcomingGames.note = ""
            // insert into test array
            // upcomingGames.push({
            //     title: title,
            //     link: link,
            //     photo: photo,
            //     tags: tags,
            //     type: "upcoming"
            // });

            db.Games.create(upcomingGames).then(function(addUpcomingGames) {
                // console.log(addUpcomingGames)
            }).catch(function(err) {
                console.log(err)
            });
        });
    }).then(function() {
        res.redirect("/top");
    }); 
    
    
})

app.get("/top", function(req, res) {
    db.Games.find({type: "top"}).then(function(showAllTop) {
        res.render("index", {Games: showAllTop})
      })
});

app.get("/new", function(req, res) {
    db.Games.find({type: "new"}).then(function(showAllNew) {
        res.render("index", {Games: showAllNew})
      })
});

app.get("/current", function(req, res) {
    db.Games.find({type: "current"}).then(function(showAllCurrent) {
        res.render("index", {Games: showAllCurrent})
      })
});

app.get("/upcoming", function(req, res) {
    db.Games.find({type: "upcoming"}).then(function(showAllUpcoming) {
        res.render("index", {Games: showAllUpcoming})
      })
});

app.get("/clear", function(req, res) {
    db.Games.deleteMany({}).then(function(s) {
        res.redirect("/")
      })
});

// show all saved
app.get("/saved", function(req, res) {
    db.Games.find({saved: true}).then(function(showAllSaved) {
        res.render("saved", {Games: showAllSaved})
        console.log("saved games: " + showAllSaved)
      })
});
// updating saved value to true
app.put("/save/:id", function(req, res) {
    db.Games.updateMany({_id: req.params.id}, {$set: {saved: true}}, {multi: true}).then(function(){
        res.render("index")
    })
});
// removing saved value of true
app.put("/unsave/:id", function(req, res) {
    db.Games.updateMany({_id: req.params.id}, {$set: {saved: false}}, {multi: true}).then(function(){
        res.render("index")
    })
});
// add comment route
app.post("/addComment/:id", function(req, res) {
    // console.log("Req ID: " + req.params.id);
    // console.log("body " + req.body.note);
    db.Games.updateOne({_id: req.params.id}, {$set: {note: req.body.note}}).then(function(){
        res.render("saved")
    })
});
// get saved notes
app.get("/getNote/:id", function(req, res) {
    console.log(req.params.id)
    return db.Games.findOne({_id: req.params.id})
})

// Listen on port 3000
app.listen(PORT, function () {
    console.log("App running on port 3000!");
});