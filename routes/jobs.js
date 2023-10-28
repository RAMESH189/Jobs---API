const express = require('express');
const router = express.Router();
const {
    createJob,
    getJob,
    getAllJobs,
    updateJob,
    deleteJob
} = require('../controllers/jobs');

router.post('/', createJob);
router.get('/:id', getJob);
router.get('/', getAllJobs);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;