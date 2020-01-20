import numbers from "./numbers.js";



/**
 * Evaluate the dispersion for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} dispersion.
 */
export function dispersion( arr )
{
	var count = arr.length;
	var mean = numbers.statistic.mean( arr );
	var squaredArr = arr.map( element => Math.pow( ( element - mean ), 2 ) );

	return 1 / count * numbers.basic.sum( squaredArr );
}



/**
 * Evaluate the modal interval center for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} modal interval center.
 */
export function modalIntervalCenter( arr )
{
	var result = 0;
	var count = Math.round( 1 + Math.log( arr.length ) );

	//if( count < 10 )
	//	return 0;

	var min = numbers.basic.min( arr );
	var max = numbers.basic.max( arr );
	var step = ( max - min ) / count;
	var stepArray = [];
	var countArray = [];

	let currentCountArrayMax = 0;

	var idModal = 0;

	for( let i = 0; i < count; i++ )
	{
		stepArray.push( min +  step * i );
		let countInStep = arr.filter( ( element ) => element >=  min + step * i && element <=  min + step * ( i + 1 ) );
		countArray.push( countInStep.length );

		// Сохраняем в idModal индекс максимального значения countArray
		if( countInStep.length > currentCountArrayMax )
		{
			currentCountArrayMax = countInStep.length;
			idModal = i;
		}
	}


	min = idModal === 0 ? 0 : countArray[ idModal - 1 ];
	max = idModal === count ? 0 : countArray[ idModal + 1 ];

	if( 2 * countArray[ idModal ] - min - max != 0 )
		result = stepArray[ idModal ] + step * ( ( ( countArray[ idModal ] - min ) ) / ( 2 * countArray[ idModal ] - min - max ) );

	return result;

}



/**
 * Evaluate the excess for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} excess.
 */
export function excess( arr )
{
	var mean = numbers.statistic.mean( arr );
	var stdev = numbers.statistic.standardDev( arr );
	var pover2Arr = [];
	var pover3Arr = [];
	var pover4Arr = [];
	var result = 0;

	for( var i = 0; i < arr.length; i++ )
	{
		pover2Arr[ i ] = Math.pow( arr[ i ], 2);
		pover3Arr[ i ] = Math.pow( arr[ i ], 3);
		pover4Arr[ i ] = Math.pow( arr[ i ], 4);
	}


	if( stdev > 0 )
		result = ( numbers.statistic.mean( pover4Arr ) - 4 * numbers.statistic.mean( pover3Arr ) * mean + 6 * numbers.statistic.mean( pover2Arr ) *
		Math.pow( numbers.statistic.mean( arr ), 2 ) - 3 * Math.pow( numbers.statistic.mean( arr ), 4 ) ) / Math.pow( stdev,4 ) - 3;

	return result;

}




/**
 * Evaluate the excess error for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} excess error.
 */
export function excessError( arr )
{
	var count = arr.length;
	var result = 0;

	if( count > 1 && ( count - 2 ) * ( count - 3 ) * ( count - 5 ) > 0 )
		result = Math.sqrt( ( 24.0 * count * ( count - 2 ) * ( count - 3 ) * ( count - 5 ) ) / ( Math.pow( ( count - 1 ), 2 ) * ( count + 3 ) * ( count + 5 ) ) );

	return result;

}




/**
 * Evaluate the asymmetry for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} asymmetry.
 */
export function asymmetry( arr )
{
	var mean = numbers.statistic.mean( arr );
	var stdev = numbers.statistic.standardDev( arr );
	var pover2Arr = [];
	var pover3Arr = [];
	var result = 0;

	for( var i = 0; i < arr.length; i++ )
	{
		pover2Arr[ i ] = Math.pow( arr[ i ], 2 );
		pover3Arr[ i ] = Math.pow( arr[ i ], 3 );
	}


	if( stdev > 0 )
		result = ( ( numbers.statistic.mean( pover3Arr ) ) - 3 * numbers.statistic.mean( pover2Arr ) * mean + 2 * Math.pow( mean, 3 ) ) / Math.pow( stdev, 3 );

	return result;

}



/**
 * Evaluate the asymmetry error for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} asymmetry error.
 */
export function asymmetryError( arr )
{
	var count = arr.length;

	return (
		count > 1 ?
			Math.sqrt( ( 6.0 * ( count - 1 ) ) / ( ( count + 1 ) * ( count + 3 ) ) ) :
			0
	);

}

const fixedOrInteger = ( number ) => parseInt( number, 10 ) == number ? number : number.toFixed( 10 );

/**
 * Evaluate the normal distribution function for value in array.
 *
 * @param {arr}.
 * @return {Number} .
 */
export function normalDistribution( arr )
{
	var mean = numbers.statistic.mean( arr );
	var stdev = numbers.statistic.standardDev( arr );
	const pi = 3.14;
	var result = [];

	for( var i = 0; i < arr.length; i++ )
	{
		result[i] = fixedOrInteger( Math.exp( - Math.pow( arr[ i ] - mean, 2 )/( 2 * Math.pow( stdev, 2 ) ) )/( stdev * Math.sqrt( 2 * pi ) ) ) ;
	};

	return result;
}

/**
 * Evaluate the normal distribution function for value in array.
 *
 * @param {arr}.
 * @return Number .
 */
export function normalDistributionMean( arr, x )
{
	var mean = numbers.statistic.mean( arr );
	var stdev = numbers.statistic.standardDev( arr );
	const pi = 3.14;
	var result = 1;
	var result_mass = [];

	for( var i = 0; i < arr.length; i++ )
	{
		result_mass[i] = Math.exp( - Math.pow( arr[ i ] - mean, 2 )/( 2 * Math.pow( stdev, 2 ) ) )/( stdev * Math.sqrt( 2 * pi ) ) ;
	};

	result = numbers.statistic.mean( result_mass );

	return result;
}



/**
 * Evaluate the norminv for value in array.
 *
 * @param {p}.
 * @return {Number} norminv.
 */
export function NormSInv(p)
{
	let a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
	let a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
	let b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
	let b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
	let c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
	let c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
	let d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
	let p_low = 0.02425, p_high = 1 - p_low;
	let q, r;
	let retVal;

	if ((p < 0) || (p > 1))
	{
		retVal = 0;
	}
	else if (p < p_low)
	{
		q = Math.sqrt(-2 * Math.log(p));
		retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
	}
	else if (p <= p_high)
	{
		q = p - 0.5;
		r = q * q;
		retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
	}
	else
	{
		q = Math.sqrt(-2 * Math.log(1 - p));
		retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
	}

	return retVal;
}


/**
 * Evaluate the weighted average for value in two arrays.
 *
 * @param {arr, arr_div}.
 * @return {Number} weighted average.
 */
export function weightedAverage(arr, arr_div)
{
	let sumDividers = numbers.basic.sum( arr_div );
	let weightedDividers = ( sumDividers !== 0 ) ? arr_div.map( ( element ) => element/sumDividers ) : null;
	let result = 0;
	if (weightedDividers !== null)
	{
		for( var i = 0; i < arr.length; i++ )
		{
			result = result + arr[i] * weightedDividers[i];
		}
	}
	return result;
}


/**
 * Evaluate the Grubbs critery for value in array.
 *
 * @param {arr}.
 * @return {Number} .
 */
export function grubbsCritery( arr, value )
{
	let mean = numbers.statistic.mean( arr );
	let stdev = numbers.statistic.standardDev( arr );
	let result = false;
	if( stdev > 0 )
	{
	 result = Math.abs( value - mean )/ stdev;
	}
	return result;
}
