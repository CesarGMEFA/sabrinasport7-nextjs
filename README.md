## Paginación en WooCommerce API

La API de WooCommerce utiliza la paginación para manejar grandes conjuntos de datos. Cuando haces una solicitud a un endpoint que devuelve múltiples elementos (como `/products`), la respuesta se divide en páginas.

Puedes especificar el número de página que deseas recuperar utilizando el parámetro `page` en la solicitud. Por ejemplo, para obtener la segunda página de productos, harías una solicitud a `/products?page=2`.

Además, puedes controlar el número de elementos por página utilizando el parámetro `per_page`. Por ejemplo, para obtener 20 productos por página, harías una solicitud a `/products?per_page=20`.

## Encabezado X-WP-TotalPages

El encabezado `X-WP-TotalPages` en la respuesta de la API te dice el número total de páginas disponibles. Esto es útil para saber cuántas páginas necesitas recorrer para obtener todos los datos.

Por ejemplo, si haces una solicitud a `/products?page=1&per_page=20` y el encabezado `X-WP-TotalPages` en la respuesta es `5`, entonces sabes que hay 5 páginas de productos, cada una con 20 productos (a excepción de la última página, que puede tener menos).

Nota: Este encabezado solo está disponible si has establecido el parámetro `page` en la solicitud.