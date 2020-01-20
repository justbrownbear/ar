// @flow

import * as React from "react";

import moment from "moment";

import Picker from "rc-calendar/lib/Picker";
import RangeCalendar from "rc-calendar/lib/RangeCalendar.js";
import ruCalendarLocale from "rc-calendar/lib/locale/ru_RU.js";

import "rc-calendar/assets/index.css";

import "./ViewLibraryFactors/css/styles__library-pricing-factors.css";

const convertMomentDateToDDMMYYY = ( momentDate: string ): string => momentDate === null ? "" : moment( momentDate ).format( "DD.MM.YYYY" );


const format = ( date: moment ): string => date ? date.format( "DD.MM.YYYY" ) : "";

const isValidRange = ( dateRange: Array<string> ): boolean => dateRange && dateRange[ 0 ] && dateRange[ 1 ];





function DateRangePicker( props ): React.Node
{
	return <DateRangePickerComponent {...props}/>;
}


// Очень хитрый компонент: внутри содержит два компонента формы для дат,
//  которые обновляются из родительского компонента
class DateRangePickerComponent extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			startDate: props.startDateFieldName,
			endDate: props.endDateFieldName
		};
		
	}	
		
	onSelect = ( date: Array<string> ): void => this.setState(
		{
			startDate: date[ 0 ],
			endDate: date[ 1 ]
		},
		() =>
		{
		 this.props.OnChange(date);
		}
	);

	render(): React.Node
	{
		const startDate = this.state.startDate || moment();
		const endDate = this.state.endDate || moment();

		const inputValue =
			( this.state.startDate && this.state.endDate ) ?
				( format( startDate ) + " - " + format( endDate ) ) :
				"";

		const calendar =
			<RangeCalendar
				showWeekNumber={ false }
				dateInputPlaceholder={ [ "start", "end" ] }
				defaultValue={ [ moment(), moment() ] }
				showDateInput={ false }
				locale={ ruCalendarLocale }
			/>;

	
		return (
			<div className="grid-cols-4 text-margin-v1x library-pricing-factors__date-vidjet">
				<div className="group-block add-top_block">
					<div className="element-form">Период:
						<Picker value={ [ startDate, endDate ] } onChange={ this.onSelect } animation="slide-up" calendar={ calendar }>
							{
								(): React.Node =>
									<input type="text"
										placeholder="Задайте период"
										className="date-picker-icon"
										value={ inputValue }
									/>
							}
						</Picker>
					</div>
				</div>
			</div>
		);
	}
}



export default DateRangePicker;