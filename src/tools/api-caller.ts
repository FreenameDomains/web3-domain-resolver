import axios from "axios";

export class ApiCaller{
	static async getHttpsCall(url: string): Promise<any | undefined> {
		try {
			const response = await axios.get(url);
			if (response) {
				return response.data;
			}
		} catch {
			return undefined;
		}
	}
}