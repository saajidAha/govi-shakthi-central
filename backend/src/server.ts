import {MainController} from "./MainController";
import {MainService} from "./MainService";
import {LLMService} from "./LLMService";

// initialize Controller with required dependencies
new MainController(7000, new MainService(new LLMService())).start();
