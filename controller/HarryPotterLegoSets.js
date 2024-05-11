const mongodb = require('../data/dataBase');
const ObjectId = require('mongodb').ObjectId;

const getallHarryPotterLegoSets = async (req, res) => {
    const result = await mongodb.getDb().db().collection('HarryPotter').find();
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const GetSingleHarryPotterLegoSets = async (req, res) => {
    const legoId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('HarryPotter').find({_id: legoId});
    result.toArray().then((lego) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lego[0]);
    })
};
//post method
const postHarryPotterSet = async (req, res) =>{
    let body = req.body;
    const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        favoriteColor: body.favoriteColor
    };
    const response = await mongodb.getDb().db().collection('HarryPotter').insertOne(user);
    console.log(response.acknowledged);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while adding the user');
    }
    
};
//update 
const updatHarryPotterSet = async (req, res) =>{
    let body = req.body;
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        favoriteColor: body.favoriteColor
    };
    const response = await mongodb.getDb().db().collection('HarryPotter').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while updating the user');
    }
    
};
//delete 
const deleteHarryPotterSet = async (req, res) =>{
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('HarryPotter').deleteOne({_id: userId}, true);
    console.log(response.deletedCount);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while deleting the user')
    }
    
};


module.exports = {GetSingleHarryPotterLegoSets, 
    getallHarryPotterLegoSets, 
    postHarryPotterSet, 
    updatHarryPotterSet, 
    deleteHarryPotterSet}