// @flow strict

import thousandSeparator from "../util/thousandSeparator.js";

// ================================================================
// Rounding rules
//    @param num  The number: int, float or string.
//    @param boundary Switch mantissa lengh (default: 0 -> do nothing).
//    @param dpl  Decimal places (default: -1 -> do nothing).
//    @returns a formatted string.
// ================================================================

export default function roundingRules( num, boundary = 0, dpl= -1, isWhole= false )
{
	if(isWhole && dpl > 0)
	{
		if( num % 1 > 0 )
			return thousandSeparator( num, dpl );
		else return thousandSeparator( num, 0 );
		
	}
	if( boundary > 0 && dpl > 0 && num > boundary)
	{
		return thousandSeparator( num, 0 );
	} 
	return thousandSeparator( num, dpl );	
}