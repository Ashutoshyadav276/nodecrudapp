const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

//Here i used a router to call get function.

router.get('/',(req, res)=>{
    res.render("employee/addOrEdit",{
        viewtitle : "Insert Employee Details"
    });
});

// Handle both insert and update operation

router.post('/',(req, res)=>{
    if(req.body._id == '')
     insertRecord(req, res);
     else
     updateRecord(req, res);
    });

//Here i have use inserrecord record function to access Html form.

function insertRecord(req, res){

    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.lastName;
    employee.mobile = req.body.email;
    employee.city = req.body.mobile;
    employee.save((err, doc) => {
        if(!err)
             res.redirect('employee/list');
        else{
            if(err.name == 'ValidationError'){
               handleValidationError(err, req.body);
               res.render("employee/addOrEdit",{
                viewtitle : "Insert Employee Details",
                employee: req.body
            });
            }
            else   
            console.log('Error during record insertion : ' + err);
        }     
    });
}

//Here we have updated corresponding records.

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if(!err) { res.redirect('employee/list'); }
        else{
            if(err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewtitle: 'Updated Employee',
                    employee: req.body
                });
            }
            else{
                console.log('Error during record update : ' + err);
            }
        }
    });
}

router.get('/list',(req, res)=> {
    res.json('from list');
    Employee.find((err, docs) => {
        if(!err) {
            res.render("employee/list", {
                list: docs
            });
        }else{
            console.log('Error in retrieving employee :' + err);
        }
    })
});

//To check our input fileds is correct or not 

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'emailError':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;

        }
    }
}

//Here i am targeting the id's of inserted elements

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewtitle: "Update Employee",
                employee: doc
            })
        }
    });
});

//routing for delete operation

router.get('/delete/:id', (req, res) => {
    Employee.findByIdRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        }
        else{ console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;

