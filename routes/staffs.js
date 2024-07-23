const express = require("express");
const router = express.Router();
const Joi = require("joi");

const staffs = [
    {
        id: 1,
        name: "Fatma Bayomi",
        phone: "01202956964",
        shift: "Night",
        salary: 10000
    },
    {
        id: 2,
        name: "Nancy Mohamed",
        phone: "01220265559",
        shift: "Day",
        salary: 8500
    },
]

router.get("/",(req,res) => {
    res.status(200).json(staffs);
});

router.get("/:id",(req,res) => {
    const staff = staffs.find(b => b.id === parseInt(req.params.id));
    if(staff) {
        res.status(200).json(staff);
    }
    else {
        res.status(404).json({ message: "This staff not found"})
    }
});

router.post("/",(req,res) => {

    const {error} = validateCreateStaff(req.body);

    if(error) {
        return res.status(400).json({ message: error.details[0].message});
    }

    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200).required(),
        phone: Joi.number().min(0).required(),
        shift: Joi.string().trim().required(),
        salary: Joi.number().min(0).required(),
    });

    const staff = {
        id: staffs.length + 1,
        name: req.body.name,
        phone: req.body.phone,
        shift: req.body.shift,
        salary: req.body.salary
    }
    
    staffs.push(staff);
    res.status(201).json(staff);
});

router.put("/:id", (req,res) => {
    const {error} = validateUpdateStaff(req.body);

    if(error) {
        return res.status(400).json({ message: error.details[0].message});
    }

    const staff = staffs.find(b => b.id === parseInt(req.params.id));
    if(staff){
        res.status(200).json({ message: "Staff has beed updated"});
    }
    else {
        res.status(404).json({ message: "Staff not found"});
    }
});

router.delete("/:id", (req,res) => {
    const staff = staffs.find(b => b.id === parseInt(req.params.id));
    if(staff){
        res.status(200).json({ message: "Staff has beed deleted"});
    }
    else {
        res.status(404).json({ message: "Staff not found"});
    }
});

function validateCreateStaff(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200).required(),
        phone: Joi.number().min(0).required(),
        shift: Joi.string().trim().required(),
        salary: Joi.number().min(0).required(),
    });
    return schema.validate(obj);
}

function validateUpdateStaff(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200),
        phone: Joi.number().min(0),
        shift: Joi.string().trim(),
        salary: Joi.number().min(0),
    });
    return schema.validate(obj);
}

module.exports = router;