import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/test', (req, res) => {
  res.send('Test')
})

app.use((req, res) => {
  res.send('ERROR 404')
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
