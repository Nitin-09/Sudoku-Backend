const express = require('express')
const router = express.Router()
const Dashboard = require('../models/Dashboard')
const fetchuser = require('../middleware/fetchuser');

router.post('/addentry', fetchuser, async (req, res) => {
    try {
        const {userid,name, game, level, time } = req.body
        const entry = new Dashboard({ userid: userid, name:name, game:game, level:level, time:time })
        const DashboardEntry = await entry.save()
        res.json(DashboardEntry)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured");
    }
})

router.get('/fetchallentry',
async (req,res)=>{
    try {
    const entry =await Dashboard.find()
    res.json(entry)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured");  
}
})
module.exports = router
