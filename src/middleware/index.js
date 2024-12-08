import thunk from "redux-thunk";
import logger from "./logger";
import authenticate from "./authenticate";
import { applyMiddleware } from "redux";

export default applyMiddleware(thunk, logger, authenticate);
