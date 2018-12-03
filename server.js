require("newrelic");

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const parser = require("body-parser");
const app = express();
const port = 9000;
const urls = require("./urls");

app.use(parser.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const ssr = async id => {
  let props = await models.getListing(id);
  let component = React.createElement(Booking, props);
  let ssr_html = ReactDOMServer.renderToString(component);
  return { ssr_html, props };
};

app.get("/listings", async (req, res) => {
  let id = req.query.id;
  console.log(`${urls.bookings.ssr}?id=${id}`);
  let results = await axios(`${urls.bookings.ssr}?id=${id}`);
  let { ssr_html: booking_html, props: booking_props } = results.data;

  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Staybnb</title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
  
      <link
        rel="stylesheet"
        type="text/css"
        href="http://ec2co-ecsel-14mqx2j7r6mip-726135605.us-east-2.elb.amazonaws.com:9005/guestBar.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="http://ec2co-ecsel-14mqx2j7r6mip-726135605.us-east-2.elb.amazonaws.com:9005/_datepicker.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="http://ec2co-ecsel-14mqx2j7r6mip-726135605.us-east-2.elb.amazonaws.com:9005/flexboxgrid2.css"
      />
      <link type="text/css" rel="stylesheet" href="styles.css" />
  
      <link rel="icon" type="image/png" href="/favicon.png" />
    </head>
    <body>
      <div id="description"></div>
      <div class="container-left">
        <div id="reviews"></div>
        <div id="neighborhood"></div>
      </div>
      <div class="container-right">${booking_html}<div id="booking"></div></div>
      <script
        crossorigin
        src="https://unpkg.com/react@16/umd/react.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      ></script>
      <!-- <script src="http://3.16.89.66/app.js"></script> -->
      <!-- Dev's bundle -->
      <!-- <script src="http://52.14.238.117/bundle.js"></script> -->
      <!-- Louis's bundle -->
      <!-- <script src="${urls.bookings.bundle}"></script> -->
      <!-- Stacy's bundle -->
      <!--
        <script src="http://18.218.27.164/bundle.js"></script>
        <script>
          ReactDOM.render(
            React.createElement(Neighborhood),
            document.getElementById('neighborhood')
          );
        </script>
      -->
    </body>
  </html>`);
});

// Add DAVID's API endpoints
app.get("/listingdata", (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios
    .get(`http://3.16.89.66/listingdata?id=${requestId}`)
    .then(results => res.send(results.data))
    .catch(err => console.error(err));
});

app.get("/neighborhooddata", (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios
    .get(`http://3.16.89.66/neighborhooddata?id=${requestId}`)
    .then(results => res.send(results.data))
    .catch(err => console.error(err));
});

app.get("/landmarkdata", (req, res) => {
  let lat = req.query.listingLat;
  let long = req.query.listingLong;
  axios
    .get(`http://3.16.89.66/landmarkdata?listingLat=${lat}&listingLong=${long}`)
    .then(results => res.send(results.data))
    .catch(err => console.error(err));
});

// Add STACY's API endpoints
app.get("/ratings", (req, res) => {
  axios
    .get(`http://18.218.27.164${req.url}`)
    .then(results => {
      // console.log(results.data);
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

app.get("/reviews", (req, res) => {
  axios
    .get(`http://18.218.27.164${req.url}`)
    .then(results => {
      // console.log(results.data);
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

app.get("/search", (req, res) => {
  axios
    .get(`http://18.218.27.164${req.url}`)
    .then(results => {
      // console.log(results.data);
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

// Add Dev's API endpoints
app.get("/description", (req, res) => {
  axios
    .get(`http://52.14.238.117${req.url}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

// Add Louis's API endpoints
app.get("/bookinglisting/:id", (req, res) => {
  let id = req.params.id;
  axios
    .get(`http://18.216.104.91/bookinglisting/${id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
