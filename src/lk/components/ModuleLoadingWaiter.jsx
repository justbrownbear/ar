
import React from "react";



export default function ModuleLoadingWaiter( { error } )
{
	if( error )
		return <div>Error!</div>;

	return <div>Идет загрузка данных</div>;

	// return (
	// 	<div className="b-section__fadeout">
	// 		<div className="centering__yes">
	// 			<div className="spinner spinner_size_l spinner_progress_yes">Загрузка…</div>
	// 		</div>
	// 	</div> );
}