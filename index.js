const express = require('express');
const shortid = require('shortid');


const server = express();

server.use(express.json());

const PORT = 5000;

var channels = [];
var lessons = [];

server.get('/',(req,res) => {
    res.json({hello : 'world'});
});

server.get('/hello',(req,res) => {
    res.json({hello : 'hello future software developer'});
});

server.post('/api/channels', (req,res) => {
    const channelInfo = req.body;
    channelInfo.id = shortid.generate();
    channels.push(channelInfo);
    console.log(channels);
    res.status(201).json(channelInfo);
});

server.get('/api/channels', (req,res) => {
    res.status(200).json(channels);
});

server.post('/api/lessons',(req,res) => {
    const lesssonInfo = req.body;
    lesssonInfo.id = shortid.generate();
    lessons.push(lesssonInfo);
    res.status(203).json(lesssonInfo);
});

server.get('/api/lessons',(req,res) => {
    res.status(200).json(lessons);
});

server.delete('/api/channels/:id',(req,res) => {
    const {id} = req.params;

    const deleted = channels.find(channel => channel.id === id);
    if (deleted){
        console.log(deleted);
        channels = channels.filter(channel => channel.id !== id);
        res.status(200).json(deleted);
    }
    else{
        console.log(deleted);
        res.status(404).json({message : "element does not exists"});
    }
});

server.delete('/api/lessons/:id', (req,res) => {
    const {id} = req.params;

    const deleted = lessons.find(lesson => lesson.id === id);
    if(deleted){
        lessons = lessons.filter(lesson => lesson.id !== id);
        res.status(200).json(deleted);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});

server.get('/api/channels/:id',(req,res) => {
    const {id} = req.params;
    const found = channels.find(channel => channel.id === id);
    if(found){
        res.status(200).json(found);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});

server.get('/api/lessons/:id',(req,res) => {
    const {id} = req.params;

    const found = lessons.find(lesson => lesson.id === id);
    if(found){
        res.status(200).json(found);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});

server.put('/api/channels/:id',(req,res) => {
    const {id} = req.params;
    const change = req.body;

    const index = channels.findIndex(channel => channel.id === id);
    if(index !== -1){
        channels[index] = change;
        res.status(200).json(channels[index]);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});

server.put('/api/lessons/:id',(req,res) => {
    const {id} = req.params;
    const change = req.body;

    const index = lessons.findIndex(lesson => lesson.id === id);
    if(index !== -1){
        lessons[index] = change;
        res.status(200).json(lessons[index]);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});

server.patch('/api/channels/:id',(req,res) => {
    const {id} = req.params;
    change = req.body;

    const found = channels.find(channel => channel.id === id);

    if(found){
        Object.assign(found, change);
        res.status(200).json(found);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});

server.patch('/api/lessons/:id',(req,res) => {
    const {id} = req.params;
    change = req.body;

    const found = lessons.find(lesson => lesson.id === id);
    if(found){
        Object.assign(found, change);
        res.status(200).json(found);
    }
    else{
        res.status(404).json({message : "element does not exists"});
    }
});


server.listen(PORT, ()=>{
    console.log(` --- Server Running on http://localhost:${PORT}`);
});