export default class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  createUser = async (userData) => {
    try {
      return await this.userRepository.createUser(userData);
    } catch (err) {
      throw err;
    }
  };

  updateUser = async (userData) => {
    try {
      return await this.userRepository.updateUser(userData);
    } catch (err) {
      throw err;
    }
  };

  deleteUser = async (userId) => {
    try {
      return await this.userRepository.deleteUser(userId);
    } catch (err) {
      throw err;
    }
  };

  getUser = async (userId) => {
    try {
      return await this.userRepository.getUser(userId);
    } catch (err) {
      throw err;
    }
  };

  getUsers = async (userReq) => {
    try {
      return await this.userRepository.getUsers(userReq);
    } catch (err) {
      throw err;
    }
  };

  getByCredentials = async (userReq) => {
    try {
      return await this.userRepository.getByCredentials(userReq);
    } catch (err) {
      throw err;
    }
  };
}
