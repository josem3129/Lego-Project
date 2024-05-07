const mongodb = require('../data/dataBase');
const ObjectId = require('mongodb').ObjectId;

// get all lego sets
const getAllLegos = async (req, res) => {
    
    const result = await mongodb.getDb().db().collection('Lego').find();
    result.toArray().then((Lego) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Lego);
    })
};

//get single lego set
const getSingleLegos = async (req, res) => {
    console.log('GetUser');
    const legoId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Lego').find({_id: legoId});
    result.toArray().then((Lego) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Lego[0]);
    })
};
//post lego set
const postNewLego = async (req, res) =>{
    let body = req.body;
    const legoSet = {
        Name: body.Name,
        setNumber: body.setNumber,
        peacesCount: body.peacesCount,
        Theme: body.theme,
        price: body.price,
        Age: body.Age,
        minifigs: body.minifigs
    };
    console.log(legoSet)
    const response = await mongodb.getDb().db().collection('Lego').insertOne(legoSet);
    if (response.acknowledged) {
        res.status(204).send(response.acknowledged);
    } else {
        res.status(500).json(response.error || 'some error occurred while adding the user');
    }
    
};
//update lego set
const updateLego = async (req, res) =>{
    let body = req.body;
    const legoId = new ObjectId(req.params.id);
    const user = {
        Name: body.Name,
        setNumber: body.setNumber,
        peacesCount: body.peacesCount,
        Theme: body.theme,
        price: body.price,
        Age: body.Age,
        minifigs: body.minifigs
                
    };
    const response = await mongodb.getDb().db().collection('Lego').replaceOne({_id: legoId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while updating the user');
    }
    
};
//delete lego set
const deleteLego = async (req, res) =>{
    const legoId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('Lego').deleteOne({_id: legoId}, true);
    console.log(response.deletedCount);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while deleting the user')
    }
    
};

module.exports = {getAllLegos, getSingleLegos, postNewLego, updateLego, deleteLego}