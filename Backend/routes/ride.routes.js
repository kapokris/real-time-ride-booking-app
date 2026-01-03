const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');
const { query } = require('express-validator');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid vehicle type'),
    rideController.createRide
    
);


router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),

    rideController.getFare
    
);
router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isString().withMessage('Ride ID is required'),
    rideController.confirmRide
    
);
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isString().withMessage('Ride ID is required'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Valid OTP is required'),
    rideController.startRide
)
router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isString().withMessage('Ride ID is required'),
    rideController.endRide
);

module.exports = router;