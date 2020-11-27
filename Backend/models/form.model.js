var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// This file is equilent to Data Base
var formSchema = new Schema({   
    assignee: {
        type: String,
        required: true,
        trim: true,        
    },
    assigned: {
        type: String,
        required: true,
        trim: true,        
    },
    department: {
        type: String,
        required: true,
        trim: true
    },    
    message: {
        type: String,        
        trim: true
    },  
    status: {
        type: String,
        enum: [
            'PENDING',
            'APPROVED',
            'REJECTED',                      
        ],
        default: 'PENDING'
    } 
    
}, {
    timestamps: true,
    strict: false
})


module.exports = mongoose.model('Form', formSchema);
