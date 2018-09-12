import {DefineOptions} from "sequelize";
import {Table, Column, Model, HasMany, DataType, PrimaryKey, AutoIncrement, Comment} from 'sequelize-typescript';

@Table({
  tableName: 'key',
  comment: 'Stores the security keys which allow access to the api'
})
export default class Key extends Model<Key> {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    comment: 'The tables primary key'
  })
  public id: string;

  @Column({
    type: DataType.UUID,
    field: 'client_id',
    allowNull: false,
    comment: 'A name for the user'
  })
  public clientId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    comment: 'The actual key'
  })
  public value: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    validate: {
      isDate: true
    },
    comment: 'The date and time the key will expire'
  })
  public expiration: Date;

}