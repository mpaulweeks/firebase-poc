const isHost = window.location.search.includes('host');
document.getElementById('out').append('isHost: ' + isHost);
console.log('isHost: ' + isHost);

console.log(firebase);
const db = firebase.database();

const startHost = async () => {
  db.ref('ping').remove();
  let count = 0;
  setInterval(() => {
    const child = {
      index: count,
      timestamp: new Date().toISOString(),
    };
    db.ref(`ping/${count}`).set(child);
    console.log('sent count', count);
    count++;
  }, 1000 / 60);
}
const startGuest = async () => {
  const received = {};
  db.ref('ping').on("child_added", function (snapshot) {
    const newChild = snapshot.val();
    console.log(newChild);
    received[newChild.index] = newChild;
  });
}

if (isHost) {
  startHost();
} else {
  startGuest();
}

