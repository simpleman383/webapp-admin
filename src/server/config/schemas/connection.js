import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

mongoose.connect('mongodb://localhost/test-database');

autoIncrement.initialize(mongoose);


export default mongoose
export { autoIncrement }