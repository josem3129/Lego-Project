const mongodb = require('../data/dataBase');
const ObjectId = require('mongodb').ObjectId;

const getallHarryPotterLegoSets = async (req, res) => {
    //#swagger.tags=['Harry Potter']
    mongodb
    .getDb()
    .db()
    .collection('HarryPotter')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const GetSingleHarryPotterLegoSets = (req, res) => {
    //#swagger.tags=['Harry Potter']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id.');
      }
      const LegoId = new ObjectId(req.params.id);
      mongodb
        .getDb()
        .db()
        .collection('HarryPotter')
        .find({ _id: LegoId })
        .toArray((err, result) => {
          if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
        });
};
//post method
const postHarryPotterSet = async (req, res) =>{
    //#swagger.tags=['Harry Potter']
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
    const response = await mongodb.getDb().db().collection('HarryPotter').insertOne(legoSet);
    if (response.acknowledged) {
        res.status(204).send(response.acknowledged);
    } else {
        res.status(500).json(response.error || 'some error occurred while adding the Lego set');
    }
    
};
//update 
const updatHarryPotterSet = async (req, res) =>{
    //#swagger.tags=['Harry Potter']
    let body = req.body;
    const userId = new ObjectId(req.params.id);
    const user = {
        Name: body.Name,
        setNumber: body.setNumber,
        peacesCount: body.peacesCount,
        Theme: body.Theme,
        price: body.price,
        Age: body.Age,
        minifigs: body.minifigs
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
    //#swagger.tags=['Harry Potter']
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