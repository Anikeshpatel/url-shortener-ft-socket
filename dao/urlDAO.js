
const urls = []

module.exports = {
  addShortUrl: (data) => {
    urls.push(data)
  },
  getUrlById: (id) => {
    return urls.find(url => url.id === id)
  },
  markItDelivered: (id) => {
    const url = urls.find(url => url.id === id)
    if (url) {
      url.delivered = true
    }
  },
  getUrls: () => [...urls.map(url => ({...url}))]
}
