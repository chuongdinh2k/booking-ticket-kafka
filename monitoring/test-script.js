import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 5000 },
    { duration: '1m', target: 200 },
    { duration: '10s', target: 0 },
  ],
};
const event_endpoint = 'http://localhost:3001/events/tickets/99';
const order_endpoint = 'http://localhost:3000/orders/985';
const url = event_endpoint;
export default function () {
  let res = http.get(url);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

// to run:

// k6 run /Users/nelisoftwares/Documents/microservices/book-tickets-kafka/monitoring/test-script.js
