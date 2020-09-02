<img src="https://i.imgur.com/h67v7gK.png" alt="InstaLytics" width="400px" />

## Introduction
Intelliquote is an intelligent, A.I graphic design tool that generates beautiful graphics with quotes. This application uses image recognition to detect labels in a given image, and then chooses an appropriate spiritual quote according to the detected labels. 

This application makes use of the **Google Cloud Vision API** for image detection, and uses the **Algolia API** to query a pre-built search index. The application has been built using **Vue.js** and **Express.js**

## Screenshots

| Main page                            | Upload image from device camera      | 
| ------------------------------------ | ------------------------------------ | 
| ![](https://i.imgur.com/W6V3Lf1.png) | ![](https://i.imgur.com/DSDIxFM.png) | 

| Example input                        | Output                               | 
| ------------------------------------ | ------------------------------------ | 
| <img src="https://i.imgur.com/Ohr58fU.jpg" width="1200px" /> | ![](https://i.imgur.com/Cc3IMrN.png) |

| Detected labels                      | Multiple relevant quotes matched     | 
| ------------------------------------ | ------------------------------------ | 
| ![](https://i.imgur.com/ONoDVru.png) | ![](https://i.imgur.com/Hpab3qx.png) | 

## Running locally

If you would like to run this locally, simply run the following command in this directory:

npm run dev --silent

The dependencies have been installed in "node_modules". If for some reason you are having issues with dependencies then delete this folder and run:

npm install

Which will reinstall the dependencies.
