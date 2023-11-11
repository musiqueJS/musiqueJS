const express = require('express')
const app = express()
const port = 3000

app.use(express.static('.'));
app.use(express.static('src'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(__dirname)
  console.log(`Example app listening on port ${port}`)
})
