declare type lodash = typeof import('lodash' );

declare namespace mdl {
	export type Model<T> = import( 'sequelize' ).Model<T, {}>;
	export type Contact = import( 'models' ).Contact;
	export type Key = import( 'models' ).Key;
	export type Ability = import( 'models' ).Ability;
	export type ContactAbility = import( 'models' ).ContactAbility;
	export type Guild = import( 'models' ).Guild;
}