export default async function getDiscordID(key: string | undefined | unknown) {
	return await fetch(`https://discordapp.com/api/users/@me`, {
		headers: {
			Authorization: `Bearer ${key}`,
		},
	}).then((res) => res.json())
}

export async function getDiscordConnections(key: string | undefined | unknown) {
	return await fetch(`https://discordapp.com/api/users/@me/connections`, {
		headers: {
			Authorization: `Bearer ${key}`,
		},
	}).then((res) => res.json())
}
