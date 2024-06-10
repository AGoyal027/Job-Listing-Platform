const Job = require('../models/job');

const createJob = async (req, res, next) => {
    try {
        const { title, companyName, location, salary, description, locationType, jobType, skills } = req.body;
        if (!title || !companyName || !location || !salary || !description || !locationType || !jobType || !skills) {
            return res.status(400).send('Please fill all the fields');
        }
        skillsArray = skills.split(",").map((skill) => skill.trim());
        const newJob = new Job({
            title,
            companyName,
            location,
            salary,
            description,
            locationType,
            jobType,
            skills: skillsArray,
            refUserId: req.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newJob.save();
        res.status(201).send('Job created successfully');
    } catch (err) {
        next(err);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find()
            .select(['title', 'companyName', 'location', 'skills'])
            .sort({ createdAt: -1 });
        res.status(200).send(jobs);
    } catch (err) {
        next(err);
    }
};

const getJobById = async (req, res, next) => {
    try {
        const { jobnumber } = req.params
        const job = await Job.findById(jobnumber);
        if (!job) {
            return res.status(404).send('Job not found');
        }
        res.status(200).send(job);
    } catch (err) {
        next(err);
    }
};

module.exports = { createJob, getAllJobs, getJobById };