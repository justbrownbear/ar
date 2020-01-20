
import getNumberIsPossible from "lk/components/util/getNumberIsPossible.js";
import isNumber from "lk/components/util/isNumber.js";
import CustomWidgetComponent from "./CustomWidgetComponent.js";



export default class FloatInput extends CustomWidgetComponent
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			value: getNumberIsPossible( props.value )
		};
	}


	componentWillReceiveProps( nextProps )
	{
		if( getNumberIsPossible( this.state.value ) !== getNumberIsPossible( nextProps.value ) )
			this.setState( { value: getNumberIsPossible( nextProps.value ) } );
	}


	onInputUpdate = ( event ) =>
	{
		// Меняем запятые на точки
		let number = event.target.value.replace( ",", "." );

		if( number )
		{
			const lastSymbol = number[ number.length - 1 ];
			const numberWithoutLastSymbol = number.slice( 0, -1 );

			// В начале можно ввести знак минуса
			// Если уже есть одна точка, новую вводить не даём
			// Если ввели не цифру, то тоже вводить не даем
			if( ( lastSymbol === "-" && number.length !== 1 ) ||
				( lastSymbol === "." && numberWithoutLastSymbol.indexOf( "." ) !== -1 ) ||
				( !isNumber( lastSymbol ) && lastSymbol !== "." && lastSymbol !== "-" ) )
				number = numberWithoutLastSymbol;
		}

		this.setState( { value: number } );
		this.updateFormInputValue( getNumberIsPossible( number ) );
	}


	currentValue = () => this.state.value || "";
}