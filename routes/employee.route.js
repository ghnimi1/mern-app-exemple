const express = require('express');
const EmployeeController = require('../controllers/employee.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', EmployeeController.getAllEmployees);
router.post('/',auth, EmployeeController.createEmployee);
router.get('/:id', EmployeeController.getEmplyee);
router.patch('/:id',auth, EmployeeController.updateEmployee);
router.delete('/:id',auth, EmployeeController.deleteEmployee);

module.exports = router;