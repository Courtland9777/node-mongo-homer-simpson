const express = require('express')
const mongoose = require('mongoose')
const Names = require('./models/names')

const app = express()

// Connect to MongoDB
mongoose
  .connect('mongodb://mongo:27017/people', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log('Could not connect to the database. Error...', err)
    process.exit()
  })

app.use('/', (req, res, next) => {
  const ln = req.query.lastName
  if (ln === undefined || ln.length < 1) return res.status(400).send('Missing required field: lastName')
  const fn = req.query.firstName
  if (fn === undefined || fn.length < 1) return res.status(400).send('Missing required field: firstName')
  next()
})

app.all(
  '/',
  (req, res) => {
    const newName = new mongoose.models.Names({
      lastName: req.query.lastName,
      firstName: req.query.firstName
    })
    Names.exists(
      { lastName: newName.lastName, firstName: newName.firstName },
      async (err, result) => {
        if (err) {
          console.log(err.message)
          res.send(err)
        }
        return result
          ? res
            .status(200)
            .send(
                  `firstName: ${newName.firstName}, lastName: ${newName.lastName}`
            )
          : await newName.save().then(() => {
            res.status(201).send('Created New Record!')
          })
      }
    )
  }
)

const port = 4000

app.listen(port, () => {
  console.log(`Server running... listening on port ${port}`)
})
