var Promise = require("bluebird")
var express = require('express')
var app = express();
var google = require('googleapis');

// OAuth2 initialization
var OAuth2 = google.Auth.OAuth2Client
var oauth2Client = new OAuth2("336509556446-ffvj8gtja73ohh68k1e8stf3ci5mlo0n.apps.googleusercontent.com", "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", "http://localhost:3000/oauth2callback");
oauth2Client.getToken = Promise.promisify(oauth2Client.getToken)



// Login route
app.get('/google', function (req, res) {
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ["https://www.googleapis.com/auth/display-video" , "https://www.googleapis.com/auth/userinfo.profile"]
    })
    res.redirect(url);
    // console.log(oauth2Client.credentials);
});


app.get("/" , (req,res)=>{
    res.send("Hello")
})

// code generation route
app.get('/oauth2callback', async function (req, res) {
    return oauth2Client.getToken(req.query.code).then(function (tokens) {
        console.log(tokens);
        console.log(oauth2Client.credentials);
        return res.redirect("http://localhost:3001/dashboard")
    }).catch(function (err) {
        console.log(err);
        return res.redirect("/google")
    })
});

// port
app.listen(3000 || process.env.PORT , function () { console.log(`Server Started ${'http://localhost:3000'}`) });