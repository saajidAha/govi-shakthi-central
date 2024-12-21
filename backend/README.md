## Project Structure
```
/govishakthi-app/backend
├── /src              # All the TypeScript files
├── /dist             # All the compiled JavaScript files (run 'tsc' command)
├── /src/server.ts    # Main entry point for the Node.js server
├── /config           # Database and server configuration
├── package.json      # Backend dependencies and scripts
```
### Technologies / Dependencies
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB/Mongoose**: Database solution (optional, modify as needed).

To start the backend server, run:
```bash
npm install // install neccesary dependencies
npm start // Run TypeScript files directly (Option 1)
npm run build // Compiles the .ts files to .js and run (Option 2)
```

The server will be running on `http://localhost:7000`.