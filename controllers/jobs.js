const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const getJob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;

    const job = await Job.findOne({ createdBy: userId, _id: jobId });
     if (!job) {
        throw new NotFoundError(`No job found with id: ${jobId} `);
    }
    res.status(StatusCodes.OK).json({ job });
   
}

const getAllJobs = async(req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    if (!jobs) {
        throw new NotFoundError('No jobs found');
    }
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const updateJob = async(req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;
    const { company, position } = req.body;
    
    if (company === '' || position === '') {
        throw new BadRequestError('Provide all the required details');
    };

    const job = await Job.findByIdAndUpdate({ createdBy: userId, _id: jobId }, req.body, {
    new: true,
    runValidators: true,
    });
    
    if (!job) {
        throw new NotFoundError(`No job found with id: ${jobId} `);
    }
    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async(req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;
    
    const job = await Job.findByIdAndRemove({ createdBy: userId, _id: jobId })
    if (!job) {
        throw new NotFoundError(`No job found with id: ${jobId} `);
    }
    res.status(StatusCodes.OK).json(`Job with id ${jobId} deleted`);
}

module.exports = {
    createJob,
    getJob,
    getAllJobs,
    updateJob,
    deleteJob
}