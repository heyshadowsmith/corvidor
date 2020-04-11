module.exports = {
  name: 'Delete Example',
  description: 'This is an example DELETE route.',
  method: 'DELETE',
  path: '/',
  queries: [],
  logic(req) {
    return 'Deleted'
  }
}