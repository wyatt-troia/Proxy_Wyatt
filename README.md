# TopBunk Proxy Server
TopBunk is a full-stack web application that provides descriptions, reviews, and neighborhood information about hostels and allows users to book a stay. This proxy server brings together the following four microservices to render the complete TopBunk application:
- [Booking](https://github.com/TopBunkNYC/Booking)
- [Description](https://github.com/TopBunkNYC/Description)
- [Reviews](https://github.com/TopBunkNYC/Reviews)
- [About the Neighborhood](https://github.com/TopBunkNYC/Neighborhood)

The GIF below provide a tour of the deployed proxy server, which brings together the description, booking, reviews, and about-the-neighborhood services into a unified application. 

<img src="https://imgur.com/XqY7aWR.gif" >

## Getting Started

First, start up all four services by following the setup instructions at their respective links above. Then return here to set up the proxy server.

```
npm install
npm run start-dev
```
Be sure to update the URLs in the server.js file as needed.

Then navigate to [http://localhost:9000](http://localhost:3001).
