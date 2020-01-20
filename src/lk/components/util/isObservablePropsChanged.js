// @flow
import isEqual from "lodash/isEqual";



export function isObservablePropsChanged( observableProps: Array<string>, currentProps: {}, nextProps: {} ): boolean
{
	for( let i = 0; i < observableProps.length; i++ )
		if( !isEqual( currentProps[ observableProps[ i ] ], nextProps[ observableProps[ i ] ] ) )
			return true;

	return false;
}