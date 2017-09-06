const port = process.env.PORT || 3000;
const app = require('express')();

require('./app-routes')(app);

app.listen(port, () => {
  console.info(`EC2-metadata application is listening on port ${port}`)
});