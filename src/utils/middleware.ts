/* eslint-disable @typescript-eslint/ban-types */
import { NextApiRequest, NextApiResponse } from 'next'

export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: Object) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}
