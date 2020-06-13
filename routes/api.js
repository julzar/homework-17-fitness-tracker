const router = require('express').Router();
const path = require('path')
const Workout = require('../models/Workout.js');

// HTML PAGES
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
router.get('/exercise', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
})
router.get('/stats', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
})

// GET
router.get('/api/workouts', async (req, res) => {
  try {
    res.json( (await Workout.find()).forEach(workout => {
      workout.getTotalDuration()
    }))
  } catch (err) {
    res.json(err)
  }
})


router.get('/api/workouts/range', async (req, res) => {
  try {
    res.json( (await Workout.find().limit(7).sort({$natural : -1})).reverse())
  } catch (err) {
    res.json(err)
  }
})

// POST
router.post('/api/workouts', async ({body}, res) => {
  try {
    res.json(await Workout.create(body))
  } catch (err) {
    res.json(err)
  }
})

// PUT
router.put('/api/workouts/:id', async ({body, params}, res) => {
  try {
    res.json(await Workout.findByIdAndUpdate(params.id, {$push: {exercises: body}}, {new: true}))
  } catch (err) {
    res.json(err)
  }
})

module.exports = router;