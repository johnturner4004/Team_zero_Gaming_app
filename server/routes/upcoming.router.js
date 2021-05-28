const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const sqlText = `SELECT "description", "game", "date", "time", "username" FROM "event" AS "e"
	JOIN "games" AS "g" ON g.id = e.game_id
	JOIN "user" AS "u" ON u.id = e.created_by;`;
  pool.query(sqlText)
  .then(results => {
    res.send(results.rows)
  })
  .catch(error => {
    console.log('Unable to get events', error);
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
