# Apollo Refactor ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This web application allows users to search for book information by entering the name of a book. The app retrieves data using the Google Books API and displays detailed information about the book(s). The application is built using modern web development technologies, including MongoDB and Apollo for database management and API integration.

## Features

- Search for books by title using the Google Books API.
- Display book details such as title, author(s), description, and cover image.
- Save favorite books to a MongoDB database.
- Apollo GraphQL for seamless API communication.

## Technologies Used

- **Frontend**: React (or specify the framework you used)
- **Backend**: Node.js, Apollo Server
- **Database**: MongoDB
- **API**: Google Books API
- **Styling**: CSS (or mention other libraries/frameworks used)

## Installation

1. Clone the repository:
   ```bash
   git git@github.com:IsaiahSkidmore/apollo-refactor.git
   cd google-books-search
   ```

2. Install dependencies for both client and server:
   ```bash
   npm install
     ```

3. Set up environment variables:
   Create a `.env` file in the `server` directory and add the following:
   ```env
   MONGO_URI=your_mongo_database_uri
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```

4. Start the application:
   - Start the server:
     ```bash
     npm run develop
       ```

5. Open the application in your browser:
   Navigate to `http://localhost:3000`.

## Usage

1. Enter a book title in the search bar.
2. Click the "Search" button to retrieve book data from the Google Books API.
3. View detailed book information, including title, author(s), description, and cover image.
4. Save your favorite books to the database.


## API Integration

This app uses the Google Books API to fetch book information. Learn more about the Google Books API [here](https://developers.google.com/books).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to:

- **Email**: isaiahschardt0617@gmail.com
- **GitHub**: [Isaiah Skidmore](https://github.com/IsaiahSkidmore)
