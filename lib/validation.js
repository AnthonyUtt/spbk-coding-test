class Validation {
    validateVehicleData(req, res, next) {
        var data = req.body;
        if (data.type === 'coupe') {
            if (data.doors !== 2) {
                res.status(400).send('Coupes only have 2 doors!');
                return;
            }
        } else if (data.type === 'motorcycle') {
            if (data.doors > 0) {
                res.status(400).send('Motorcycles can\'t have doors!');
                return;
            }
        }
        next();
    }
}

module.exports = new Validation();