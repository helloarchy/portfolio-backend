import User, { UserDto } from "../dto/users.model";
import debug from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  private static instance: UsersDao;
  // users: Array<UserDto> = [];

  constructor() {
    log("Created new instance of UsersDao");
  }

  static getInstance(): UsersDao {
    if (!UsersDao.instance) {
      UsersDao.instance = new UsersDao();
    }
    return UsersDao.instance;
  }

  /**
   * Add a new user
   * @param user
   */
  async addUser(user: UserDto) {
    try {
      const newUser = await User.create(user);
      return newUser._id;
    } catch (e) {
      debug.log("Failed creating user");
      throw new Error(e);
    }
  }

  async getUsers() {
    return User.find();
  }

  async getUserById(userId: string) {
    try {
      return (await User.findById(userId)) as UserDto;
    } catch (e) {
    }
  }

  /**
   * Update a User with all fields provided
   * @param user
   */
  async putUserById(user: any) {
    try {
      const updatedUser = (await this.getUserById(user.userId)) as UserDto;

      updatedUser.email = user.email;
      updatedUser.password = user.password;
      updatedUser.firstName = user.firstName;
      updatedUser.lastName = user.lastName;
      updatedUser.permissionLevel = user.permissionLevel;

      await updatedUser.save();

      return `${updatedUser._id} updated via put`;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update a User by the values provided
   * @param user
   */
  async patchUserById(user: any) {
    try {
      const currentUser = (await this.getUserById(user.userId)) as UserDto;

      const allowedPatchFields = [
        "password",
        "firstName",
        "lastName",
        "permissionLevel",
      ];

      for (let field of allowedPatchFields) {
        if (field in user) {
          // @ts-ignore
          currentUser[field] = user[field];
        }
      }

      await currentUser.save();

      return `${user._id} patched`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async removeUserById(userId: string) {
    const currentUser = (await this.getUserById(userId)) as UserDto;
    try {
      await currentUser.remove();
      return `${userId} removed`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserByEmail(email: string) {
    const currentUser = await User.findOne({ email: email });
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }
}

export default UsersDao.getInstance();
