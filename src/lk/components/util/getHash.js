// @flow
import md5 from "js-md5";



export function getHash( entity: string, data: {} ): string
{
	return md5( JSON.stringify( { entity: entity, data: data || {} } ) );
}
