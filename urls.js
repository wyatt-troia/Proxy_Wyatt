module.exports = {
  bookings: {
    ssr:
      "http://ec2co-ecsel-14mqx2j7r6mip-726135605.us-east-2.elb.amazonaws.com:9005/renderBooking",
    bundle: "https://s3.amazonaws.com/topbunk/bundle.js"
  },
  description: {
    ssr:
      "http://ec2co-ecsel-uzede5a0l6oa-1604819410.us-east-1.elb.amazonaws.com:7000/renderDescription",
    bundle: "https://s3.amazonaws.com/topbunk-nyc-description/bundle.js"
  }
};
