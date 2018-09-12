import {Table, Column, Model, HasMany, DataType, PrimaryKey, Comment} from 'sequelize-typescript';
import Contact from './contact.model';

export enum Morality {
  GOOD = 'good',
  NEUTRAL = 'neutral',
  EVIL = 'evil'
}

@Table({
  tableName: 'guild',
  underscoredAll: true,
  underscored: true,
  comment: 'The secret organization this contact is a part of'
})
export default class Guild extends Model<Guild> {

  @PrimaryKey
  @Column({
    type: DataType.STRING(35),
    comment: 'A nice little lowercase code for representing the guild.'
  })
  public id: string;

  @Column({
    type: DataType.TEXT,
    comment: 'A nice readable title to display.'
  })
  public title: string;

  @Column({
    type: DataType.TEXT,
    comment: 'A quote representing what this guild is all about in a few nice words.'
  })
  public slogan: string;

  @Column({
    type: DataType.STRING(7),
    values: [Morality.GOOD, Morality.NEUTRAL, Morality.EVIL],
    defaultValue: Morality.NEUTRAL,
    comment: 'Represents the level of morality the guild has. The guild may be good, neutral, or evil'
  })
  public morality: Morality;

  @HasMany(() => Contact)
  public contacts: Contact[];

}
