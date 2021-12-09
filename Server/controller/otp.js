const User = require('../models/user');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceToken = process.env.TWILIO_SERVICE_TOKEN;
const client = require('twilio')(accountSid, authToken);


