# Hybrid Native Mobile App - CarsBnb

A cross platform mobile app for Car Sharing. 

It makes use
of the open source cross platform <b>Ionic Framework</b>. This application allows
users to rent cars and put up used cars for rent.

# Fetures
<ul>
<li>Fast - Near native app performance with Ionic Framework </li>
<li>It uses the Camera API to allow users to take pictures of the car when listing</li>
<li>Location sensors and API is used to show nearby cars</li>
<li>Password hashing using SHA 256</li>
<li> OTP for login using Google Authenticator integration </li>
</ul>

# Tech stack
<ul>
  <li>Ionic Framework</li>
  <li>React JS</li>
  <li>Node JS</li>
  <li>Mysql</li>
  <li>Sequelize ORM</li>
  <li>Android Studio</li>
 </ul>

 # Preview
<img height="300" src="https://github.com/harishankar0301/mobile-app-carsbnb/images/car-listing.jpg"></img>
 
 # Structure:
src folder has the frontend React code, backend folder has the node.js code.

Android folder contains the compiled code for android, this can be built using Android studio.

# Build and run

Install the dependencies using 
`npm install`

To build react code

`npm run build`

Building to Native Code

`npx cap sync`

Open the built code in Android studio IDE

`npx cap open android`


