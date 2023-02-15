/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  Route.post('/registrar-animal', 'AnimalsController.setRegistrarAnimal') //funciona 

  //funciona agregandole query a la ruta.
  //No funciona correctamente para la condición de la edad, está configurado para hacer la query
  //SELECT * FROM TABLA WHERE EDAD = EDADQUERY 
  //esto hace que no devuelva un rango <= o >= sino que empareje los registros.
  Route.get('/consultar-animales', 'AnimalsController.getListarAnimales')

  Route.delete('/eliminar-animal', 'AnimalsController.setEliminarRegistro')

  Route.patch('/actualizar-animal', 'AnimalsController.setActualizarRegistro')

}).prefix('/gatos-y-perros')
