const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    /* token header gelebilir post gelebilir yada get olarak gelebilir tokeni yakala */
    const token = req.headers['x-access-token'] || req.body.token || req.query.token

    if(token){

        jwt.verify(token, req.app.get('token_key'), (err, decoded) => {
            if (err){
                res.json({
                    status: false,
                    message: 'token doğrulanamadı'
                })
            }else{
                req.decode = decoded;
                
                /* herşey yolunda ilerle dedik */
                next();
            }
        });
    }else{
        res.json({
            status: false,
            message: 'token gelmedi'
        })
    }
};
