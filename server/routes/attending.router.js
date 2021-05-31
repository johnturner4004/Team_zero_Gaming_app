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
  // POST route code here
});

module.exports = router;
