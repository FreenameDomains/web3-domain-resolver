import axios from "axios";

export class ApiCaller {
	static async getHttpsCall(url: string, options: { timeout?: number } = {}): Promise<any | undefined> {
		const { timeout = 5000 } = options
		try {
			const response = await axios.get(url, { timeout });
			if (response) {
				return response.data;
			}
		} catch {
			return undefined;
		}
	}
}