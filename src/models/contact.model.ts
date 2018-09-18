/**
 * @author Kelly Ferrone
 */
import Ability from './ability.model';
import ContactAbility from './contactAbility.model';
import Guild from './guild.model';
import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Comment, ForeignKey, BelongsTo, BelongsToMany} from 'sequelize-typescript';

/**
 * A directory of contacts who can be called upon for battle. 
 */
@Table( {
	tableName: 'contact',
	underscoredAll: true,
	underscored: true,
	comment: 'A list of people who can be contacted'
} )
export default class Contact extends Model<Contact> {

  /**
   * A unique auto incrementing ID to identify a certain individual. 
   */
	@AutoIncrement
	@PrimaryKey
	@Comment( 'The tables primary key' )
	@Column
	get id(): number {
		return this.getDataValue( 'id' ) as number;
	}

  /**
   * The first or given name of the individual. 
   */
	@Column( {
		field: 'first_name',
		comment: 'The first name of the contact'
	} )
	public firstName: string;

  /**
   * Last name or surname of the individual. 
   */
	@Column( {
		field: 'last_name',
		comment: 'The contacts last name'
	} )
	public lastName: string;

  /**
   * Each contact has a message they want to share. 
   */
	@Column( DataType.TEXT )
	public message: string;

  /**
   * The foreign key reference of the Guilds ID. 
   */
	@ForeignKey( () => Guild )
	@Column( {
		field: 'guild_id',
		type: DataType.STRING( 35 ),
		allowNull: true
	} )
	public guildId: string;

  /**
   * The group of super powered contacts this contact has pledged loyalty to. 
   */
	@BelongsTo( () => Guild )
	public guild: Guild;

  /**
   * A list of super powered abilities this contact poses. 
   */
	@BelongsToMany( () => Ability, () => ContactAbility, 'contactID', 'abilityID' )
	public abilities: Ability[];

}