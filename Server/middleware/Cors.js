
const express = require('express');

const manageCors = (req, res, next )=>{
     // update to match the domain you will make the request from
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
} 


module.exports = manageCors;