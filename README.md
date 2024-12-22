# Notion Clone 📝
A simplified version of the popular note-taking application, built with React and Redux. This project allows users to manage notes effectively with authentication and state management powered by Redux and API integration.

## Features
- **User Authentication**: Secure login and registration functionalities.
- **Notes Management**: Add, edit, and delete notes with real-time updates.
- **Protected Routes**: Ensure that sensitive pages are accessible only to authenticated users.
- **Clean UI Design**: Simple and intuitive interface for better usability.
  
## Technologies Used
- React
- Redux
- JavaScript
- CSS

## Installation and Setup
Clone the repository:
```bash
git clone https://github.com/hoyten/notion.git
```

Navigate to the project directory:
```bash
   cd notion
   ```

Install dependencies:
```bash
   npm install
   ```
Start the development server:
```bash
   npm start
   ```

Open in your browser:
```
   http://localhost:3000
   ```

## Components Overview
### ProtectedRoute.jsx
Ensures only authenticated users can access certain routes.

### pages Directory:
Contains main application pages such as Login, Register, Notes, and more.

### api Directory:
Manages API calls for users and notes.

### redux Directory:
Handles global state management for users and notes.

## Future Enhancements
- **Rich Text Editor**: Enhance the note editor with text formatting options.
- **Cloud Sync**: Add persistent storage for user notes using a database.
- **Dark Mode**: Add a dark theme for better accessibility.

## License
This project is licensed under the MIT License. 📝

Feel free to reach out with any questions or suggestions! 😊
