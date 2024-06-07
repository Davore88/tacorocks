// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  // Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebaseConfig : {
  apiKey: "AIzaSyAViHrDjSUscR8tlUe8ct8l13ap5GkHrXw",
  authDomain: "tacowarrior-b032b.firebaseapp.com",
  projectId: "tacowarrior-b032b",
  storageBucket: "tacowarrior-b032b.appspot.com",
  messagingSenderId: "62282988459",
  appId: "1:62282988459:web:0f652714015c280adc70ee",
  measurementId: "G-F48Q6GG2EM"
} 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
