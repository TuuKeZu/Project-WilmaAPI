const express = require('express');
const router = express.Router();
const limiter = require('./rate-limit');
const { schemas, validators } = require('./validator');

const { lops } = require('../MongoDB/database');


router.get('/lops/courses/get/:id', limiter.cacheable, async (req, res) => {
    // Validation
    const request = validators.validateRequestParameters(req, res, schemas.courseTray.GetCourseByID);

    if (!request) return;

    lops.getCourseById(request.id)
        .then(course => {
            res.json(course);
        })
        .catch(err => {
            return res.status(err.status).json(err)
        });
});

router.get('/lops/courses/list/', limiter.cacheable, async (req, res) => {
    // Validation

    lops.getCourseList()
        .then(list => {
            res.json(list);
        })
        .catch(err => {
            return res.status(err.status).json(err)
        });
});


module.exports = router;