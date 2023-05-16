import http from "http"
import appInsights from "applicationinsights"
appInsights.setup("2a1cf93a-e43d-4c8c-b98a-561f495a8dca").start();
const getPosts = () => {
    let data = '';
    const startTime = new Date();

    const request = http.get('http://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Jr0JYiBMPAbMRkCiaO94YG5sdsC5v3bt', (response) => {
        // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
        response.setEncoding('utf8');

        // As data starts streaming in, add each chunk to "data"
        response.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        response.on('end', () => {
            const responseTimeInMs = new Date() - startTime;
            appInsights.defaultClient.trackRequest({
                name: "Third-Party API Request",
                url: "http://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Jr0JYiBMPAbMRkCiaO94YG5sdsC5v3bt",
                duration: responseTimeInMs,
                resultCode: response.statusCode,
                success: response.statusCode >= 200 && response.statusCode < 400,
                properties: { someCustomProperty: "example" }
            });
        });
    });

    // Log errors if any occur
    request.on('error', (error) => {
        console.error(error);
    });

    // End the request
    request.end();
};

getPosts();