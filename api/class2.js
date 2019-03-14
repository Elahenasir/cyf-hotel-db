const express = require("express");
const router = express.Router();

const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
// db.run("PRAGMA foreign_keys = ON");

router.get("/customers", function(req, res) {
 let sql = "select * from customers";
 db.all(sql, [], (err, rows) =>{
   if (err) {
     console.log("ERROR fetching from the database:", err);
     return;
   }
   console.log("Request succeeded, new data fetched", rows);
   res.status(200).json({
     customers: rows
   });
 });
});
// // (up function is showing all customers)

router.get("/customers/:id", function(req, res) {
 let id = req.params.id;
 let sql = `select * from customers where id = ${id}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});

router.get("/customers/:surname", function(req, res) {
 const surname = req.params.surname;
const sql = `select * from customers where surname like '%${surname}%'`;

 db.all(sql, [], (err, rows) => {
   if (err) {
     console.log("ERROR fetching from the database:", err);
     return;
   }
   console.log("Request succeeded, new data fetched", rows);
   res.status(200).json({
     customers: rows
   });
 });
});

router.post("/customers/", function(req, res) {
 const newCustomer = req.body;
 const sql = `INSERT INTO customers (title, firstname, surname, email) VALUES
  ("${ newCustomer.title}", "${newCustomer.firstname}", "${newCustomer.surname}",
   "${ newCustomer.email}")`;

 db.all(sql, [], (err, rows) => {
   if (err) {
     console.log("ERROR fetching from the database:", err);
     return;
   }
   console.log("Request succeeded, new data fetched", rows);
   res.sendStatus(200);
 });
 });

router.put("/customers/:id", function(req, res) {
  let id = req.params.id;
  let newCustomer=req.body;
  let sql= `update  customers set email= '${newCustomer.email}' where id= '${id}' `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data updatet", rows);
    res.sendStatus(200);
    });
  });

router.get("/customers/", function(req, res) {
  const sql = `select * from customers where firstname in ("John" , "Carrie")`  ;
     db.all(sql, [], (err, rows) => {
      if (err) {
        console.log("ERROR fetching from the database:", err);
        return;
      }
      console.log("Request succeeded, new data fetched", rows);
      res.status(200).json({
        customers: rows
      });
    });
   });

router.delete("/customers/:surname",function(req,res){
  const surname = req.params.surname;
const sql = `delete from customers where surname like '%${surname}%'`;
db.all(sql, [], (err, rows) => {
        if (err) {
          console.log("ERROR fetching from the database:", err);
          return;
        }
        console.log("Request succeeded, new data fetched", rows);
        res.sendStatus(200);
        });
      });


router.get("/reservations", function(req, res) {
 var sql = "select * from reservations";
 db.all(sql, [], (err, rows) => {
   if (err) {
     console.log("ERROR fetching from the database:", err);
     return;
   }
   console.log("Request succeeded, new data fetched", rows);
   res.status(200).json({
     reservations: rows
   });
 });
});


// get '/reservations/:id'
// TODO: add code here
router.get("/reservations/:id", function(req, res) {
  let id = req.params.id;
  let sql = `select * from reservations where id = ${id}`;
   db.all(sql, [], (err, rows) => {
     if (err) {
       console.log("ERROR fetching from the database:", err);
       return;
     }
     console.log("Request succeeded, new data fetched", rows);
     res.status(200).json({
       reservations: rows
     });
   });
 });

// delete '/reservations/:id'
router.delete('/reservations/:id',function(res,req){
  const id=req.params.id;
   const sql=`delete from reservations where id= ${id} `;
  db.all(sql,[],(err,rows)=>{
    if(err){
      console.log("there is an error",err);
    }
    console.log("succeded",rows);
    res.sendStatus(200);
  });
});

// get '/reservations/starting-on/:startDate'
// TODO: add code here

// get '/reservations/active-on/:date'
// TODO: add code here

// post '/reservations'
// EXPECTED JSON Object:
// {
//   customer_id: 1,
//   room_id: 1,
//   check_in_date: '2018-01-20',
// 
  check_out_date: '2018-01-22',
//   room_price: 129.90
// }
// TODO: add code here

// get `/detailed-invoices'
// TODO: add code here

// get `/reservations/details-between/:from_day/:to_day`
// TODO: add code here

module.exports = router;