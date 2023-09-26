import express from 'express';
import saveOperationType from '../backend/controllers/postOperation';
const router = express.Router();



router.post('/form-operation', function(req, res, next) {
    saveOperationType(req, res);
})

module.exports = router;