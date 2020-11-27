require('./db');
const express = require('express')
const app = express()
const port = process.env.PORT || 8000

var cors = require('cors');
app.use(cors());

var formCtrl = require('./controllers/form.controller');

//configuring body-parser middleware to our application
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const webpush = require("web-push");


app.listen(port, () => console.log(`App listening on port!!!! ${port}`))

const publicVapidKey = "BGFgFRZIvdo1NniepT_poZOIaPFwMf07fCxGbhSOlTTNoRFnk4dpF_QkdBtXAP4YZscGq35KoEDdmRsbTkccnH4";
const privateVapidKey = "wL4852HW0tHrxnb1WlEHHBYtP2Km0Z7Ekwdb-GGfnU0";
webpush.setVapidDetails("mailto:test@test.com",
    publicVapidKey, privateVapidKey);
app.post('/api/subscribe', (req, res) => {
    const { subscription, title, message } = req.body;
    const payload = JSON.stringify({ title, message });
    webpush.sendNotification(subscription, payload)
        .catch((err) => console.error("err", err));
    res.status(200).json({ success: true });
});

app.post('/api/user/register', formCtrl.registerUser)
app.post('/api/user/login', formCtrl.authenticateUser)
app.post('/api/form/save', formCtrl.saveForm)
app.get('/api/getRequests/:status', formCtrl.getRequests)
app.get('/api/getUsers/:dept', formCtrl.getUsers)
app.post('/api/update/status/:id', formCtrl.updateStatus)


module.exports = app;