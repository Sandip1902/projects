import mongoose,  {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

 const UserSchema = new Schema({
    username: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },

    email: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullName: {
        type: String,
        required : true,
        trim: true,
        index: true
    },

    avatar: {
        type: String,
        required: true,

    },
    coverImage: {
        type: String,

    },

    watchHistory: [ {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
    ],

    password: {
        type: String,
        required: [true,"password id required"]
    },
    refreshToken: {
        type: String
    }


 },
 {
    timestamps:true
 }
)

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10)
        next()
    }else{
        next()
    }
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
} 

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
        username : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_expiry
    })
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const userSchema = mongoose.model("User",UserSchema)