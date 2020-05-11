const {Schema:mongooseSchema , model} = require("mongoose")
const bcrypt = require('bcryptjs')
SALT_WORK_FACTOR = 10;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


let UserSchema = new mongooseSchema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true,min:8},
    img_path:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    all:{type:Object,default:[]},
    read:{type:Object,default:[]},
    current:{type:Object,default:[]},
    want_to_read:{type:Object,default:[]},
    token:{type:String,required:false},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});



UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

let UserModel = model('user',UserSchema);
module.exports = UserModel;
