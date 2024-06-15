const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del proyecto es obligatorio'],
    unique: true
  },
  dueDate: {
    type: Date,
    required: [true, 'La fecha de vencimiento es obligatoria']
  },
  status: {
    type: String,
    enum: ['Backlog', 'In Progress', 'Completed'],
    default: 'Backlog'
  }
}, { timestamps: true });

ProjectSchema.plugin(uniqueValidator, { message: 'Ya existe un proyecto con el mismo {PATH}.' });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
