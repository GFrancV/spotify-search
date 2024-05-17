export interface SpotifySearch {
	tracks: Tracks;
	playlists: Playlists;
}

export interface Tracks {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SpotifyTrack[];
}

export interface Playlists {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SpotifyPlaylist[];
}

export interface SpotifyTrack {
	album: Album;
	artists: ItemArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIDS;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: LinkedFrom;
	restrictions: Restrictions;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

export interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: Restrictions;
	type: string;
	uri: string;
	artists: AlbumArtist[];
}

export interface AlbumArtist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Image {
	url: string;
	height: number;
	width: number;
}

export interface Restrictions {
	reason: string;
}

export interface ItemArtist {
	external_urls: ExternalUrls;
	followers: Followers;
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface Followers {
	href: string;
	total: number;
}

export interface ExternalIDS {
	isrc: string;
	ean: string;
	upc: string;
}

export interface LinkedFrom {}

export interface SpotifyPlaylist {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

export interface Owner {
	external_urls: ExternalUrls;
	followers?: Followers;
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name?: string;
	name?: string;
}
