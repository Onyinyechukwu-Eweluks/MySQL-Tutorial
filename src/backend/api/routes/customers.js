const express = require('express')
const router = express.Router()
const conn = require('../../db2')

router.get('/customers', (req, res, next) => {
    conn.query('SELECT * FROM users.customers;', (err, result, fields) => {
        if(!err) {
            res.status(200).json(result)
            console.log(result)
        }else{
            res.status(404).json({
                message: "Unable to get customers",
                err
            })
        }
    })
})

router.get('/customers/:id', (req, res, next) => {
    let id = req.params.id
    conn.query('SELECT * FROM users.customers WHERE customerId = ?;', [id], (err, result, fields) => {
        if(!err) {
            res.status(200).json(result)
            console.log(result)
        }else{
            res.status(404).json({
                message: "Unable to get customer",
                err
            })
        }
    })
})

router.delete('/customers/:id', (req, res, next) => {
    let id = req.params.id
    conn.query('DELETE FROM users.customers WHERE customerId = ?;', [id], (err, result, fields) => {
        if(!err) {
            res.status(200).json(result)
            console.log(result)
        }else{
            res.status(404).json({
                message: "Unable to delete customers",
                err
            })
        }
    })
})

router.post('/customer', (req, res, next) => {
    let custom = req.body
    // var sql = "SET @customerId= ?; SET @first_name= ?; SET @last_name= ?; SET @phone_num= ?; SET @address= ?; CALL customerAddorEdit(@customerId, @first_name, @last_name, @phone_num, @address);"
    // conn.query(sql,[custom.customerId, custom.first_name, custom.last_name, custom.phone_num, custom.address], (err, result, fields) => {
    //     if(!err) {
    //         result.forEach(element => {
    //             if(element.constructor === Array)
    //                 res.json('New Customer:' + element[0].customerId)
    //         })
    //     }else{
    //         res.status(404).json({
    //             message: "Unable to add customers",
    //             err
    //         })
    //     }
    // })
    const customer = {first_name: custom.first_name, last_name: custom.last_name, phone_num: custom.phone_num, address: custom.address}
    conn.query('INSERT INTO customers SET ?', customer, (err, result) => {
        if(err) { res.send({message: 'Unable to add customer', err})};
        res.json(result)
    })
})

router.put('/customers', (req, res, next) => {
    let custom = req.body
    // var sql = "SET @customerId= ?; SET @first_name= ?; SET @last_name= ?; SET @phone_num= ?; SET @address= ?; CALL customerAddorEdit(@customerId, @first_name, @last_name, @phone_num, @address)"
    // conn.query(sql, [custom.customerId, custom.first_name, custom.last_name, custom.phone_num, custom.address], (err, result, fields) => {
    //     if(!err) {
    //         res.status(200).json(result)
    //         console.log(result)
    //     }else{
    //         res.status(404).json({
    //             message: "Unable to update customers",
    //             err
    //         })
    //     }
    // })
    conn.query('UPDATE customers SET first_name = ? WHERE last_name = ?', [custom.first_name, custom.last_name], (err, result)=> {
        if (!err) {
            res.json(result)
            console.log(result.changedRows)
        }else{
            res.send({message: 'Update unsuccessful', err})
        }
    })
})

module.exports= router