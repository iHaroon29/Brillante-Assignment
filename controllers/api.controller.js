const goldController = {
  generatePrice(req, res) {
    const price = Math.floor(Math.random() * 5000)
    return res.status(200).send({ date: new Date().toDateString(), price })
  },
  async getPrice(req, res) {
    const { id, time_range } = req.query
  },
  async updatePrice(req, res) {
    const response = await fetch('http://localhost:5500/api/v1/goldPrice')
    const data = await response.json()
    return res.status(200).send({ data })
  },
  async addItem(req, res) {},
}

export default goldController
