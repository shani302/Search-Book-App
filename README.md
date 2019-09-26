# SearchBookApp

Simple book search application that fetches book metadata from the Google Books API using Angular 8 and Bootstrap 4. including search of list books, book details page and login page.


## Usage

Clone and npm install. In order to use it with unlimited api calls, you have to generate and give your api key (API_KEY is attached for each request sent to Google Books API). Once you have the key, you need to copy it to the "src/assets/config/app_config.json" file in the "googleBooksApiKey" field.

{ "googleBooksApiKey": "..." }

This application is only using the "list" functionality of the books api, so no Oauth 2 is needed at all.

