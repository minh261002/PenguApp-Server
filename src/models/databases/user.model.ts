
import mongoose, { Document, Schema } from "mongoose";
import { UserStatus, UserRole } from "~/constants/enum";

export interface User extends Document {
  name: string;
  email: string;
  phone: string | number | null;
  password: string;
  province_id: string | null;
  district_id: string | null;
  ward_id: string | null;
  address: string | null;
  avatar: string | null;
  reward_point: number;
  refresh_token: string | null;
  role: keyof typeof UserRole;
  status: keyof typeof UserStatus;
}

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  province_id: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
    required: false,
    default: null,
  },
  district_id: {
    type: Schema.Types.ObjectId,
    ref: 'District',
    required: false,
    default: null,
  },
  ward_id: {
    type: Schema.Types.ObjectId,
    ref: 'Ward',
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
  avatar: {
    type: String,
    required: false,
    default: null,
  },
  reward_point: {
    type: Number,
    required: true,
    default: 0,
  },
  refresh_token: {
    type: String,
    required: false,
    default: null,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  },
}, {
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: function (_, ret) {
      delete ret.password;
      delete ret.refresh_token;
      return ret;
    }
  }
});

const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;