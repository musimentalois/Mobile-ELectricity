const express = require('express');
const {
  generateTokenController,
  validateTokenController,
  getTokensByMeterNumberController
} = require('../controllers/tokenControllers');


const router = express.Router();

router.post('/generate-token', generateTokenController);
router.post('/validate-token', validateTokenController);
router.get('/tokens/:meter_number', getTokensByMeterNumberController);

module.exports = router;