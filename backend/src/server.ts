import {MainController} from "./MainController";
import {MainService} from "./MainService";
// initialize the RESTful Controller to handle HTTP Requests
new MainController(7000, new MainService()).start();
