const express = require('express');
const Employee = require('../models/EmployeeSchema');

const router = express.Router();

router.post('/employees', async (req, res) => {
  const { name, department, position, salary } = req.body;

  
  if (!name || !department || !position || !salary) {
    return res.status(400).json({ message: 'Please provide all necessary information.' });
  }

  try {
    
    const newEmp = new Employee({
      name,
      department,
      position,
      salary,
    });

    await newEmp.save();

    return res.status(201).json({ message: 'Employee created successfully.' });
  } catch (err) {

    return res.status(500).json({ message: 'Failed to create', error: err.message });
  }
});


router.get('/employees', async (req, res) => {
    try {
      
      const { department, position, minSalary, maxSalary } = req.query;
  
      let query = {};
  
      if (department) {
        query.department = department;
      }
      if (position) {
        query.position = position;
      }
      if (minSalary || maxSalary) {
        query.salary = {};
        if (minSalary) {
          query.salary.$gte = parseFloat(minSalary);
        }
        if (maxSalary) {
          query.salary.$lte = parseFloat(maxSalary);
        }
      }
  
      const emp = await Employee.find(query);
  
      return res.status(200).json({ emp });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to fetch', error: err.message });
    }
  });
  
  router.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the employee by ID in the database
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(employee); // Return the employee data
    } catch (err) {
      res.status(500).json({ message: 'Error fetching employee', error: err.message });
    }
  });
  

router.put('/employees/:id', async (req, res) => {
    const { id } = req.params; 
    try {
      const Emp = await Employee.findById(id);
      if (!Emp) {
        return res.status(404).json({ message: 'Employee not found.' });
      }
  
      const { name, department, position, salary } = req.body;
  
      if (name) {
        Emp.name = name;
      }
      if (department) {
        Emp.department = department;
      }
      if (position) {
        Emp.position = position;
      }
      if (salary) {
        Emp.salary = salary;
      }
  
      await Emp.save();
  
      return res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to update', error: err.message });
    }
  });

router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params; 
    try {
      const emp = await Employee.findById(id);
      if (!emp) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      await Employee.deleteOne({ _id: id });

      return res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete employee.', error: err.message });
    }
  });


router.delete('/employees', async (req, res) => {
    try {
      
      await Employee.deleteMany({});
  
      return res.status(200).json({ message: 'All employees deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete all employees.', error: err.message });
    }
  });
  
module.exports = router;

