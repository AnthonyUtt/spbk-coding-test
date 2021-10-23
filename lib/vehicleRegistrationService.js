const crypto = require("crypto");

class VehicleRegistrationService {
    registerVehicle(vehicle) {
        return new Promise((resolve, reject) => {
            if (!vehicle.id) {
                reject(new Error('Vehicle has no ID!'));
            }

            setTimeout(() => {
                resolve(crypto.randomBytes(15).toString('hex'));
            }, 3000);
        });
    }
}

module.exports = new VehicleRegistrationService();