// @flow strict

import * as React from "react";

import "./css/styles__library-pricing-factors.css";

import { getEntity } from "lk/components/entityUtils/getEntity.js"

import { PhysicalScaleFactor } from "./PhysicalScaleFactor.jsx";

import { MatrixAdjustments } from "./MatrixAdjustments.jsx";

import { ChartFactor } from "./ChartFactor.jsx";

export class CharacteristicsReport extends React.Component <Props, State>
{

	constructor( props: Props )
	{
		super( props );

		this.state =
		{
			formValues: {}
		};

		this.getValues( props.id );
	}

	componentDidUpdate( prevProps )
	{
		if (this.props.id !== prevProps.id)
		{
		 this.getValues( this.props.id );
		}
	}


	getValues = ( id ) => getEntity(
		"GroupingFactors",
		id,
		( json ) => this.setState( { formValues: json } ),
		( error ) => console.log( "Невозможно загрузить значения сущности: " + error ) );



	render()
	{
		const factors = this.state.formValues;

		if (!factors.scale || factors.scale.length === 0 )
		return ( <span/> );

		let factorsDocuments = null;
		if (factors.documents && factors.documents.length > 0 )
			factorsDocuments = factors.documents;

		return (

			<div className="library-pricing-factors__section">
				<span className="library-pricing-factors__close-report" onClick={ this.props.toggleCharacteristicsReport } ></span>
				<div className="library-pricing-factors__report-title">Отчёт по фактору «{ factors.real_estate_factor_title }»</div>
				{ factors.real_estate_factor_text ?
					<div>
						<span className="library-pricing-factors__desc-factors"><span className="library-pricing-factors__name-factors">{ factors.real_estate_factor_title }</span>: { factors.real_estate_factor_text }</span>
					</div> : <span className="library-pricing-factors__desc-factors">Заполните описание фактора</span>
				}
				{ factors.text ?
					<div className="library-pricing-factors__scale-wrapper">
						<p className="library-pricing-factors__name-factors">Текст статьи</p>
						<p>{ factors.text }</p>
						</div> : <span className="library-pricing-factors__desc-factors">Заполните текст статьи</span>
				}
				{ factors.adjustment_calculation_function_title ?
					<div>
						<span className="library-pricing-factors__desc-factors">Формула: { factors.adjustment_calculation_function_title }</span>
						<span className="library-pricing-factors__desc-factors">Описание: { factors.adjustment_calculation_function_text }</span>
					</div> : <span className="library-pricing-factors__desc-factors">Заполните описание формулы</span>
				}
				<div className="library-pricing-factors__scale-wrapper">
					<ChartFactor scale = { factors.scale } />
				</div>
				<div className="library-pricing-factors__scale-wrapper">
					<PhysicalScaleFactor scale = { factors.scale } />
				</div>
				<div className="library-pricing-factors__scale-wrapper">
					<p className="library-pricing-factors__name-factors" >Матрица корректировочных коэффициентов фактора «{ factors.real_estate_factor_title }» для объектов { factors.real_estate_segment_title }</p>
					<MatrixAdjustments scale = { factors.scale } />
				</div>
				{ factorsDocuments && factorsDocuments.length > 0  ?
					<div>
						<p className="library-pricing-factors__name-factors">Материалы</p>
						<div className="library-pricing-factors__documents">
							{ factorsDocuments.map( ( items ) =>
								<figure key={ items.id }>
									<a href={"/custom/grouping_factors/documents/"+ items.file }  target="_blank"><img src="img/PDF.png"/></a>
									<figcaption>{ items.source }</figcaption>
								</figure> )
							}
						</div>
					</div> : <span/>
				}
			</div>

		);
	}
}