
import getNumberIsPossible from "lk/components/util/getNumberIsPossible.js";
import isNumber from "lk/components/util/isNumber.js";
import CustomWidgetComponent from "./CustomWidgetComponent.js";



export default class IntegerInput extends CustomWidgetComponent
{
	onInputUpdate = ( event ) =>
	{
		let number = event.target.value;

		if( number )
		{
			const lastSymbol = number[ number.length - 1 ];

			// Если ввели не цифру, то вводить не даем
			if( !isNumber( lastSymbol ) )
				number = number.slice( 0, -1 );
		}

		this.setState( { value: number } );

		this.updateFormInputValue( getNumberIsPossible( number ) );
	}
}