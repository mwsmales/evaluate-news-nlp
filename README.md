# Evaluate News Project

## Introduction

I wrote this as part of the Udacity Front End Web Developer Nanodegree.  The site is fairly simple, but it was my first experience building a project using webpack, babel and a separate development and production environment.

## Usage

The site analzes the sentiment of a single paragraph of text.  Past the text you want to analyze into the form, and hit anazlye!  This project uses MeaningCloud's Sentiment Analysis API.  See the documentation there for a description of what the results mean. 

## Installation 

* Clone the repo to your local machine
* Install node.js
* Run `npm install`
  to install dependencies 
* Run `npm run build-prod`
* Run `npm run start` to start the local server
* Open a browser and go to `localhost:8081`
* You'll need to set up a MeaningCloud account (meaningcloud.com) and enter your own API key.  When you have done that, save the key by creating a `".env"` file in the root directory.  Enter one line of text: `API_KEY=**************************` and save the file.
