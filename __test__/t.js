const util = require('util');
const sails = require('sails');

async function p() {
  await util.promisify(sails.lift)({});
  console.log(1);
  await new Promise((r) => setTimeout(r, 2000));
  console.log(2);
  console.log(3);
  sails.lower();
}
p();
