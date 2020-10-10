/**
 * Peripheral.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

/**
 * Peripherals.js
 *
 * A peripheral device connected to a Gateway.
 */

module.exports = {

  beforeUpdate: async (peripheral, proceed) => {
    // Prevent peripheral change  the connected Gateway
    // eslint-disable-next-line no-param-reassign
    delete peripheral.gatewayId;
    return proceed();
  },
  afterDestroy: async (peripheral, proceed) => {
    const gw = await Gateway.findOne({ id: peripheral.gatewayId });
    await Gateway.updateOne({ id: gw.id }).set({ peripheralsCount: gw.peripheralsCount - 1 });
    return proceed();
  },
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    uid: {
      type: 'number',
      required: true,
      description: 'UID a Number',
      example: '123456',
    },
    vendor: {
      type: 'string',
      required: true,
      maxLength: 256,
      description: 'vendor',
      example: 'Vendor 24',
    },

    status: {
      type: 'string',
      isIn: ['online', 'offline'],
      defaultsTo: 'online',
      description: 'Peripheral status online/offline.',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    gatewayId: {
      model: 'gateway',
      allowNull: false,
    },

  },

};
