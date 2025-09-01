const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "You must enter a valid email format(user@example.com)."]
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        githubId: {
            type: String,
            unique: true,
        }
    },
    {
        //Rather than marking not to return passwords in different routes, here we elect not to send back the password when returning user information. 
        // Credit to my colleague Karl for finding this and sharing it with the cohort

        toJSON: {
            transform: (doc, ret) => {
                delete ret.password
                delete ret.__v
                return ret
            },
        },
    }
)

//Pre-save middle we use in the creation of a password.
//We hash the password with the help of the bcrypt library
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
        ////////////////////////////
        //Take this out at the end//
        ////////////////////////////
        console.log(this.password)
    }
    next()
})

//Here we check to make sure the password is correct with the compare function in bcrypt
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

//Global Schema validator. Anytime the data is updated, this runs the validators in the schema. 
mongoose.set('runValidators', true)

const User = mongoose.model("User", userSchema)

module.exports = User