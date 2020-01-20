// @flow
import store from "lk/redux/store.js";



const NO_PERMISSIONS = 0;
const READ_PERMISSIONS = 1;
const CREATE_PERMISSIONS = 2;
const UPDATE_PERMISSIONS = 4;
const DELETE_PERMISSIONS = 8;



// Returns permission of entity or 0 (no permissions)
function getPermissions( entity: string ): number
{
	const state = store.getState();

	const permissionsEntry = state.lk.permissions.find( ( permission ) => permission.entity === entity );

	return permissionsEntry === undefined ? NO_PERMISSIONS : permissionsEntry.permissions;
}



export function haveReadPermission( entity: string ): boolean
{
	// Check the first bit
	return ( getPermissions( entity ) & READ_PERMISSIONS ) !== 0;
}



export function haveCreatePermission( entity: string ): boolean
{
	// Check the second bit
	return ( getPermissions( entity ) & CREATE_PERMISSIONS ) !== 0;
}



export function haveUpdatePermission( entity: string ): boolean
{
	// Check the third bit
	return ( getPermissions( entity ) & UPDATE_PERMISSIONS ) !== 0;
}



export function haveDeletePermission( entity: string ): boolean
{
	// Check the fourth bit
	return ( getPermissions( entity ) & DELETE_PERMISSIONS ) !== 0;
}