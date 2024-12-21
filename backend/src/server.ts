import {MainController} from "./MainController";
// initialize the RESTful Controller to handle HTTP Requests
const mainController: MainController = new MainController(7000);
mainController.start();
