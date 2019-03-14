var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);
connection.connect();

router.post('/addTask',(req, res)=>{
  const name = req.body.name;
  const task = req.body.task;
  let date = req.body.date;

  let insertQuery;
  if(!date){
    insertQuery = `INSERT INTO tasks(name,task,date)
      VALUES (?,?,NOW())`;
  }else{
    insertQuery = `INSERT INTO tasks(name,task,date)
    VALUES (?,?,?)`;
  }
    connection.query(insertQuery,[name,task,date],(error,results)=>{
      if(error){throw error}
      const getTasksQuery = `SELECT * FROM tasks`;
      connection.query(getTasksQuery,(error2,results2)=>{
        if(error2){throw error2};
        res.json(results2)
      })
    });
});

router.get('/getTasks',(req, res)=>{
  const getTasksQuery = `SELECT * FROM tasks`;
  connection.query(getTasksQuery,(error2,results2)=>{
    if(error2){throw error2};
    res.json(results2)
  })
})

// //router.get('/getTask/:tid',(req, res)=>{
//   const tid = req.params.tid;
//   const selectTaskQuery = `SELECT * FROM tasks WHERE id = ?`;
//   connection.query(selectTaskQuery,[tid],(err, result)=>{
//     if(err){throw err}
//     res.json({task: result[0]});
//   })
// })

// router.post('/edit',(req, res)=>{
//   const id = req.body.id;
//   const taskName = req.body.task.taskName
//   const taskDate = req.body.task.taskDate.substring(0,10);
//   const childName = req.body.task.childName.substring(0,10);
//   const updateQuery = `UPDATE tasks SET taskName = ?, taskDate = ?, childName = ?,
//     WHERE id = ?`;
//   connection.query(updateQuery,[taskName,taskDate,id],(error,results)=>{
//     if(error){throw error};
//     res.json({
//       msg: "updated"
//     })
//   })
// });

module.exports = router;
