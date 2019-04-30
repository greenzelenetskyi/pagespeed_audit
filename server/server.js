require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { validateUrl, returnWebsiteAuditData } = require('./controllers/audit')

const app = express();

app.use(cors());

app.get('/api/audit', validateUrl, returnWebsiteAuditData);

app.listen(process.env.PORT || 3000, () => console.log('listens to a port' + process.env.PORT))