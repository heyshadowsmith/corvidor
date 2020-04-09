module.exports = {
  name: 'Post Example',
  description: 'This is an example POST route.',
  method: 'POST',
  path: '/',
  queries: [],
  logic(req) {
    return 'Updated'
  }
}