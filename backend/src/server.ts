import {MainController} from "./MainController";
import {MainService} from "./MainService";
import {LLMService} from "./LLMService";
import {MainRepository} from "./MainRepository";

// initialize the database connection
MainRepository.init();
// initialize Controller with required dependencies
new MainController(7000, new MainService(new LLMService(), new MainRepository())).start();
