const express = require('express')
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantsList: restaurantsList.results })
})

app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const restaurants = restaurantsList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keywords.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keywords.toLowerCase())
  })

  res.render('index', { restaurantsList: restaurants, keywords })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantsList.results.filter(restaurant => restaurant.id === Number(req.params.id))
  res.render('show', { restaurant: restaurant[0] })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
