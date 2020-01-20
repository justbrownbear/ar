
export default function getNumberIsPossible( value )
{
	if( !value )
		return "";

	const number = Number( value );
	const valid = typeof number === "number" && !Number.isNaN( number );

	return valid ? number : value;
}
