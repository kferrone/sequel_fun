/**
 * @author Kelly Ferrone
 */
import ContactAbility from "./contactAbility.model";
import Contact from './contact.model';
import {Table, Column, Model, DataType, PrimaryKey, Comment, Is, BelongsToMany} from 'sequelize-typescript';

/**
 * All of the super powers a super powered contact may have. 
 */
@Table({
  tableName: 'ability',
  underscoredAll: true,
  underscored: true,
  comment: 'All the superpowers someone may have.'
})
export default class Ability extends Model<Ability> {

  /**
   * A stringified representation to quickly identify the ability. 
   */
  @PrimaryKey
  @Comment('The tables primary key')
  @Column
  public id: string;

  /**
   * A super cool and super powered title for the ability. 
   */
  @Column({
    comment: 'The name of this ability',
    unique: true
  })
  public title: string;

  /**
   * Describes how the ability works and any other useful bits of info to understand. 
   */
  @Column({
    type: DataType.TEXT,
    comment: 'A description of how this ability works.'
  })
  public description: string;

  /**
   * A standard way of determining how powerful an ability is.  
   * Basically on a scale of one to ten how powerful is this ability? 
   */
  @Is('oneToTen', (powerLevel: number) => {
    if (!((powerLevel >= 1) && (powerLevel <= 10))) {return new Error(`${powerLevel} must be a value between 1 and 10`);}
  })
  @Column({
    field: 'power_level',
    type: DataType.INTEGER
  })
  public powerLevel: number;

  /**
   * A list of super powered contacts who possess a certain ability. 
   */
  @BelongsToMany(() => Contact,() => ContactAbility, 'abilityID', 'contactID')
  public contacts: Contact[];
}