import http from "http"
import appInsights from "applicationinsights"

appInsights.setup("2a1cf93a-e43d-4c8c-b98a-561f495a8dca").start();
let client = appInsights.defaultClient;
client.trackEvent({ name: "my custom event", properties: { customProperty: "custom property value" } });
client.trackException({ exception: new Error("handled exceptions can be logged with this method") });
client.trackMetric({ name: "custom metric", value: 3 });
client.trackTrace({ message: "trace message" });
client.trackRequest({ name: "GET /books", url: "http://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Jr0JYiBMPAbMRkCiaO94YG5sdsC5v3bt", duration: 309, resultCode: 200, success: true });

http.createServer((req, res) => {
    client.trackNodeHttpRequest({ request: req, response: res }); 
});