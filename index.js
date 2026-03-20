
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');

const {v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {   id: uuidv4(),
        username : "apnacollege",
        content : "This is an online platform for students to learn and share knowledge.",
    },
    {   id:uuidv4(),
        username : "SakshiWaghmode",
        content : "She is an engineering student learning web development and JavaScript.",
    },
    {   id:uuidv4(),
        username : "Shardhakhapra",
        content : " she is a computer engineering student interested in new technologies.",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts: posts } );
});

app.get("/new/posts", (req,res) =>{
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});

});


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening to port : 8080");

});
