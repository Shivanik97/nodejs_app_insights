import http from 'node:http'
import * as appInsights from "applicationinsights"
import callLogsSample from "./call-logs-sample.js";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

appInsights.setup("InstrumentationKey=53db3c93-36d7-4f5d-9f0a-b23c274d69dd;IngestionEndpoint=https://centralindia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://centralindia.livediagnostics.monitor.azure.com/")
  .setAutoCollectConsole(true, true)
  .start();

callLogsSample();  

const methodName = "My method";
const count = 19;

console.log("Function %s is called %d times ", methodName, count);  
console.info("Here is a sample info"); // severity level: 1
console.warn("Here is a sample warn"); //severity level: 2
console.error("Here is a sample error"); //severity level: 2
