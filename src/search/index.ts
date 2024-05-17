import { SpotifyPlaylist, SpotifySearch, SpotifyTrack } from "../types/spotify";
import { fetchFromSpotify } from "../utils";

export const searchTrack = async (query: string) => {
	if (!query) {
		throw new Error("No query provided");
	}

	const data: SpotifySearch = await fetchFromSpotify("search", `?q=${query}&type=track&limit=5`);

	return data.tracks.items;
};

export const searchPlaylist = async (query: string) => {
	if (!query) {
		throw new Error("No query provided");
	}

	const data: SpotifySearch = await fetchFromSpotify("search", `?q=${query}&type=playlist&limit=5`);

	return data.playlists.items;
};

export const getTrackInfo = async (id: string) => {
	if (!id) {
		throw new Error("No ID provided");
	}

	const data: SpotifyTrack = await fetchFromSpotify("tracks", id);

	return data;
};

export const getPlaylist = async (id: string) => {
	if (!id) {
		throw new Error("No ID provided");
	}

	const data: SpotifyPlaylist = await fetchFromSpotify("playlists", id);

	return data;
};
