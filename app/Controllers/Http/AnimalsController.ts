// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Animal from 'App/Models/Animal.ts'
import Database from '@ioc:Adonis/Lucid/Database'



export default class AnimalsController {
	public async setRegistrarAnimal({ request, response }: HttpContextContract){
		
		try{
			const dataAnimal = request.only([
				'codigo_animal', 'nombre_animal', 'especie', 'raza', 'sexo', 'edad'
			])

			const codigoAnimal = dataAnimal.codigo_animal;

			const animalExistente: Number = await this.getValidarAnimalExistente(codigoAnimal);

			if (animalExistente == 0){
				await Animal.create(dataAnimal)
				response.status(200).json({ "msg":"Registro de animal completado" })

			}else{
				rsponse.status(400).json({"msg": "error, el codigo de animal ya se encuentra registrado"})
			}

		} catch (error){
			response.status(500).json({"msg":"Error en el servidor!!"})
		}
	}

	public async getListarAnimales({request, response}: HttpContextContract): Promise<Animal[]>{
		try{
			const {raza, edad} = request.qs()

			if((raza != undefined) && (edad!=undefined)){
				const animal = await Animal.query().where({"edad": edad, "raza":raza})
				return animal;
			
			}else if (edad != undefined){
				const animal = await Animal.query().where({"edad": edad})
				return animal;
			
			}else if(raza != undefined){
				const animal = await Animal.query().where({"raza": raza})
				return animal;
			}else{
				const animal = await Animal.all()
				return animal;
			}
		} catch (error){
			response.status(500).json({"msg":"Error en el servidor!!"})
		}
	}

	public async setEliminarRegistro({request, response}: HttpContextContract ){
		try{
			const codigo_animal = request.qs()

			const animalExistente: Number = await this.getValidarAnimalExistente(codigo_animal)

			if (animalExistente !== 0){
				console.log(codigo_animal)
				const animal = await Animal.findOrFail(codigo_animal);
				await animal.delete()
				response.status(400).json({"msg": "Registro eliminado con exito"})
			}else{
				response.status(400).json({"msg":"Animal no existe en el registro"})
			}

		} catch(error){
			response.status(500).json({"msg": "Error en el servidor"})
		}
	}

	public async setActualizarRegistro({request, response}: HttpContextContract ){
		try{
			
			const {codigo_animal, nombre, especie, raza, sexo, edad} = request.qs()

			const animalExistente: Number = await this.getValidarAnimalExistente(codigo_animal)


			if (animalExistente !== 0){
				const animal = await Animal.findOrFail(codigo_animal);
				console.log(animal)

				if(nombre!= undefined){
					animal.nombre=nombre
				}
				if(especie!= undefined){
					animal.especie=especie
				}
				if(raza!= undefined){
					animal.raza=raza
				}
				if(sexo!= undefined){
					animal.sexo=sexo
				}
				if(edad!= undefined){
					animal.edad=edad
				}

				await animal.save()

				response.status(400).json({"msg": "Registro actualizado con exito"})
			}else{
				response.status(400).json({"msg":"Animal no existe en el registro"})
			}

		} catch(error){
			response.status(500).json({"msg": "Error en el servidor"})
		}
	}


	private async getValidarAnimalExistente(codigo_animal: Number): Promise<Number>{
		const total = await Animal.query().where({"codigo_animal": codigo_animal}).count('*').from('animals')
		return parseInt(total[0]["count(*)"])
	}

}
