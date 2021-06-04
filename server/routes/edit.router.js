const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const sqlText = `SELECT * FROM "event" AS e 
	JOIN games AS g ON e.game_id = g.game_id
	WHERE event_id = $1;`;
  const id = req.params.id;
  pool.query(sqlText, [id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(error);
    
  })
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
