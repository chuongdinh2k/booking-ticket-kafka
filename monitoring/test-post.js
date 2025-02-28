import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 5000 }, // Ramp up to 5000 users over 30 seconds
    { duration: '1m', target: 200 }, // Stay at 200 users for 1 minute
    { duration: '10s', target: 0 }, // Ramp down to 0 users
  ],
  // Add thresholds to handle failed requests better
  thresholds: {
    http_req_failed: ['rate<0.01'], // Allow 1% of requests to fail
  },
};

// Define your endpoints
const order_create_endpoint = 'http://localhost:3000/orders';

export default function () {
  // Define headers for JSON content
  const headers = {
    'Content-Type': 'application/json',
  };

  // Sample payload for creating an order
  const payload = JSON.stringify({
    user_id: 1,
    tickets: [Math.floor(Math.random() * 5000) + 6000],
    price: Math.floor(Math.random() * 2000) + 50,
  });

  // Make POST request
  let res = http.post(order_create_endpoint, payload, { headers });

  // First check if response exists and has a valid status
  check(res, {
    'response received': (r) => r !== null,
    'status is 201': (r) => r !== null && r.status === 201,
  });

  // Only try to process JSON if we got a valid response
  if (res && (res.status === 201 || res.status === 200)) {
    try {
      const responseBody = res.json();
      check(responseBody, {
        'has valid response': (body) => body && body.id !== undefined,
        'response time is less than 500ms': () => res.timings.duration < 500,
      });
    } catch (e) {
      console.log(`Failed to parse JSON: ${e.message}`);
    }
  }

  // Wait between requests
  sleep(1);
}

// to run:
// k6 run /Users/nelisoftwares/Documents/microservices/book-tickets-kafka/monitoring/test-post.js
