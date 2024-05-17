export const validateID = (id: string): boolean => {
	if (!id) false;
	if (typeof id !== "string") return false;

	const base62Regex = /^[a-zA-Z0-9]+$/;
	if (!base62Regex.test(id)) return false;

	return true;
};
