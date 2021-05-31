const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const sqlText = `SELECT u."id", e."event_id", u."username" FROM "event" AS "e"
	JOIN "participant" AS "p" ON p.event_id = e.event_id
	JOIN "user" AS "u" ON p.user_id = u.id
  WHERE e.event_id = $1
  ORDER BY u."username" ASC;`;
  const id = req.params.id
  pool.query(sqlText, [id])
  .then(results => {
    res.send(results.rows)
  })
  .catch(error => {
    console.log(`Error getting participant list: ${error}`);
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
