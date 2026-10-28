const fs = require('fs');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../firebase-service-account.json');
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

const mockCode = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const lines = mockCode.split('\n');
// lines 123 to 931 (0-indexed: 122 to 931)
const profilesCode = lines.slice(122, 931).join('\n').replace('export const EDITORIAL_PROFILES: ProfessionalProfile[] = ', '').trim().replace(/;$/, '');
const profiles = eval(profilesCode);

console.log('Found ' + profiles.length + ' editorial profiles in mockData.ts');

async function sync() {
  for (const prof of profiles) {
    await db.collection('authors').doc(prof.id).set(prof, { merge: true });
    console.log('Synced author: ' + prof.name + ' (' + prof.id + ')');
  }
  console.log('All ' + profiles.length + ' authors synced to Firestore successfully!');
}

sync().catch(console.error);
