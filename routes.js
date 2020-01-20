const handlerRequest = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Assignment Nr 1. - Home</title></head>');
    res.write(`
      <body>
        <h1>Halika!</h1>
        <form action="/create-user" method="POST">
          <input type="text" name="username" />
          <button type="submit">Send</button>
        </form>
      </body>`);
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Assignment Nr 1. - Users</title></head>');
    res.write('<body><h1>Users</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const [key, value] = parsedBody.split('=');
      console.log(value);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
};

module.exports = handlerRequest;