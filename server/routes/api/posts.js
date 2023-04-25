const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// GET posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

// update post
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.updateOne({_id: new mongodb.ObjectId(req.params.id)}, 
                          { $set: { text: req.body.text } });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://alice123:alice123@pr3.0mi5hac.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;
