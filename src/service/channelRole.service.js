const { ERR, OK } = require("../constant");
const ChannelModel = require("../models/channel.model");
const ChannelRoleGroupModel = require("../models/channelRoleGroup.model");
const ServerRoleGroupModel = require("../models/serverRoleGroup.model");

const ChannelRoleGroupService = {
    create: async(data) =>{
        try {
            const roleServer = await ServerRoleGroupModel.findOne({name: data.name, serverId: data.serverId});
            if (!roleServer) throw new Error("Invalid role");

            const roleChannel = await ChannelRoleGroupModel.findOne({name: data.name, channelId: data.channelId});
            if (roleChannel) throw new Error("Duplicate role in this channel");
            const channelRoleGroup = await ChannelRoleGroupModel.create({
                name: data.name,
                channelId: data.channelId,
                rolePolicies: roleServer.rolePolicies,
                memberIds: roleserver.members
            });
            if (!channelRoleGroup) throw new Error("Can't create channel role");
            return {
                status: OK,
                data: channelRoleGroup
            }
        } catch (error) {
            return {
                status: ERR,
                message: error.message,
            };
        }
    },
    getById: async(id) =>{
        try {
            const role = await ChannelRoleGroupModel.findById(id);
            if (!role) throw new Error("invalid role");
            return {
                status: OK,
                data: role
            }
        } catch (error) {
            return {
                status: ERR,
                message: error.message,
            };
        }
    },
    update: async(roleId, data) =>{
        try {
            const role = await ChannelRoleGroupModel.findByIdAndUpdate(roleId, data, {
                new: true
            });
            if (!role) throw new Error("Invalid role");
            
            return {
                status: OK,
                data: role
            }
        } catch (error) {
            return {
                status: ERR,
                message: error.message,
            };
        }
    },
    delete: async(roleId) =>{
        try {
            await ChannelRoleGroupModel.findByIdAndRemove(roleId);
            return {
                status: OK,
                data: {}
            }
        } catch (error) {
            return {
                status: ERR,
                message: error.message,
            };
        }
    }
}

module.exports = ChannelRoleGroupService; 