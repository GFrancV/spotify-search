import { load } from "cheerio";

export const getSpotifyToken = async (): Promise<string | null> => {
	try {
		const url = "https://open.spotify.com";
		const response = await fetch(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
			},
		});
		const data = await response.text();

		const $ = load(data);
		const spotifySession = $("#session").html();

		if (!spotifySession) {
			return null;
		}

		const { accessToken } = JSON.parse(spotifySession);

		return accessToken;
	} catch (error) {
		throw new Error("Error scraping Spotify: " + error);
	}
};

export const fetchFromSpotify = async (url: string, params: string | null = null) => {
	const spotifyApiUrl = "https://api.spotify.com/v1";
	if (!params) {
		throw new Error("No parameters provided");
	}

	const tempToken = await getSpotifyToken();
	const response = await fetch(`${spotifyApiUrl}/${url}/${params}`, {
		headers: {
			Authorization: `Bearer ${tempToken}`,
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}; message: ${response.statusText}`);
	}

	return response.json();
};
