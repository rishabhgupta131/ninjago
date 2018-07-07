const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//Get request
router.get('/ninjas',function(req,res,next){
	/* To return all the ninjas irrespective of any parameter passed, then we can use:
	 * Ninja.find({}).then(function(ninjas){
	 * 		res.send({ninjas});
	 * 	});*/
	// to find all the ninjas near to the passed location(longitude, latitude)
	/*Ninja.geoNear(
		{type: "Point",coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)]},
		{maxDistance: 10000, spherical: true}
	).then(function(ninjas){
		res.send({ninjas});
	});*/
	//Since geoNear function has been deprecated so we need to use it the following way.
	Ninja.aggregate(
        [{
            $geoNear: {
                near: {'type':'Point', 'coordinates':[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
                spherical: true,
                maxDistance: 1000000000,
                distanceField: 'dist'
            }
        }]).then(function(ninjas){
    		res.send({ninjas});
    	});
});

//post request
router.post('/ninjas',function(req,res,next){
	Ninja.create(req.body).then(function(ninja){
		res.send(ninja);
	}).catch(next);
});

//put request
router.put('/ninjas/:id',function(req,res,next){
	Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
		Ninja.findOne({_id:req.params.id}).then(function(ninja){
			res.send({ninja});
		});
	});
});

//delete request
router.delete('/ninjas/:id',function(req,res,next){
	Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
		res.send(ninja);
	});
});

module.exports = router;