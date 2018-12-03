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

  let results = await Promise.all([
    axios(`${urls.bookings.ssr}?id=${id}`),
    axios(`${urls.description.ssr}?id=${id}`),
    axios(`${urls.reviews.ssr}?id=${id}`),
    axios(`${urls.neighborhood.ssr}?id=${id}`)
  ]);

  let { ssr_html: booking_html, props: booking_props } = results[0].data;
  let {
    ssr_html: description_html,
    props: description_props
  } = results[1].data;
  let { ssr_html: reviews_html, props: reviews_props } = results[2].data;
  let {
    ssr_html: neighborhood_html,
    props: neighborhood_props
  } = results[3].data;

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

      <!-- Neighborhood stylesheet -->
      <link
      rel="stylesheet"
      type="text/css"
      href="http://ec2co-ecsel-1r1awabnkqgzv-347745579.us-east-2.elb.amazonaws.com:8001/style.css"
      />
  
      <link rel="icon" type="image/png" href="/favicon.png" />
    </head>
    <body>
      
      <div class="container-left">
        <div id="description">${description_html}</div>
        <div id="reviews">${reviews_html}</div>
        <div id="neighborhood">${neighborhood_html}</div>
      </div>
      <div class="container-right"><div id="booking">${booking_html}</div></div>
      <script
        crossorigin
        src="https://unpkg.com/react@16/umd/react.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      ></script>

      <!-- Description -->
      <script src="${urls.description.bundle}"></script>
      <script>
        ReactDOM.hydrate(
          React.createElement(Description, ${description_props}),
          document.getElementById('description')
        );
      </script>

      <!-- Reviews -->
      <script src="${urls.reviews.bundle}"></script>
      <script>
        ReactDOM.hydrate(
          React.createElement(Reviews, ${reviews_props}),
          document.getElementById('reviews')
        );
      </script>

      <!-- Booking -->
      <script type="text/javascript" src="${urls.bookings.bundle}"></script>
      <script>
        ReactDOM.hydrate(
          React.createElement(Booking, ${JSON.stringify(booking_props)}),
          document.getElementById('booking')
        );
      </script>

      <!-- Neighborhood -->
      <script type="text/javascript" src="${urls.neighborhood.bundle}"></script>
      <script>
        ReactDOM.hydrate(
          React.createElement(Neighborhood, ${undefined}),
          document.getElementById('neighborhood')
        );
      </script>
    </body>
  </html>`);
});

// Neighborhood endpoints
app.get("/listingdata", (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios
    .get(`${urls.neighborhood.ssr}/listingdata?id=${requestId}`)
    .then(results => res.send(results.data))
    .catch(err => console.error(err));
});

app.get("/neighborhooddata", (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios
    .get(`${urls.neighborhood.ssr}/neighborhooddata?id=${requestId}`)
    .then(results => res.send(results.data))
    .catch(err => console.error(err));
});

app.get("/landmarkdata", (req, res) => {
  let lat = req.query.listingLat;
  let long = req.query.listingLong;
  axios
    .get(
      `${
        urls.neighborhood.ssr
      }/landmarkdata?listingLat=${lat}&listingLong=${long}`
    )
    .then(results => res.send(results.data))
    .catch(err => console.error(err));
});

// Reviews endpoints
app.get("/ratings", (req, res) => {
  axios
    .get(
      `http://ec2co-ecsel-1r1awabnkqgzv-347745579.us-east-2.elb.amazonaws.com:8001${
        req.url
      }`
    )
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

app.get("/reviews", (req, res) => {
  axios
    .get(
      `http://ec2co-ecsel-1r1awabnkqgzv-347745579.us-east-2.elb.amazonaws.com:8001${
        req.url
      }`
    )
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

app.get("/search", (req, res) => {
  axios
    .get(
      `http://ec2co-ecsel-1r1awabnkqgzv-347745579.us-east-2.elb.amazonaws.com:8001${
        req.url
      }`
    )
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
