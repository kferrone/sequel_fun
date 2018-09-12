/**
 * @author Kelly Ferrone
 */
import {Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import {Contact, Ability} from "./";

/**
 * A bridge table to reference the abilities each contact can have and what contacts are applied to an ability. 
 */
@Table({
  tableName: 'contact_ability',
  underscoredAll: true,
  underscored: true,
  comment: 'All the superpowers a certain contact has.'
})
export default class ContactAbility extends Model<ContactAbility> {

  /**
   * A reference to a contact who has a certain ability. 
   */
  @ForeignKey(() => Contact)
  @Column({
    field: 'contact_id',
    primaryKey: true
  })
  public contactID: number;

  /**
   * A reference to the ability a certain contact has. 
   */
  @ForeignKey(() => Ability)
  @Column({
    field: 'ability_id',
    primaryKey: true
  })
  public abilityID: string;

}