/*
https://bezkoder.com/mongodb-many-to-many-mongoose/
https://bezkoder.com/mongoose-one-to-one-relationship-example/
https://bezkoder.com/mongoose-one-to-many-relationship/
https://bezkoder.com/vue-node-express-mongodb-mevn-crud/
https://bezkoder.com/node-express-mongodb-crud-rest-api/
https://snipcart.com/blog/learn-vanilla-javascript-before-using-js-frameworks


*/

const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    mongoose.set('useNewUrlParser', true),
    // Use findOneAndUpdate() in place of findAndModify()    
    mongoose.set('useFindAndModify', false);
    // Use createIndex() in place of ensureIndex()    
    mongoose.set('useCreateIndex', true);
    // Use the new server discovery and monitoring engine    
    mongoose.set('useUnifiedTopology', true);
    // Connect to the DB    
    mongoose.connect(DB_HOST);

    mongoose.connection.on('error', err => {
      console.error(err);
      console.log('There was a problem connecting to MongoDB');
      process.exit();
    })

  },
  close: () => {
    mongoose.connection.close();
  }
}

