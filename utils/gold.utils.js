import { goldPriceTracker } from '../config/credential.js'

export const generateGoldPrice = function () {
  const newPrice = 4000 + Math.floor(Math.random() * 1000)
  if (goldPriceTracker.length === 30) {
    goldPriceTracker.shift()
  }
  goldPriceTracker.push({
    date: new Date().toISOString().split('T')[0],
    price: newPrice,
  })
  return newPrice
}

export const getBestPrice = function (min = 0, max = 30) {
  try {
    const goldPrices = goldPriceTracker.slice(min, max)
    let minPrice = Infinity
    goldPrices.forEach((node) => {
      minPrice = Math.min(minPrice, node.price)
    })
    let a = goldPrices.find((node) => node.price === minPrice)
    return a
  } catch (e) {
    console.log(e)
  }
}
