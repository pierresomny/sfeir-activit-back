import * as process from 'process';

/**
 * Env config
 */
export default (): { [key: string]: string } => (
	{
		google_client_id: process.env.GOOGLE_OAUTH2_CLIENT_ID,
		mongo_uri: process.env.MONGO_URI,
		google_issuer_uri: process.env.GOOGLE_OAUTH2_ISSUER_URI,
	}
);