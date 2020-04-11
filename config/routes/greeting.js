module.exports = {
  name: 'Greeting',
  description: 'Greeting will return a boring or custom greeting depending on the query parameters used.',
  method: 'GET',
  path: '/',
  queries: [
    {
      name: 'name',
      description: 'By providing a name, the greeting will be customized.',
      example: ''
    }
  ],
  logic(req) {
    if (req.query.name) {
      return `Hello, ${req.query.name}`
    }

    return 'Hello world'
  }
}