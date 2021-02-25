# Dependencies
* debug is a module that we will use to avoid calling console.log() while developing 
  our application. This way, we can easily filter debug statements during 
  troubleshooting. They can also be switched off entirely in production instead 
  of having to be removed manually. 
  * https://github.com/visionmedia/debug#usage
* winston is responsible for logging requests to our API and the responses (and 
  errors) returned. express-winston integrates directly with Express.js, so that 
  all standard API-related winston logging code is already done.
* cors is a piece of Express.js middleware that allows us to enable cross-origin 
  resource sharing. Without this, our API would only be usable from front ends 
  being served from the exact same subdomain as our back end.

# Structure
Modules have their own responsibilities.
* Route configuration to define the requests our API can handle
* Services for tasks such as connecting to our database models, doing queries, 
  or connecting to external services that are required by the specific request
* Middleware for running specific request validations before the final controller 
  of a route handles its specifics
* Models for defining data models matching a given database schema, to facilitate 
  data storage and retrieval
* Controllers for separating the route configuration from the code that finally 
  (after any middleware) processes a route request, calls the above service 
  functions if necessary, and gives a response to the client
