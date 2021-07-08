var jwt = require('jsonwebtoken');
var userCollection = require('../models/userSchema');

const findByToken = async (req,res,next)=>{
    let token = req.header('authorization') && req.header('authorization').split(' ')[1];

    try {
        
        jwt.verify(token, 'hamza_movie_app', async function (err, decoded) {
            if (decoded) {
                if (decoded) {
                    const user = await userCollection.findById(decoded.id)
                    if (user) {
                        next()
                    } else {
                        res.status(401).send("please first login!")
                        next()
                    }
                }
            }

            if (err) {
                res.status(500).send("Server internal error:" + err)
            }
        });

      } catch(err) {
        res.status(404).send('Error:' + err);
      }
}

module.exports = findByToken