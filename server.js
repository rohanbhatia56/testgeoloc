const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const listOfGeoLocation = [
    {
      latLng: { lat: 12.899120, lng: 77.650572 },
      name: "avocado",
      asset: "images/airbnb.png"
    },
    {
      latLng: { lat: 12.899092, lng: 77.650566 },
      name: "amazon",
      asset: "images/amazon.png"
    },
    {
      latLng: { lat: 12.899060, lng: 77.650556 },
      name: "apple",
      asset: "images/apple.png"
    },
    {
      latLng: { lat: 12.899040, lng: 77.650552 },
      name: "epic-games",
      asset: "images/epic-games.png"
    },
    {
      latLng: { lat: 12.899022, lng: 77.650547 },
      name: "lg",
      asset: "images/lg.png"
    },
    {
      latLng: { lat: 12.899004, lng: 77.650546 },
      name: "motorola (1)",
      asset: "images/motorola (1).png"
    },
    {
      latLng: { lat: 12.898977, lng: 77.650539 },
      name: "motorola",
      asset: "images/motorola.png"
    },
    {
      latLng: { lat: 12.899120, lng: 77.650572 },
      name: "nokia (1)",
      asset: "images/nokia (1).png"
    },
    {
      latLng: { lat: 12.898951, lng: 77.650532 },
      name: "nokia",
      asset: "images/nokia.png"
    },
    {
      latLng: { lat: 12.898888, lng: 77.650521 },
      name: "sony",
      asset: "images/sony.png"
    },
    {
      latLng: { lat: 12.898790, lng: 77.650498 },
      name: "windows",
      asset: "images/windows.png"
    },
    {
      latLng: { lat: 12.898720, lng: 77.650485 },
      name: "sony",
      asset: "images/sony.png"
    },
    {
      latLng: { lat: 12.898621, lng: 77.650464 },
      name: "nokia",
      asset: "images/nokia.png"
    },
    {
      latLng: { lat: 12.898492, lng: 77.650439 },
      name: "nokia (1)",
      asset: "images/nokia (1).png"
    },
    {
      latLng: { lat: 12.898433, lng: 77.650429 },
      name: "motorola",
      asset: "images/motorola.png"
    },
    {
      latLng: { lat: 12.898337, lng: 77.650414 },
      name: "motorola (1)",
      asset: "images/motorola (1).png"
    },
    {
      latLng: { lat: 12.898243, lng: 77.650400 },
      name: "lg",
      asset: "images/lg.png"
    },
    {
      latLng: { lat: 12.898148, lng: 77.650388 },
      name: "epic-games",
      asset: "images/epic-games.png"
    },
    {
      latLng: { lat: 12.898148, lng: 77.650388 },
      name: "apple",
      asset: "images/apple.png"
    },
    {
      latLng: { lat: 12.898058, lng: 77.650377 },
      name: "amazon",
      asset: "images/amazon.png"
    },
    {
      latLng: { lat: 12.897900, lng: 77.650363 },
      name: "airbnb",
      asset: "images/airbnb.png"
    }
  ];

const app = express();
const port = 3000;

app.use('/images', express.static(path.join(__dirname, 'data')));
app.use(bodyParser.json());

// Get all nearby
app.get('/api/nearby', (req, res) => {
  // Check if there's a "title" query parameter in the URL
const current_lat = req.query.lat;
const current_lng = req.query.lng;
const radius = req.query.radius;

const nearbyLocations = [];
for (const location of listOfGeoLocation) {
    const lat = location.latLng.lat
    const lng = location.latLng.lng
    const distance = haversineDistance(current_lat, current_lng, lat, lng);
    if(distance<radius){
        nearbyLocations.push(location)
    }
}
return res.json(nearbyLocations);


//   if (titleQuery) {
//     // Filter books by title
//     const filteredBooks = books.filter((book) =>
//       book.title.toLowerCase().includes(titleQuery.toLowerCase())
//     );
//     return res.json(filteredBooks);
//   }

  // If no title query parameter, return all books
//   res.json(books);
});

// ... (Other routes for single book, add book, update book, and delete book)

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371.0; // Earth's radius in kilometers
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance*1000;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
