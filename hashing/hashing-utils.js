module.exports.hashString = function (str) {
	let hash = 0;
	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

module.exports.computeScore = function (username, server) {
	const usernameHash = this.hashString(username);
	const serverHash = this.hashString(server);
	return (usernameHash * 13 + serverHash * 11) % 67; // some random formula to calculate score
}