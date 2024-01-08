import awilix from "awilix";

import UserController from "./controllers/userController.js";
import UserService from "./services/userService.js";
import UserRepository from "./repositories/userRepository.js";

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

export const setup = () => {
  container.register({
    userController: awilix.asClass(UserController),
    userService: awilix.asClass(UserService),
    userRepository: awilix.asClass(UserRepository),
  });
};
