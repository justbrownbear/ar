// @flow

export function stringToNumber( strNumber: string ): number
{
	// Входное число может использовать в качестве разделителя и точку,
	//  и запятую, поэтому необходимо преобразовать запятые в точки
	let splitNumber = strNumber.trim().replace( ",", "." ).split( "." );

	// Уберем из строки все нечисловые символы
	splitNumber[ 0 ] = splitNumber[ 0 ].match( /\d+/g ).join( "" );

	// Вот теперь можно парсить полученную строку в число
	return parseFloat( splitNumber.join( "." ), 10 );
}