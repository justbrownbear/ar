
import React from "react";
import { connect } from "react-redux";

import { YMaps, Map } from "react-yandex-maps";
import { Placemark } from "lk/components/Map/Placemark.js";

import "./css/map.css";



const mapState =
{
	center: [ 54.973718992633515, 73.37493896484376 ],
	zoom: 10
};



function baloonContent( props )
{
	let image = "";

	if( props.file )
		image = '<img style="margin: 5px;" height="146" width="110" src="http://www.areall.ru/custom/real_objects/photo/146x110/' + props.file + '" />';


	const objectTypes = [ "ЗУ", "ОКС", "Литера", "Группа помещений", "Помещение", "Промзона", "Имущественный комплекс" ];

	const result =
		'<div style="background:#fff;">' +
			image +
			'<div style="margin: 5px;">' +
				objectTypes[ props.type - 1 ] + '<br />' +
				'<a target="_blank" href="/objects/' + props.id + '">' + props.cadastral_number + '</a><br />' +
				props.address + '<br />' +
				'<strong>S</strong> ' + ( props.space || "" ) +' м²<br />' +
				'<strong>Стоимость</strong> ' + ( props.unit_cost || "" ) + ' р/м²' +
			'</div>' +
		'</div>';

	return result;
}



function SearchResultDataMap( props )
{
	return (
		<div className="grid-row">
			<div className="grid-cols-24 medium-grid-cols-24 small-grid-cols-24">
				<div className="b-section__container">
					<div className="b-panel-controls">
						<ul>
							<li><i className="a-icon icon-expand"></i></li>
							<li><i className="a-icon icon-compress"></i></li>
							<li><i className="a-icon icon-arrow_maximize"></i></li>
							<li><i className="a-icon icon-arrow_minimize"></i></li>
							<li><i className="a-icon icon-refresh"></i></li>
							<li><i className="a-icon icon-close"></i></li>
						</ul>
					</div>
					<div className="b-section__header">
						<div className="b-framework-icon">
							<span className="a-icon a-icon-small icon-location-interface"></span>
						</div>
						<div className="b-section__title">
							<span>Map</span>
							<p>Объекты на карте</p>
						</div>
					</div>
					<div className="b-section__content">
						<div className="map-wrapper">
							<YMaps>
								<Map state={ mapState } width="100%" height="100%">
									{ props.data.map( ( data ) => <Placemark { ...data } key={ data.id } balloonContent={ baloonContent } /> ) }
								</Map>
							</YMaps>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}



const mapStateToProps = ( store ) => (
	{
		data: store.analyticsCabinet.data
	} );


export default connect( mapStateToProps )( SearchResultDataMap );