const axios = require('axios');
const trace = require('debug')('soundcloud-rp:trace');

module.exports = (config) => {

  function getTrackData(data) {
    trace('soundcloud.getTrackData', data.url);

    return axios.get('https://api-v2.soundcloud.com/resolve', {
      params: {
        client_id: data.clientId,
        url: data.url
      }
    }).then(response => response.data);
  }

  function sanitizeArtworkUrl(url) {
    trace('soundcloud.sanitizeArtworkUrl', url);

    return url.replace('large', 't500x500');
  }

  return {
    getTrackData,
    sanitizeArtworkUrl
  };
};