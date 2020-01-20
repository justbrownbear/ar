// @flow

export function transformErrors( errors ): {}
{
	return errors.map( ( error ) =>
	{
		if( error.name === "required" )
			error.message = "Это поле обязательно для заполнения";

		if( error.property === "instance.parentRealObjects" && error.name === "minimum" )
			error.message = "Родитель с таким кадастровым номером не найден";

		return error;
	} );
}