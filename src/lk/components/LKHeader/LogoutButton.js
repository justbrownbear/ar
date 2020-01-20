// @flow
import React from "react";



async function logoutAction()
{
	try
	{
		const params =
		{
			method: "GET",
			credentials: "include"
		};

		const response = await fetch( "/logout", params );
	}
	catch( error )
	{
	}
	finally
	{
		// Перезагрузим страницу
		document.location.href = document.location.href;
	}
}



export function LogoutButton( props )
{
	return (
		<li onClick={ logoutAction }>
			<i className="icon a-icon-small icon-sign-out"></i>
			<span>Выйти</span>
		</li>
	);
}