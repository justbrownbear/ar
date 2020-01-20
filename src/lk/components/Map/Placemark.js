// @flow
import * as React from "react";

import { Placemark as YandexPlacemark } from "react-yandex-maps";



type PlacemarkType =
{
	title: string,
	latitude: number,
	longtitude: number,

	balloonContent: ( {} ) => string | React.Node
};



export function Placemark( props: PlacemarkType )
{
	const geometry = [ props.latitude, props.longtitude ];

	const properties =
		{
			hintContent: props.title,
			balloonContent: props.balloonContent( props )
		};

	const options = { openEmptyBalloon: true };

	const modules = [ "geoObject.addon.balloon", "geoObject.addon.hint" ];

	return <YandexPlacemark geometry={ geometry } properties={ properties } options={ options } modules={ modules } />;
}
