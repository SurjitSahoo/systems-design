const utils = require('./hashing-utils');

const serverSet1 = [
	'server0',
	'server1',
	'server2',
	'server3',
	'server4',
	'server5',
];

const serverSet2 = [
	'server0',
	'server1',
	'server2',
	'server3',
	'server4',
];

const usernames = [
	'username0',
	'username1',
	'username2',
	'username3',
	'username4',
	'username5',
	'username6',
	'username7',
	'username8',
	'username9',
]

function pickServerNaive(username, servers) {
	const usernameHash = utils.hashString(username);
	return servers[usernameHash % servers.length];
}

function pickServerRendezvous(username, servers) {
	let maxServer = null;
	let maxScore = null;
	for (const server of servers) {
		const score = utils.computeScore(username, server);
		if (maxScore === null || score > maxScore) {
			maxScore = score;
			maxServer = server;
		}
	}
	return maxServer;
}

console.log('======= Naive Hashing Strategy =======');
console.log('After deleting a server...');
console.log(`=== BEFORE ===            === AFTER ===`);
for (const username of usernames) {
	const server1 = pickServerNaive(username, serverSet1);
	const server2 = pickServerNaive(username, serverSet2);
	const areServersEqual = server1 === server2;
	console.log(`${username}: ${server1} => ${username}: ${server2} ${areServersEqual ? 'EQUAL' : 'NOT EQUAL'}`);
}

console.log('\n======= Rendezvous Hashing Strategy =======');
console.log('After deleting a server...');
console.log(`=== BEFORE ===            === AFTER ===`);
for (const username of usernames) {
	const server1 = pickServerRendezvous(username, serverSet1);
	const server2 = pickServerRendezvous(username, serverSet2);
	const areServersEqual = server1 === server2;
	console.log(`${username}: ${server1} => ${username}: ${server2} ${areServersEqual ? 'EQUAL' : 'NOT EQUAL'}`);
}

/*
======= Naive Hashing Strategy =======
After deleting a server...
=== BEFORE ===            === AFTER ===
username0: server2 => username0: server0 NOT EQUAL
username1: server3 => username1: server1 NOT EQUAL
username2: server4 => username2: server2 NOT EQUAL
username3: server5 => username3: server3 NOT EQUAL
username4: server0 => username4: server4 NOT EQUAL
username5: server1 => username5: server0 NOT EQUAL
username6: server2 => username6: server1 NOT EQUAL
username7: server3 => username7: server2 NOT EQUAL
username8: server4 => username8: server3 NOT EQUAL
username9: server5 => username9: server4 NOT EQUAL

======= Rendezvous Hashing Strategy =======
After deleting a server...
=== BEFORE ===            === AFTER ===
username0: server5 => username0: server4 NOT EQUAL
username1: server4 => username1: server4 EQUAL
username2: server2 => username2: server2 EQUAL
username3: server1 => username3: server1 EQUAL
username4: server0 => username4: server0 EQUAL
username5: server5 => username5: server4 NOT EQUAL
username6: server4 => username6: server4 EQUAL
username7: server3 => username7: server3 EQUAL
username8: server1 => username8: server1 EQUAL
username9: server0 => username9: server0 EQUAL

As you can see, most users are still served by the same server even after deleting a server in Rendezvous Hashing Strategy.
*/