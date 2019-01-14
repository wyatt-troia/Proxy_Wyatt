# TopBunk Proxy Server
TopBunk is a full-stack web application that provides descriptions, reviews, and neighborhood information about hostels and allows users to book a stay. This proxy server integrates the following micro-services:
- [Booking](https://github.com/TopBunkNYC/Booking)
- [Description](https://github.com/TopBunkNYC/Description)
- [Reviews](https://github.com/TopBunkNYC/Reviews)
- [About the Neighborhood](https://github.com/TopBunkNYC/Neighborhood)

The proxy server features [Redis](https://redis.io/)-cached server-side-rendering and [React](https://reactjs.org/) hydration for low latency and time to first paint.

The GIF below provide a tour of the deployed proxy server, which brings together the description, booking, reviews, and about-the-neighborhood services into a unified application. 

<img src="https://imgur.com/XqY7aWR.gif" >

## Getting Started

First, start up all four services by following the setup instructions at their respective links above. 

The proxy server depends on a running Redis server.

Be sure to update the URLs in `server.js` as needed.

Then return here to set up the proxy server.

```
npm install
npm run start-dev
```

Then navigate to [http://localhost:9000](http://localhost:3001).

## Acknowledgments

- [Redis](https://redis.io/)
- [React](https://reactjs.org/)
- [Express](http://expressjs.com/)
