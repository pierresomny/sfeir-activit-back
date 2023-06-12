import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

	constructor(private configService: ConfigService, private jwtService: JwtService) {}

	use(req: Request, res: Response, next: NextFunction) {
		// Set-up of HTTP Only cookie.
		if (req.headers.authorization) {
			const token: string = req.headers.authorization;
			if (this.checkToken(token)) {
				res.cookie('jwt', token, { httpOnly: true });
				return res.send('TOKEN RECEIVED');
			}
		} else if (req.headers.cookie) {
			// Retrieve the value of the 'jwt' cookie
			const jwtCookie: string = req.headers.cookie
			                             .split(';')
			                             .find((cookie: string) => cookie.trim().startsWith('jwt='));

			let jwtValue;
			if (jwtCookie) {
				jwtValue = jwtCookie.split('=')[1];
				this.checkToken(jwtValue);
			} else {
				throw new UnauthorizedException('No token provided');
			}
		} else {
			throw new UnauthorizedException('No token provided');
		}

		next();
	}

	/**
	 * Check information on the current token
	 * @param {string} token
	 * @returns {boolean}
	 * @private
	 */
	private checkToken(token: string): boolean {
		const decodedToken = this.jwtService.decode(token);
		if (
			typeof decodedToken === 'string'
			|| decodedToken.aud !== this.configService.get<string>('google_client_id')
			|| decodedToken.iss !== this.configService.get<string>('google_issuer_uri')
		)
			throw new UnauthorizedException('Invalid token');
		if (decodedToken.exp * 1000 < new Date().getTime())
			throw new UnauthorizedException('Token expired');
		return true;
	}

}
