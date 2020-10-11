/**
 * Gateway.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const net = require('net');

module.exports = {
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    serial: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 256,
      description: 'a unique serial number',
      example: '2C0F24C2-B53C-49A7-8478-D10915A5B1DF',
    },
    name: {
      type: 'string',
      required: true,
      maxLength: 256,
      description: 'human-readable name',
      example: 'My Preferred Gateway',
    },
    address: {
      type: 'String',
      required: true,
      description: 'String representation of ipv4 address',
      example: '127.0.0.1',
      custom: (address) => net.isIPv4(address),
    },
    peripheralsCount: {
      type: 'number',
      description: 'Number of peripherals currently connected',
      example: '3',
      defaultsTo: 0,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    peripherals: {
      collection: 'peripheral',
      via: 'gatewayId',
    },

  },

};
