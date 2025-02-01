import { Server } from "./services/Server"
import { Controller } from "./controllers/Controller";
import { Repository } from "./repositories/Repository";
import { LLMService } from "./services/LLMService";

// Inject controller with required dependencies
const mainController: Controller = Controller.getInstance(Repository.getInstance(Server.MONGODB_URI), LLMService.getInstance(Server.API_KEY));

// Inject controller dependency and start the server
Server.getInstance(mainController).start();
