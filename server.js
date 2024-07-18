const express = require("express");
const app = express();


const users = [
    {
        name: "John",
        kidneys: [
            { healthy: true },
            { healthy: false }

        ],
    },
];

app.use(express.json())

app.get("/", (req, res) => {
    const johnKidneyS = users[0].kidneys;
    const numberOfKidneys = johnKidneyS.length;
    const numbersk = johnKidneyS.filter((item) => {
        return item.healthy == true;
    });
    
    const numberOfHealthyKidneys = numbersk.length;
    const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    })
    
});

app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({
        healthy: isHealthy
    })
    
    res.json({
        msg: "Done -!"
    })
})


app.put('/', (req, res) => {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        
        users[0].kidneys[i].healthy = true
        
    }
    res.send("Updated")
})


function UnHealthy(){

    const istrue = users[0].kidneys.filter((item) => { return item.healthy == false }) 
return istrue.length    
}




app.delete('/', (req, res) => {

    if (UnHealthy()) {

        const newArr = users[0].kidneys
        const trueArr = newArr.filter((item) => {
            return item.healthy == true
        })

        users[0].kidneys = trueArr


        res.send("Deleted")


    } else {
        res.status(411).send("No more")
    }

})







app.listen("3000", () => {
    console.log("Listing");
});