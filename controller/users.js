const mongodb = require('../data/dataBase');
const ObjectId = require('mongodb').ObjectId;
// const { use } = require('../routes/users');

const getUsers = async (req, res) => {
    //#swagger.tags=['Users']
    console.log('getUsers')
    const result = await mongodb.getDb().db().collection('Users').find();
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const getUser = async (req, res) => {
    //#swagger.tags=['Users']
    console.log('GetUser');
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Users').find({_id: userId});
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
};
//post method
const postUser = async (req, res) =>{
    //#swagger.tags=['Users']
    console.log('postUser');
    let body = req.body;
    const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        favoriteColor: body.favoriteColor
    };
    const response = await mongodb.getDb().db().collection('Users').insertOne(user);
    console.log(response.acknowledged);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while adding the user');
    }
    
};
//update user 
const updateUser = async (req, res) =>{
    //#swagger.tags=['Users']
    console.log("updateUser");
    let body = req.body;
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        favoriteColor: body.favoriteColor
    };
    const response = await mongodb.getDb().db().collection('Users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while updating the user');
    }
    
};
//delete user
const deleteUser = async (req, res) =>{
    //#swagger.tags=['Users']
    console.log('deleteUser');
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('Users').deleteOne({_id: userId}, true);
    console.log(response.deletedCount);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while deleting the user')
    }
    
};

const world = (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('hello world');
}
module.exports = {world, getUser, getUsers, postUser, updateUser, deleteUser}