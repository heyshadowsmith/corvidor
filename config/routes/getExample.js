module.exports = {
  name: 'Get Example',
  description: 'This is an example GET route.',
  method: 'GET',
  path: '/',
  queries: [],
  logic(req) {
    return 'Gotten'
  }
}