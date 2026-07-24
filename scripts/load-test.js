/**
 * Automated API load testing script using Node http / fetch.
 * Simulates concurrent requests against key endpoints.
 */
import http from "node:http";

const BASE_URL = process.env.LOAD_TEST_URL || "http://localhost:5000";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "10", 10);
const TOTAL_REQUESTS = parseInt(process.env.TOTAL_REQUESTS || "100", 10);

async function runLoadTest() {
  console.log(`[Load Test] Target: ${BASE_URL}`);
  console.log(`[Load Test] Concurrency: ${CONCURRENCY}, Total Requests: ${TOTAL_REQUESTS}`);

  let completed = 0;
  let successful = 0;
  let failed = 0;
  const startTime = Date.now();

  const makeRequest = () => {
    return new Promise((resolve) => {
      const req = http.get(`${BASE_URL}/api/health`, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          successful++;
        } else {
          failed++;
        }
        completed++;
        resolve();
      });

      req.on("error", () => {
        failed++;
        completed++;
        resolve();
      });
    });
  };

  const pool = Array.from({ length: CONCURRENCY });
  let totalDispatched = 0;

  async function worker() {
    while (totalDispatched < TOTAL_REQUESTS) {
      totalDispatched++;
      await makeRequest();
    }
  }

  await Promise.all(pool.map(() => worker()));

  const totalTimeSeconds = (Date.now() - startTime) / 1000;
  const reqPerSec = (TOTAL_REQUESTS / totalTimeSeconds).toFixed(2);

  console.log(`\n--- Load Test Results ---`);
  console.log(`Completed: ${completed}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log(`Time taken: ${totalTimeSeconds.toFixed(2)}s`);
  console.log(`Throughput: ${reqPerSec} req/sec`);

  if (failed > 0) {
    process.exit(1);
  }
}

runLoadTest();
