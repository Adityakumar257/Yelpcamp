const Userdb = require('../model/model');

// create and save new user
exports.create = (req,res) => {
    const { empid,name, email, gender, department, status,address,city,number } = req.body;
    if (!req.body) {
        return res.status(400).send({ message : "Content can not be emtpy!" });
    }
    // new user
    const user = new Userdb({
        empid,
        name,
        email,
        gender,
        department,
        status,
        address,
        city,
        number
    });

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add_user');
        })
        .catch(err => {
            return res.status(500).json({ message : err.message || "Some error occurred while creating a create operation" });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    const { id } = req.query;

    if (id) {

        Userdb.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message : "Not found user with id "+ id });
            } else{
                return res.status(200).json(data)
                }
            })
            .catch(err => {
                return res.status(500).json({ message: `Erro retrieving user with id ${id}` });
            })

    } else{
        Userdb.find()
            .then(user => {
                return res.status(200).json(user);
            })
            .catch(err => {
                return res.status(500).json({ message : err.message || "Error Occurred while retriving user information" });
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                return res.status(404).json({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            } else {
                return res.status(200).json(data);
            }
        })
        .catch(err => {
            return res.status(500).json({ message : "Error Update user information" });
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message : `Cannot Delete with id ${id}. Maybe id is wrong`});
            } else {
                return res.status(200).json({ message : "User was deleted successfully!" });
            }
        })
        .catch(err => {
            return res.status(500).json({ message: `Could not delete User with id=${id}` });
        });
}


//create and save new department


/*const Deptdb = require('../model/model');

exports.create = (req,res) => {
    const { deptcode,deptname, deptshort} = req.body;
    if (!req.body) {
        return res.status(400).send({ message : "Content can not be emtpy!" });
    }
    // new user
    const department = new Deptdb({
        deptcode,
        deptname,
        deptshort,
        gender,
        department,
        status,
        address,
        city,
        number
    });

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add_user');
        })
        .catch(err => {
            return res.status(500).json({ message : err.message || "Some error occurred while creating a create operation" });
        });

}*/