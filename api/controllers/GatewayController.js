/**
 * GatewayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    delete req.body.peripheralsCount;
    delete req.body.peripherals;
    delete req.body.id;
    try {
      const gateway = await Gateway.create(req.body).fetch();
      return res.ok(gateway);
    } catch (error) {
      return res.badRequest(error);
    }
  },
  update: async (req, res) => {
    delete req.body.peripheralsCount;
    delete req.body.peripherals;
    try {
      const gateway = await Gateway.updateOne({ id: req.params.id }).set(req.body);
      if (gateway) {
        return res.ok(gateway);
      }
      return res.notFound();
    } catch (error) {
      return res.badRequest(error);
    }
  },
  add: async (req, res) => res.notFound(),
  remove: async (req, res) => res.notFound(),
  replace: async (req, res) => res.notFound(),

};
