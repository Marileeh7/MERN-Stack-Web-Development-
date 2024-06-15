const Project = require('../models/project.model');

module.exports.getAllProjects = (req, res) => {
  Project.find()
    .then(allProjects => res.json({ projects: allProjects }))
    .catch(err => res.status(400).json({ message: 'Error getting projects', error: err }));
};

module.exports.getProject = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then(project => res.json({ project }))
    .catch(err => res.status(400).json({ message: 'Error getting project', error: err }));
};

module.exports.createProject = (req, res) => {
  Project.create(req.body)
    .then(newProject => res.json({ project: newProject }))
    .catch(err => {
      if (err.errors) {
        res.status(400).json({ error: err.errors });
      } else {
        res.status(400).json({ error: 'Error al crear el proyecto' });
      }
    });
};

module.exports.updateProject = (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(updatedProject => res.json({ project: updatedProject }))
    .catch(err => res.status(400).json({ message: 'Error updating project', error: err }));
};

module.exports.deleteProject = (req, res) => {
  Project.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: 'Project deleted' }))
    .catch(err => res.status(400).json({ message: 'Error deleting project', error: err }));
};
