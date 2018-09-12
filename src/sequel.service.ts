import {Sequelize, ISequelizeConfig} from 'sequelize-typescript';
import * as fs from 'fs';

export interface SequelConfig extends ISequelizeConfig {}

export default class SequelService {

	public config: SequelConfig;

	public client: Sequelize;

	constructor() {
		this.setConfig();
		this.setClient();
	}

  /**
   * Initializes the sequelize client. 
   */
	public async init(): Promise<any> {
		try {
			//checks to make sure the connection has been successfully created
			await this.client.authenticate();

			//a simple test query to check if the DB has been created yet
			const blurb = await this.client.query( 'SELECT 1 FROM contact LIMIT 1' );
			console.log( 'The check db returned ', blurb );

		} catch ( e ) {

			//this catches the table not found which proves the DB is not initialized, now we can initialize if we catch it
			if ( e.parent.code === 'ER_NO_SUCH_TABLE' ) {
				console.log( 'There was no test blurb so the DB will be synced.' );
				try {
					await this.client.sync();
				} catch ( e ) {
					this.handleFatalError( e );
				}
			} else {
				this.handleFatalError( e );
			}

		}
	}

  /**
   * Returns a model of a certain type which has already been defined.
   * @param name The name of the model
   */
	public get<T>( name: string ): mdl.Model<T> {
		return this.client.models[name];
	}

  /**
   * Creates and configures the sequelize client. 
   * Basically only time this is needed is in init. 
   */
	private setClient(): void {
		const modelPath = __dirname + '/./models/**/*.model.*s';
		this.config.modelPaths = [modelPath];
		this.config.modelMatch = ( filename, member ) => {
			return filename.substring( 0, filename.indexOf( '.model' ) ) === member.toLowerCase();
		};
		this.client = new Sequelize( this.config );
	}

	/**
	 * Set the config as a property
	 */
	private setConfig(): void {
		this.config = JSON.parse( fs.readFileSync( process.cwd() + '/config.json', 'utf8' ) );
	}

  /**
   * Hanldes all the different types of errors Sequelize could send back. 
   * 
   * @param {Error} e The generic error object. 
   */
	private handleFatalError( e ): void {

		if ( !( 'parent' in e ) ) {throw e;}

		console.log( 'Got the ' + e.parent.code + ' error. ', e );

		switch ( e.parent.code ) {
			//hostname supplied in the config was not valid
			case 'ENOTFOUND': {
				console.log( 'The provided host for the DB does not exist. Please make sure it is correct and try again.' );
				process.exit( 1 );
				break;
			}
			//this means the credentials in the config were not valid
			case 'ER_ACCESS_DENIED_ERROR': {
				console.log( 'The credentials provided for the DB are not valid.' );
				process.exit( 1 );
				break;
			}
			//this means the supplied db name did not match a db in the configured server
			case 'ER_BAD_DB_ERROR': {
				console.log( 'The name of the DB does not match a DB on the server' );
				process.exit( 1 );
				break;
			}
			default: {
				console.log( 'the error class name is ' + e.constructor.name );
				console.log( 'There was an error with the db', e );
				process.exit( 1 );
				break;
			}
		}
	}

}