import User, { UserDto } from "../dto/users.model";
import debug from "debug";

const log: debug.IDebugger = debug("app:db-dao");

class UsersDao {
  private static instance: UsersDao;

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
   * @returns the new users _id for confirmation
   */
  async addUser(user: UserDto) {
    try {
      const { _id } = await User.create(user);
      return _id;
    } catch (e) {
      debug.log("Failed creating user");
      throw new Error(e);
    }
  }

  /**
   * Get all users
   * @returns all users and their details
   */
  async getUsers() {
    return User.find();
  }

  /**
   * Get a single user by their _id
   * @param userId
   * @returns the users details
   */
  async getUserById(userId: string) {
    try {
      return (await User.findById(userId)) as UserDto;
    } catch (e) {}
  }

  /**
   * Update a User with all fields provided
   * @param user
   * @returns the confirmation message
   */
  async putUserById(user: any) {
    try {
      const { _id } = (await User.findByIdAndUpdate(user.userId, {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        permissionLevel: user.permissionLevel,
      })) as UserDto;

      return `${_id} updated via put`;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update a User by the values provided
   * @param user
   * @returns the confirmation message
   */
  async patchUserById(user: any) {
    try {
      const currentUser = (await User.findById(user.userId)) as UserDto;

      const allowedPatchFields = [
        "password",
        "firstName",
        "lastName",
        "permissionLevel",
      ];

      // Only update allowed fields
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

  /**
   * Remove a user by their id
   * @param userId
   */
  async removeUserById(userId: string) {
    try {
      await User.findByIdAndDelete(userId);
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
