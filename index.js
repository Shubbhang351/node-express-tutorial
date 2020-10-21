const express = require('express');

const server = express();

const PORT = 5000;

const channels = [];
const lessons = [];

server.get('/',(req,res) => {
    res.json({hello : 'world'});
});

server.get('/hello',(req,res) => {
    res.json({hello : 'hello future software developer'});
});

server.post('/api/channels', (req,res) => {
    const channelInfo = req.body;
    
});


server.listen(PORT, ()=>{
    console.log(` --- Server Running on http://localhost:${PORT}`);
});