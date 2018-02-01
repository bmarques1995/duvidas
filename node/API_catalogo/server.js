const app = require('express')(), 
      bodyParser = require('body-parser'), 
      mongodb = require('mongodb').MongoClient,
      assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbnome = 'jogos';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = 4000;

app.listen(port);

console.log('Ouvindo na porta '+port);

app.get('/',function(req,res){
    mongodb.connect(url,function(erro,con){
        assert.equal(null,erro);
        const base = con.db(dbnome);
        var teste = base.collection('titulos').find({},function(erro,resultado){
            console.log(resultado);
            con.close();
        });
    });
});

app.put('/',function(req,res){
    var dados = req.body;
    mongodb.connect(url,function(erro,con){
        assert.equal(null,erro);
        const base = con.db(dbnome);
        base.collection('titulos').insertOne(dados,function(erro,num){
            assert.equal(null,erro);
            assert.equal(1,num.insertedCount);
            con.close();
        });
    });
});