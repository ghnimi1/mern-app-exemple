const EmployeeModel = require('../models/employee.model');

const getAllEmployees= async (req, res) => {
    const { ...others } = req.query
    try {
        const employees = await EmployeeModel.find({ ...others });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const createEmployee = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            phone,
            address,
        } = req.body;

        let employee = EmployeeModel({
            userId: req.user._id,
            firstname,
            lastname,
            phone,
            address
        });

        employee = await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const getEmplyee= async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id)
        res.status(201).json(employee)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(201).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json({ msg: "Employee has been deleted" })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    getAllEmployees,
    getEmplyee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}