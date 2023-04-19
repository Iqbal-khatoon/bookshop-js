# bookshop-js

A simple book store API in need of input validation/sanitization.

This is a part of the University of Wyoming's Secure Software Design Course (Spring 2023). This is the base repository to be forked and updated for various assignments. Alternative language versions are available in:

- [Go](https://github.com/andey-robins/bookshop-go)
- [Rust](https://github.com/andey-robins/bookshop-rs)

## Versioning

`bookshop-js` is built with:

- node version v16.19.0
- npm version 9.6.2
- nvm version 0.39.3

## Usage

Start the api using `npm run dev`

I recommend using [`httpie`](https://httpie.io) for testing of HTTP endpoints on the terminal. Tutorials are available elsewhere online, and you're free to use whatever tools you deem appropriate for testing your code.

## Analysis of the existing code
The primary issue is the absence of input validation, which causes various problems such as accepting any data type in any field (excluding null values which lead to server crashes), server crashes in case of malformed request bodies, and when requested data is missing from the database. Furthermore, the chargeCustomerForPO function is not implemented, and the user is not informed. Providing a message in the response to the user would be helpful.
**
Following is more detailed anaysis:
**
•	Lack of Input Validation: The codebase does not include any input validation mechanisms, which leaves the system vulnerable to various types of attacks such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF). Input validation is essential to ensure that the data received from users is safe and free from malicious payloads.
Recommendation: Implement proper input validation mechanisms at each input point, including request parameters, query parameters, request bodies, and headers. Use techniques such as white-list validation, regular expressions, and input sanitization to ensure that only valid and expected data is accepted by the system.

•	Lack of HTTPS: The codebase does not enforce HTTPS for communication between the client and server. This means that data transmitted over the network can be intercepted and potentially tampered with, leading to security breaches.
Recommendation: Implement HTTPS for all communication between the client and server to ensure that data is encrypted and secure during transmission. Use proper SSL/TLS certificates to establish secure connections and enforce HTTPS for all API endpoints.

•	Code Vulnerabilities: Upon review of the codebase, several potential vulnerabilities were identified, including the use of unsafe functions such as eval() and the lack of proper error handling in some places. These can lead to code injection attacks and unexpected behavior.
Recommendation: Avoid using unsafe functions such as eval() and implement proper error handling mechanisms to handle all possible error scenarios. Follow secure coding practices, such as input validation, output encoding, and parameterized queries, to mitigate code vulnerabilities.

•	Implement proper error handling mechanisms to handle invalid input errors. Return clear and informative error messages to the end user, indicating which input is invalid and how it can be rectified.
Recommendation: implement proper error handling and communicate invalid input errors to the end user in a clear and informative manner.

## Security concerns
The present system is already addressing the issue of SQL injection by preparing the queries to avoid special characters. This is because the query parameters are not turned into strings. However, it is necessary to establish an official error and activity log in the current application to simplify auditing of the program. To accomplish this, logs should be generated when data is created, updated, or deleted.

##Bugs
The only issue that was found was when generating a purchase order. The problem was that the query string only had two placeholders instead of the necessary three columns for the orders table. In the purchaseOrders.ts file, the createPurchaseOrder function lacks a ? in the db.run statement, resulting in server crashes when it is executed.

I have defined input validation rules and also used regular expression to validate the input e.g address.
