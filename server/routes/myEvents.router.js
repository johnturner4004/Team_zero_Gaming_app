const { red } = require('@material-ui/core/colors');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const sqlText = `SELECT description, date, "time", game, image_url FROM "event" AS e 
	JOIN games AS g ON e.game_id = g.game_id
	WHERE e.created_by = $1
	ORDER BY date ASC, "time" ASC;`;
  const id = req.params.id
  pool.query(sqlText, [id])
  .then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log('Error getting myList', error);
    
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
