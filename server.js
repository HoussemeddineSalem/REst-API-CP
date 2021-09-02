require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userSchema = require('./models/user');
const data = require('./data')

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGO_URI)
User = mongoose.model("User", userSchema)

//Inserting data into our database
app.route('/user')
    .get((req, res) => {
        User.find({}, (err, foundItems) => {
            if (!err) {
                if (foundItems.length === 0) {
                    User.create(data);
                    res.redirect('/user')
                } else {

                    res.send(foundItems)
                }
            } else {
                console.log(err.toString());
            }
        });
    })
    //posting
    .post((req, res) => {
        let title = req.body.title;
        let content = req.body.content;
        User.findOne({ title: title }, (err, foundItem) => {
            console.log(foundItem)
            if (!err) {
                if (!foundItem) {
                    newUser = new User({
                        title: title,
                        content: content
                    })
                    User.create(newUser);
                    console.log('Success')

                } else {
                    console.log(err);
                }
            }
        });
    })
    //puttin
    .put((req, res) => {
        let title = req.body.title;
        let content = req.body.content;
        let newTitle = req.body.newTitle;
        let newContent = req.body.newContent;
        User.findOne({ title: title }, (err, foundItem) => {
            console.log(foundItem)
            if (!err) {
                User.updateOne({ title: title }, { title: newTitle, content: newContent }, (err, docs) => {
                    err ? console.log(err) : res.send(docs);
                })
            }
        });
    })
    //deleting
    .delete((req, res) => {
        User.findByIdAndRemove({ _id: "6130f52b806072c753b867b9" }, (err) => {
            err ? console.log(err) : console.log('deleted successfully');
        })
    })

app.listen(port, (err) => {
    !err ? console.log(`Connected successfully to port ${port}`) : console.log('error encountred', err.toString());
});