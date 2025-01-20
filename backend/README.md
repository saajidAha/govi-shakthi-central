## Project Structure
```
/govishakthi-app/backend
├── /src              # All the TypeScript files and directories
├── /dist             # All the compiled JavaScript files
├── /src/index.ts     # Main entry point for the Node.js server
├── /config           # Database and server configuration
├── package.json      # Backend dependencies and scripts
```
### Technologies / Dependencies
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database solution 

To start the backend server, run:
```bash
npm install // install neccesary dependencies
npm run dev // Compiles the .ts files to .js and run 
```

The server will be running on `http://localhost:7000`.