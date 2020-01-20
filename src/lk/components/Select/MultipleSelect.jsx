import React from "react";

import ObjectTypeSelect from "./components/ObjectTypeSelect.jsx";
import SelectWithOptions from "./components/SelectWithOptions.jsx";


export default ( props ) =>
	props.entity ?
		<ObjectTypeSelect { ...props } entity={ props.entity } multipleSelect={ true } /> :
		<SelectWithOptions { ...props } multipleSelect={ true } />;