const mongodb = require('../data/dataBase');
const ObjectId = require('mongodb').ObjectId;

// get all lego sets
const getAllStarWarsLegos =  async (req, res) => {
    //#swagger.tags=['Star wars']
    mongodb
    .getDb()
    .db()
    .collection('StarWars')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

//get single lego set
const getSingleStarWarsLegos = async (req, res) => {
    //#swagger.tags=['Star wars']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id.');
      }
      const LegoId = new ObjectId(req.params.id);
      mongodb
        .getDb()
        .db()
        .collection('StarWars')
        .find({ _id: LegoId })
        .toArray((err, result) => {
          if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
        });
};
//post lego set
const postNewLego = async (req, res) =>{
    //#swagger.tags=['Star wars']
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
    const response = await mongodb.getDb().db().collection('StarWars').insertOne(legoSet);
    if (response.acknowledged) {
        res.status(204).send(response.acknowledged);
    } else {
        res.status(500).json(response.error || 'some error occurred while adding the Lego set');
    }
    
};
//update lego set
const updateLego = async (req, res) =>{
    //#swagger.tags=['Star wars']
    const legoId = new ObjectId(req.params.id);
    const LegoInfo = {
        Name: req.body.Name,
        setNumber: req.body.setNumber,
        peacesCount: req.body.peacesCount,
        Theme: req.body.theme,
        price: req.body.price,
        Age: req.body.Age,
        minifigs: req.body.minifigs
                
    };
    const response = await mongodb.getDb().db().collection('StarWars').replaceOne({_id: legoId}, LegoInfo);
    console.log(response)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while updating the Lego Info');
    }
    
};
//delete lego set
const deleteLego = async (req, res) =>{
    //#swagger.tags=['Star wars']
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