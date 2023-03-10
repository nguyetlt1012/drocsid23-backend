const { Schema, default: mongoose } = require('mongoose');

const InviteSchema = new Schema(
  {
    inviteCode: {
      type: String,
      unique: true,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    expireAt: {
      type: Schema.Types.Date
    },
    //unit: minute
    // if expireTime == 0 is never expire
    expireTime: {
      type: Date,
      require: true,
      // default 7 days, unit = milisecond
      default: 7*24*60*60*1000,
    },
    source: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    //channel invite or server invite
    //channel: 1
    //server: 0
    inviteType: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  },
);
const InviteModel = mongoose.model('Invite', InviteSchema);
module.exports = InviteModel;
