// Bring in the room class
const nameSpace =  require('./classes/namespace');
const room =  require('./classes/room');

// Set up the namespaces
let data = [];
let wikiNs = new nameSpace(0,'Wiki','/wiki');
let mozNs = new nameSpace(1,'Mozilla','/mozilla');
let linuxNs = new nameSpace(2,'Operating Systems','/os');

data.push(wikiNs,mozNs,linuxNs);

// Make the main room and add it to rooms. it will ALWAYS be 0
wikiNs.addRoom(new room(0,'New Articles','Wiki'));
wikiNs.addRoom(new room(1,'Editors','Wiki'));
wikiNs.addRoom(new room(2,'Other','Wiki'));

mozNs.addRoom(new room(0,'Firefox','Mozilla'));
mozNs.addRoom(new room(1,'Chrome','Mozilla'));
mozNs.addRoom(new room(2,'SpiderMonkey','Mozilla'));
mozNs.addRoom(new room(3,'Rust','Mozilla'));

linuxNs.addRoom(new room(0,'Debian','os'));
linuxNs.addRoom(new room(1,'Red Hat','os'));
linuxNs.addRoom(new room(2,'MacOs','os'));
linuxNs.addRoom(new room(3,'Windows','os'));

module.exports = data;