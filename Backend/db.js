const mongoose = require('mongoose');

// mongodb+srv://sarvesh:SARvesh@506@uinworksassigment.nrmhg.mongodb.net/test
// mongodb://localhost:27017/uniworks-app
mongoose.connect('mongodb+srv://sarvesh:SARvesh@506@uinworksassigment.nrmhg.mongodb.net/test',{
        autoIndex: false,        
        useNewUrlParser: true
},(err)=>{
    if(!err){
        console.log('Database connection successful');
    }
    else{
        console.log('Error in DB Connection:  '+err)
    }
})
