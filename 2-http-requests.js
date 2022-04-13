const axios = require("axios");

// cb = (error, resp) => {}

const fetchData = (urlQuery, cb) => {
  axios
    .get(
      "http://api.weatherstack.com/current?access_key=329fd98d41784dc8277053d7243cffad&query=" +
        urlQuery
    )
    .then((response) => response.data)
    .then((data) => {
      if (data.error) {
        cb({ message: data.error.info }, undefined);
      } else {
        cb(undefined, data.current.temperature);
      }
    })
    .catch((error) => {
      // we should callback with error to our delegatee
      cb({ message: "network not available" }, undefined);
    });
};

module.exports = { fetchData };
