import { describe, expect, it } from "vitest";
import { getPlaylist, getTrackInfo, searchTrack, searchPlaylist } from "../src/search";
import { validateID } from "../src/tools";

describe("spotify search npm package", () => {
	describe("search", () => {
		it("should return an array of tracks", async () => {
			const tracks = await searchTrack("Never Gonna Give You Up");

			expect(tracks).toBeInstanceOf(Array);

			tracks.forEach(track => {
				expect(track).toHaveProperty("id");
				expect(track).toHaveProperty("name");
				expect(track).toHaveProperty("artists");
				expect(track).toHaveProperty("album");
			});
		});

		it("should return an array of playlists", async () => {
			const playlists = await searchPlaylist("Top 50 - Global");

			expect(playlists).toBeInstanceOf(Array);

			playlists.forEach(playlist => {
				expect(playlist).toHaveProperty("id");
				expect(playlist).toHaveProperty("name");
				expect(playlist).toHaveProperty("owner");
				expect(playlist).toHaveProperty("public");
				expect(playlist).toHaveProperty("tracks");
				expect(playlist).toHaveProperty("type");
			});
		});

		it("should return a track info by id", async () => {
			const tracks = await searchTrack("Never Gonna Give You Up");
			const track = await getTrackInfo(tracks[0].id);

			expect(track).toBeInstanceOf(Object);
			expect(track).toHaveProperty("id");
			expect(track).toHaveProperty("name");
			expect(track).toHaveProperty("artists");
			expect(track).toHaveProperty("album");

			expect(track.id).toBe("4PTG3Z6ehGkBFwjybzWkR8");
			expect(track.name).toBe("Never Gonna Give You Up");
			expect(track.artists[0].name).toBe("Rick Astley");
			expect(track.album.name).toBe("Whenever You Need Somebody");
			expect(track.type).toBe("track");
		});

		it("should return a playlist by id", async () => {
			const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
			const playlist = await getPlaylist(playlistId);

			expect(playlist).toBeInstanceOf(Object);
			expect(playlist).toHaveProperty("id");
			expect(playlist).toHaveProperty("name");
			expect(playlist).toHaveProperty("owner");
			expect(playlist).toHaveProperty("public");
			expect(playlist).toHaveProperty("tracks");
			expect(playlist).toHaveProperty("type");

			expect(playlist.id).toBe(playlistId);
			expect(playlist.name).toBe("Top 50 - Global");
			expect(playlist.owner.id).toBe("spotify");
			expect(playlist.public).toBe(true);
			expect(playlist.type).toBe("playlist");
		});

		it("should throw an error when track id not found", async () => {
			const notFoundTrackId = "37i9dhZEVebMD5HDwVN2tF";

			await expect(getTrackInfo(notFoundTrackId)).rejects.toThrow(
				"HTTP error! status: 404; message: Not Found"
			);
		});

		it("should throw an error when playlist id not found", async () => {
			const notFoundPlaylistId = "37i9dhZEVebMD5HDwVN2tF";

			await expect(getPlaylist(notFoundPlaylistId)).rejects.toThrow(
				"HTTP error! status: 404; message: Not Found"
			);
		});

		it("should throw an error when no query is provided in search", async () => {
			await expect(searchTrack("")).rejects.toThrow("No query provided");
		});

		it("should throw an error when no id is provided in search", async () => {
			await expect(getTrackInfo("")).rejects.toThrow("No ID provided");
		});

		it("should throw an error when no id is provided in search playlist", async () => {
			await expect(getPlaylist("")).rejects.toThrow("No ID provided");
		});
	});

	describe("tools", () => {
		it("should validate a track ID", () => {
			const trackId = "4PTG3Z6ehGkBFwjybzWkR8";

			expect(validateID(trackId)).toBe(true);
		});

		it("should return false when track ID is not base-64", () => {
			const invalidTrackId = "4PTG3Z6ehGkBFwjybzWkR8!";

			expect(validateID(invalidTrackId)).toBe(false);
		});

		it("should return false when track ID is empty", () => {
			const emptyTrackId = "";

			expect(validateID(emptyTrackId)).toBe(false);
		});
	});
});
