// ================================================================
// based on code from http://joelinoff.com/blog/?p=1363#impjs
//    @param num  The number: int, float or string.
//    @param dpl  Decimal places (default: -1 -> do nothing).
//    @param sep  Thousands separator (default: ",").
//    @param dpt  Decimal point (default: ".").
//    @returns a formatted string.
// ================================================================
export default function thousandSeparator( num, dpl=-1, sep=" ", dpt="." )
{
	if( !num )
		return num;

	var snum = num.toString();

	// Format to N decimal places.
	if( dpl > -1 )
		snum = parseFloat( snum ).toFixed( dpl ).toString();


	// Split into parts.
	var parts = snum.split( dpt );  // 123 or 123.45

	// Get the characteristic and mantissa.
	//   123.45
	//   ^  ^^
	//   |  |+--- mantissa
	//   |  +---- decimal point
	//   +------- characteristic
	var characteristic = parts[ 0 ];
	var mantissa = parts.length == 1 ? "" : dpt + parts[ 1 ];

	// Handle negative numbers.
	var neg = "";

	if( characteristic[ 0 ] == "-" )
	{
		neg = "-";
		characteristic = characteristic.slice( 1 );  // strip off the negative
	}

	// Clean up the mantissa. Remove trailing zeros unless a specific
	// number of decimal places (dpl) was specified.
	//    1.000 > 1
	if( mantissa.length && dpl < 0 )
	{
		// Make sure that 1.0 --> 1
		while( mantissa.slice( -1 ) == '0' )
			mantissa = mantissa.slice( 0, -1 );

		if( mantissa == dpt )
			mantissa = "";
	}

	// Insert the commas moving from left to right.
	var result = '';  // where to put the result
	var offset = characteristic.length % 3  // offset to start inserting commas

	for( var i = 0; i < characteristic.length; i++ )
	{
		// if we are at the digit where a separator needs to be
		// pre-pended, prepend the separator.
		if( ( i % 3 ) == offset && i )
			result += sep ;

		result += characteristic[ i ];
	}

	return neg + result + mantissa;
}