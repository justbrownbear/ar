// @flow
import * as React from "react";

import moment from "moment";

import Picker from "rc-calendar/lib/Picker";
import RangeCalendar from "rc-calendar/lib/RangeCalendar.js";
import ruCalendarLocale from "rc-calendar/lib/locale/ru_RU.js";

import { Field as FormikField } from "formik";


import "rc-calendar/assets/index.css";



const format = ( date: moment ): string => date ? date.format( "DD.MM.YYYY" ) : "";

const momentDateOrUndefined = ( date ) => date === undefined ? date : moment( date, "DD.MM.YYYY" );



export default function DateRangePicker( props ): React.Node
{
	return <FormikField { ...props } name="dateRangeStub" component={ DateRangePickerComponent } />;
}



function DateRangePickerComponent( props ): React.Node
{
	const startDateFieldName = props.startDateFieldName;
	const endDateFieldName = props.endDateFieldName;

	const startDateValueFromProps = props.form.values[ startDateFieldName ];
	const endDateValueFromProps = props.form.values[ endDateFieldName ];

	const onSelect = ( date: Array<string> ): void =>
		{
			props.form.setFieldValue( startDateFieldName, format( date[ 0 ] ) );
			props.form.setFieldValue( endDateFieldName, format( date[ 1 ] ) );
		};


	const startDate = startDateValueFromProps;
	const endDate = endDateValueFromProps;

	const inputValue = ( startDateValueFromProps && endDateValueFromProps ) ? ( startDate + " - " + endDate ) : "";

	const valuesRange = [ momentDateOrUndefined( startDate ), momentDateOrUndefined( endDate ) ];

	const calendar =
		<RangeCalendar
			showWeekNumber={ false }
			dateInputPlaceholder={ [ "start", "end" ] }
			defaultValue={ [ startDate, endDate ] }
			showDateInput={ false }
			locale={ ruCalendarLocale }
		/>;

	return (
		<div className="grid-cols-4 text-margin-v1x advanced-search__row-margin-left">
			<div className="group-block add-top_block">
				<div className="name_element_form">
					Период
				</div>
				<div className="element-form">
					<Picker value={ valuesRange } onChange={ onSelect } animation="slide-up" calendar={ calendar }>
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
