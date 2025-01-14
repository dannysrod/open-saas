// This is a script that is used to seed the database. It is present here in the server project in
// order to have easy access to the server logic, like operations and the rest, since we often want
// to use that logic in our seeding.
// TODO: Consider in the future moving it into a a separate project (maybe db/ ?), while still
//   maintaining access to logic from the server/ .
import prismaClient from './dbClient.js';
import { devSeedUsers } from './ext-src/scripts/usersSeed.js';
const seeds = {
    devSeedUsers,
};
async function main() {
    const nameOfSeedToRun = process.env.WASP_DB_SEED_NAME;
    if (nameOfSeedToRun) {
        console.log(`Running seed: ${nameOfSeedToRun}`);
    }
    else {
        console.error('Name of the seed to run not specified!');
    }
    await (seeds[nameOfSeedToRun])(prismaClient);
}
main()
    .then(async () => { await prismaClient.$disconnect(); })
    .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=dbSeed.js.map