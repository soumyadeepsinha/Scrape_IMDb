# Scrap_IMDb
This is a simple Node-js application to scrap some movie's information from IMDb website
---
By Inspecting Element from Browser, we get some jquery functions for Title, Ratings, Summery, etc of a movie and leter we use it in our application to scrap them.

## We need to understand about the page Request Headers and get some information aslo about encoding

* One of the important thing from Request Headers is the Accept-Encoding, to identify the type is gzip or json
* We even need to mention 'Accept' 'Accept-Language' also fo the Browser before we scrap safely without getting our id banned! 

### Here we need some of npm modules, like: require, require-promise, cheerio & json2csv

### We also filesystem(fs) to create a csv file
