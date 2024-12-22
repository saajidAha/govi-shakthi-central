import {MainController} from "./MainController";
import {MainService} from "./MainService";
import {LLMService} from "./LLMService";
// initialize the RESTful Controller to handle HTTP Requests
new MainController(7000, new MainService(new LLMService())).start();
