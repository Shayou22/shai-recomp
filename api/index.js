// api/index.js
const fs   = require('fs');
const path = require('path');

const VALID_CREDENTIALS = 'U2hheW91MjI6QVZJMTkwOWNvbnNlaWxzLg=='; // Shayou22:AVI1909conseils.

module.exports = function handler(req, res) {
  var auth = req.headers['authorization'] || '';
  if (auth.startsWith('Basic ') && auth.slice(6) === VALID_CREDENTIALS) {
    try {
      var htmlPath = path.join(process.cwd(), '_index.html');
      var html = fs.readFileSync(htmlPath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(html);
    } catch(e) {
      return res.status(500).send('Erreur lecture fichier: ' + e.message);
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="Shai", charset="UTF-8"');
  return res.status(401).send('Acces non autorise');
};
