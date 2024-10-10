const axios = require('axios');
const trace = require('debug')('soundcloud-rp:trace');
const DataURIParser = require('datauri/parser');
const url_parser = require('url').parse;
const path = require('path');

function imageDataFromFile(pathname) {
  trace('image.imageDataFromFile', pathname);

  // Import the DataURIParser class from the datauri package
  const DataURIParser = require('datauri/parser');
  const datauri = new DataURIParser();

  return new Promise((resolve, reject) => {
    // Use the format method of the DataURIParser instance
    datauri
      .encodeFromFile(pathname)
      .then((content) => resolve(content))
      .catch(reject);
  });
}

function imageDataFromUrl(url) {
  trace('image.imageDataFromUrl', url, typeof url);

  // Import the DataURIParser class from the datauri package
  const datauri = new DataURIParser();

  return new Promise((resolve, reject) => {
    axios.get(url, {
      responseType: 'arraybuffer'
    })
    .then((response) => {
      const buffer = response.data;
      let parsed = url_parser(url);
      const filename = path.basename(parsed.pathname);

      // Use the format method of the DataURIParser instance
      const content = datauri.format(filename, buffer).content;
      resolve(content);
    })
    .catch(reject);
  });
}

module.exports = {
  imageDataFromUrl,
  imageDataFromFile
};
