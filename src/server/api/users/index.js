import { response, error } from '../../utils'
import repository from '../../repository/users'

const api = {
    saveUser: (req, res) => {      

        const userdata = {
            ...req.body,
            creationDate: new Date,
            lastAccessDate: new Date
        };

        const { username, email, password } = userdata;        

        if (!username || !email || !password) {
            return response.error(res)(error.WRONG_PARAMS)
        }
        
        repository.save(userdata)
            .then(result => {
                return response.success(res)();
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },

    getUsers: (req, res) => {
        repository.get()
            .then(users => {
                return response.success(res)({ users });
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },  

    getUser: (req, res) => {
        repository.get({ username: req.params.username  })
            .then(user => {
                if (user) {
                    return response.success(res)({ user });
                } else {
                    return response.error(res)(error.ENTITY_NOT_FOUND);
                }
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },

    updateUser: (req, res) => {
        const username = req.params.username;

        repository.update({ username }, { ...req.body })
            .then(result => {
                return response.success(res)();
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },

    deleteUser: (req, res) => {
        repository.delete({ username: req.params.username })
            .then(res => {
                return response.success(res)();
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },

    deleteUsers: (req, res) => {
        repository.delete()
            .then(result => {
                return response.success(res)();
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    }
}

export default api;