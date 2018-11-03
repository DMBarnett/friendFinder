var friends = require("../data/friends")

module.exports = function (app){

    app.get("/api/friends", function(req, res){
        res.json("/data/friends.js");
    })
    //incoming body 
    // var userData = {
    //     name: $("#name").val(),
    //     photo: $("#photo").val(),
    //     scores: [
    //       $("#q1").val(),
    //       $("#q2").val(),
    //       $("#q3").val(),
    //       $("#q4").val(),
    //       $("#q5").val(),
    //       $("#q6").val(),
    //       $("#q7").val(),
    //       $("#q8").val(),
    //       $("#q9").val(),
    //       $("#q10").val()
    //     ]
    //   };
    app.post("/api/friends", function(req, res){
        var bestMatch = {};

        //This compares the new user against the database
        friends.forEach(element => {
            var diff = []
            var working = element.scores;

            //This builds the score difference array
            for (let i = 0; i < working.length; i++) {
                console.log("peaches")
                diff.push(Math.abs(working[i]-req.body.scores[i]));
            }
            console.log(diff);
            //min is the score summation, lower the closer to absolute friends
            var min = diff.reduce((a, b) => a + b, 0);

            //Pushes the first friend into best match so the others have a baseline
            if(!Array.isArray(bestMatch) || !bestMatch.length){
                bestMatch.name = element.name;
                bestMatch.score = min;
            }else if(bestMatch.score > min){
                //if the next person in friend array is closer to abs friend it switches them for the current match
                bestMatch.name = element.name;
                bestMatch.score = min;
            }
        });

        //now it adds the new person to the array
        friends.push(req.body);
    })
}