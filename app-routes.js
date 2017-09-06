const metadataUrl = 'http://169.254.169.254/latest/meta-data';
const axios = require('axios');
module.exports = setupRoutes;

function setupRoutes(app) {
  app.get('/', (req, res) => {
    res.redirect('/public-ip');
  });

  app.get('/public-ip', (req, res, next) => {
    axios.get(`${metadataUrl}/public-ipv4`)
      .then(response => {
        const ip = response.data;
        res.send(`My Public IP Address: ${ip}`);
      })
      .catch(next);
  });

  app.get('/public-hostname', (req, res, next) => {
    axios.get(`${metadataUrl}/public-hostname`)
      .then(response => {
        const hostname = response.data;
        res.send(`My Public Hostname: ${hostname}`);
      })
      .catch(next);
  });

  app.post('/local-ip', (req, res, next) => {
    axios.get(`${metadataUrl}/local-ip`)
      .then(response => {
        const ip = response.data;
        res.send(`My Local IP Address: ${ip}`);
      })
      .catch(next);
  });

  app.get('/local-hostname', (req, res, next) => {
    axios.get(`${metadataUrl}/local-hostname`)
      .then(response => {
        const hostname = response.data;
        res.send(`My Local Hostname: ${hostname}`);
      })
      .catch(next);
  });

  app.get('/instance-info', (req, res, next) => {
    const instance = {};
    axios.get(`${metadataUrl}/instance-type`)
      .then(response => {
        instance.type = response.data;
        return axios.get(`${metadataUrl}/instance-id`)
      })
      .then(response => {
        instance.id = response.data;
        res.send(`Instance: ${instance.id} ${instance.type}`);
      })
      .catch(next);
  });
}