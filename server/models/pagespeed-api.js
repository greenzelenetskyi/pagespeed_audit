const axios = require("axios");

const PAGESPEED_API_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

module.exports = async function getWebsiteSpeedAPIData(url) {
  try {
    const result = await axios.get(PAGESPEED_API_ENDPOINT, {
      params: {
        url,
        // webpage display format
        strategy: "desktop"
      }
    });
    if (result.error) {
      throw new Error();
    }
    return result.data;
  } catch (e) {
    console.log("google err");
  }
};
