const mongodb = require('../data/dataBase');
const ObjectId = require('mongodb').ObjectId;

// get all lego sets
const getAllStarWarsLegos =  async (req, res) => {
    const result = await mongodb.getDb().db().collection('StarWars').find();
    result.toArray().then((lego) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lego);
    })
};

//get single lego set
const getSingleStarWarsLegos = async (req, res) => {
    const legoId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('StarWars').find({_id: legoId});
    result.toArray().then((lego) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lego[0]);
    })
};
//post lego set
const postNewLego = async (req, res) =>{
    let body = req.body;
    const legoSet = {
        Name: body.Name,
        setNumber: body.setNumber,
        peacesCount: body.peacesCount,
        Theme: body.Theme,
        price: body.price,
        Age: body.Age,
        minifigs: body.minifigs
    };
    console.log(legoSet)
    const response = await mongodb.getDb().db().collection('Lego').insertOne(legoSet);
    if (response.acknowledged) {
        res.status(204).send(response.acknowledged);
    } else {
        res.status(500).json(response.error || 'some error occurred while adding the Lego set');
    }
    
};
//update lego set
const updateLego = async (req, res) =>{
    let body = req.body;
    const legoId = new ObjectId(req.params.id);
    const LegoInfo = {
        Name: body.Name,
        setNumber: body.setNumber,
        peacesCount: body.peacesCount,
        Theme: body.theme,
        price: body.price,
        Age: body.Age,
        minifigs: body.minifigs
                
    };
    const response = await mongodb.getDb().db().collection('StarWars').replaceOne({_id: legoId}, LegoInfo);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while updating the Lego Info');
    }
    
};
//delete lego set
const deleteLego = async (req, res) =>{
    const legoId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('StarWars').deleteOne({_id: legoId}, true);
    console.log(response.deletedCount);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while deleting the lego set')
    }
    
};

module.exports = {getAllStarWarsLegos, 
    getSingleStarWarsLegos, 
    postNewLego, 
    updateLego, 
    deleteLego}