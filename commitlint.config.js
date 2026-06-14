/**
 * Conventional Commits enforcement (run on the commit-msg hook + in CI).
 * Scopes mirror the repo's domains; they are encouraged but not required.
 */
export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"scope-enum": [
			1,
			"always",
			[
				"comics",
				"content",
				"ui",
				"theme",
				"config",
				"analytics",
				"ci",
				"deps",
				"release",
				"test",
			],
		],
	},
};
