const express = require('express');
const path = require('path');
const app= express();

app.use(express.static('./dist/FrontendGeekvolution'));

app.get('/*',(req, res)=>
    res.sendFile('index.html',{root:'dist/FrontendGeekvolution'}),
);


app.isten(process.env.PORT || 4200);
