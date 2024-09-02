/**
 * DTO representing a user's profile.
 *
 * @property {string} id - The user's ID.
 * @property {string} name - The user's name.
 * @property {string} email - The user's email address.
 * @property {UserRole} role - The user's role.
 * @property {boolean} isBanned - Whether the user is banned or not.
 */
export class UserProfileDto {
  /**
   * The user's ID.
   */
  id: string;

  /**
   * The user's name.
   */
  name: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's role.
   */
  role: UserRole;

  /**
   * Whether the user is banned or not.
   */
  isBanned: boolean;
}

export enum UserRole {
  /**
   * Administrator user role
   */
  ADMIN = 'admin',
  /**
   * Regular user role
   */
  USER = 'user',
}
