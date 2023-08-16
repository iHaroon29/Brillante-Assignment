import { goldPriceTracker } from '../config/credential.js'

export const generateGoldPrice = function () {
  const newPrice = 4000 + Math.floor(Math.random() * 1000)
  if (goldPriceTracker.length === 30) {
    goldPriceTracker.shift()
  }
  goldPriceTracker.push(newPrice)
  return newPrice
}

export const getBestPrice = function (min = 0, max = 30) {
  try {
    const goldPrices = goldPriceTracker.slice(min, max)
    let minPrice = Infinity
    goldPrices.forEach((price) => {
      minPrice = Math.min(minPrice, price)
    })
    const date = new Date()
    const index = goldPrices.indexOf(minPrice)
    date.setDate(date.getDate() - index)
    return { minPrice, date }
  } catch (e) {
    console.log(e)
  }
}

export const getCurrentPrice = function () {
  return goldPriceTracker[0]
}
