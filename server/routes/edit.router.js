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

router.put('/:id', (req,res) => {
  const sqlText = `UPDATE "event" SET description = $1, game_id = $2, date = $3, time = $4, created_by = $5 
                    WHERE event_id = $6`
  const id = req.params.id;
  const info = req.body;
  pool.query(sqlText, [info.description, info.game_id, info.date, info.time, info.created_by, id])
  .then(result => {
    res.sendStatus(201)
  })
  .catch(error => {
    console.log('Unable to edit data', error);
    
  })
})

router.delete('/:id', (req,res) => {
  const sqlText = `DELETE FROM "event" WHERE event_id = $1;`;
  const id = req.params.id;
  pool.query(sqlText, [id])
  .then(result => {
    res.sendStatus(201)
  })
  .catch(error => {
    console.log('Unable to delete from database', error);
  })
})

module.exports = router;
