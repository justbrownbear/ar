// @flow strict

export function getRandomLowerString( length: number ): string
{
	const possible = "abcdefghijklmnopqrstuvwxyz";
	const stringLength = length || 6;

	let result = "";

	for( let i = 0; i < stringLength; i++ )
		result += possible.charAt( Math.floor( Math.random() * possible.length ) );

	return result;
}