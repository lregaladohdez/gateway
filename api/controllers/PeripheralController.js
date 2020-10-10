/**
 * PeripheralController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    if (!req.body.gatewayId) {
      return res.badRequest(`gatewayId is Required`);
    }
    const gw = await Gateway.findOne({ id: req.body.gatewayId });
    if (!gw) {
      // Can't add a periperal without Gateway
      res.badRequest(`GatewayId ${req.body.gatewayId} not found`);
    }
    if (gw.peripheralsCount >= sails.config.custom.MAX_PERIPHERALS) {
      return res.badRequest(`Gateway reached Max number of connected Peripherals`);
    }
    /*
    In case of using a real db, the following 2 actions should be in a transaction
    to ensure are both correct to proceed, see the following reference:
    https://sailsjs.com/documentation/reference/waterline-orm/datastores/transaction
     */
    const peripheral = await Peripheral.create(req.body).fetch();
    await Gateway.updateOne({ id: gw.id }).set({ peripheralsCount: gw.peripheralsCount + 1 });
    return res.ok(peripheral);
  },
  add: async (req, res) => res.notFound(),
  remove: async (req, res) => res.notFound(),
  replace: async (req, res) => res.notFound(),

};
