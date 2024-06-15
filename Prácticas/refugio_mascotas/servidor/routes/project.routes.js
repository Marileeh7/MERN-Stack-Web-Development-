const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controllers');

router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProject);
router.post('/new', ProjectController.createProject);
router.put('/update/:id', ProjectController.updateProject);
router.delete('/delete/:id', ProjectController.deleteProject);

module.exports = router;
