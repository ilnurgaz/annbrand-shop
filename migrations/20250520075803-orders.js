module.exports = {
  async up(db) {
    db.createCollection('orders')
  },

  async down(db) {
    db.collection('orders').drop()
  },
}
