import {MainController} from "./controllers/MainController";
import {MainService} from "./services/MainService";
import {LLMService} from "./services/LLMService";
import {MainRepository} from "./repositories/MainRepository";

// initialize the database connection
MainRepository.init();
// initialize Controller with required dependencies
new MainController(7000, new MainService(new LLMService(), new MainRepository())).start();
