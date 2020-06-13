const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
  exercises: [
    {
      name: {
        type: String,
        trim: true
      },
      type: {
        type: String
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      duration: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ],

  day: {
    type: Date,
    default: Date.now
  },

  totalDuration: Number
})

WorkoutSchema.methods.getTotalDuration = function() {
  this.totalDuration = 0
  this.exercises.forEach(exercise => {
    this.totalDuration += exercise.duration
  })
  return this.totalDuration
}

const Workout = mongoose.model('Workout', WorkoutSchema)

module.exports = Workout