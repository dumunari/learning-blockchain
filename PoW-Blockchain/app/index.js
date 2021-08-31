const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const MINING_DIFFICULTY = process.env.MINING_DIFFICULTY || 1;

const app  = express();
app.use(bodyParser.json());
const blockchain = new Blockchain(MINING_DIFFICULTY);

app.get('/blocks',(req,res)=>{
    res.json(blockchain.blocks);
});

app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/blocks');
});

app.listen(HTTP_PORT,()=>{
    console.log(`PoW Blockchain listening on port ${HTTP_PORT}`);
})