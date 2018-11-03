var friends = require("../data/friends")

module.exports = function (app){
    //simple json return
    app.get("/api/friends", function(req, res){
        res.json(friends);
    })

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
                bestMatch.ret = element;
                console.log(bestMatch);
                console.log("Alien");
            }else if(bestMatch.score > min){
                console.log("fighter");
                //if the next person in friend array is closer to abs friend it switches them for the current match
                bestMatch.name = element.name;
                bestMatch.score = min;
                bestMatch.ret = element;
            }
        });
        res.json(bestMatch.ret);
        //now it adds the new person to the array
        friends.push(req.body);
    })
}