import User from '../../config/schemas/users'
import baseRepository from '../basic'

const repository = {
    ...baseRepository(User),

    save: (userdata) => {
        const user = new User(userdata);
        user.setPassword(userdata.password);
        return user.save();
    }
}

export default repository;