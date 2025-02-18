import { existsSync } from "fs";
import path from "path";
import context from "../core/context.js";

export const validateProjectName = (projectPath: string) => {
	context.resolvedProjectPath = path.resolve(projectPath);
	const dirExists: boolean = existsSync(context.resolvedProjectPath);
	if (dirExists) {
		return "Invalid directory name: A directory with this name already exists, please use a different name";
	}
	if (projectPath.length >= 214) {
		return "Invalid directory name: name must contain less than 214 characters";
	}
	if (containsInvalidChars(projectPath)) {
		return "Invalid directory name: name must only include URL-friendly characters";
	}

	return true;
};

const containsInvalidChars = (path: string) => {
	const regex = /[.~:/#[\]@$&'()*+,;=%]/g;
	return regex.test(path);
};
