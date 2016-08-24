// Basic example showing a function

name = "<NAME>!";
message = "Welcome to the function example, ";

console.log(message + name);

// Reading data in request
var payload = process.env.PAYLOAD;
if (payload) {
    try {
        payload_data = JSON.parse(payload);
        console.log("Received data: " + payload_data.data);
    }
    catch (e) {
        console.log("Error parsing JSON payload: " + e);
    }
}
