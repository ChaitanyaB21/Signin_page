const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req , res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members : [{
            email_address : email , 
            status : "subscribed" ,
            merge_fields : {
                FNAME : fName ,
                LNAME : lName ,
                
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us10.api.mailchimp.com/3.0/lists/bce57f32f0' 
    const options = {
        method: "POST",
        auth:"chaitanya:a762ce8a64457181373d9eee7d191b835-us10"
    }

    app.post("/failure" , function(req , res){
        res.redirect("/");
    });

    

    const request = https.request(url , options , function(response){
        response.on("data" , function(data){
            console.log(JSON.parse(data));
            var Code =  response.statusCode;
            if(Code === 200){
                res.sendFile(__dirname + "/success.html")
            }else{
                res.sendFile(__dirname + "/failure.html")
            }
        })
    });

    request.write(jsonData)
    request.end();
})






// API key
// 762ce8a64457181373d9eee7d191b835-us10

// List id
// bce57f32f0














app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running buttery smooth on port 3000");
})