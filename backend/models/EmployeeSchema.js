const mongoose = require('../config/db');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    position: String,
    salary: Number,
    
  });
  
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
