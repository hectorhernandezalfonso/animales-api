import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Animal extends BaseModel {
  @column({ isPrimary: true }) public codigo_animal: number

  @column() public nombre_animal: string

  @column() public especie: number

  @column() public raza: number

  @column() public sexo: number
  
  @column() public edad: numbre




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



}
