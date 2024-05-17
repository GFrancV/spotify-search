import { getPlaylist, getTrackInfo, searchTrack, searchPlaylist } from "./search";
import { validateID } from "./tools";

class SpotifySearch {
	searchTrack(query: string) {
		return searchTrack(query);
	}

	searchPlaylist(query: string) {
		return searchPlaylist(query);
	}

	getTrackInfoById(id: string) {
		return getTrackInfo(id);
	}

	getPlaylist(id: string) {
		return getPlaylist(id);
	}

	validateID(id: string) {
		return validateID(id);
	}
}

const spotifySearch = new SpotifySearch();

export default spotifySearch;
