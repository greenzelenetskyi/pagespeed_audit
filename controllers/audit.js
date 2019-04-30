const isUrl = require('validator/lib/isURL');
const getWebsiteSpeedAPIData = require('../models/pagespeed-api')

function validateUrl(req, res, next) {
    // isURL takes only a string as a parameter
    if (typeof req.query.url === 'string' && isUrl(req.query.url)) {
        return next();
    }
    res.status(400).json({ error: 'Bad request', message: 'Invalid URL' });
}

async function returnWebsiteAuditData(req, res) {
    try {
        res.json(extractNumericData(await getWebsiteSpeedAPIData(req.query.url)
        .then((data) => data.lighthouseResult.audits)));
    } catch (err) {
        res.status(500).json({ error: "Internal error", message: "Couldn't retrieve your website data" })
    }
}

// Returns only numeric scores, which still have room for improvement
function extractNumericData(websiteAuditDataObj) {
    const numericAuditData = [];
    Object.keys(websiteAuditDataObj).forEach(improvingOpportunity => {
        const opportunity = websiteAuditDataObj[improvingOpportunity];
        if (opportunity.scoreDisplayMode === 'numeric' && opportunity.score < 1) {
            // extracts only the props shown in the table
            const { title, description, score, displayValue } = opportunity;
            numericAuditData.push({ title, description, score, displayValue });
        }
    });
    return numericAuditData;
}

module.exports = {
    validateUrl,
    returnWebsiteAuditData
}
