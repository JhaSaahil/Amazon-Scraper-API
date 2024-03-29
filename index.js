const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5000 //for accessing the port

//const apiKey = 'f191956186faa0a8269a6171fb44b0a0'

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json()) //for parsing Json data

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scrapper API.')
})

//Get Product Details

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

//Get Product Reviews

app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

//Get Product Offers

app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

//Get Search Results

app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)) //Providing the port
