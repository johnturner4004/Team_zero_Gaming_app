const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const sqlText = `SELECT * FROM participant WHERE user_id = $1;`;
  const id = Number(req.params.id);
  console.log(`attending router`, id);
  
  pool.query(sqlText, [id])
  .then(result => {
    res.send(result.rows)
    console.log(result.rows);
    
  })
  .catch(error => {
    console.log('Attendance query failed:', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const sqlText = `INSERT INTO participant (event_id, user_id) 
	                  VALUES ($1, $2);`;
  const event_id = req.body.event_id;
  const user_id = req.body.user_id;

  pool.query(sqlText, [event_id, user_id])
  .then(result => {
    res.sendStatus(201)
  })
  .catch(error => {
    console.log('Error adding participant', error);
  });
  // POST route code here
});

module.exports = router;
