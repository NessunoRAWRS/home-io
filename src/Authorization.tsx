// User interface
export interface IUser {
	name: string,
	roles: UserRoles[],
}

// Authorization state enum
// 0 - Not authorized
// 1 - Authorized
export enum AuthorizationState {
	NOT_AUTHORIZED,
	AUTHORIZED
}

// User roles
export enum UserRoles {
	ADMIN,
	USER,
	GUEST,
	NONE // BANNED?
}

// Utility functions for authorization purpose
export const isAuth = (user: IUser) => !!user
export const hasRole = (user: IUser, roles: UserRoles[]) => roles.some((role: UserRoles) => user.roles?.includes(role));