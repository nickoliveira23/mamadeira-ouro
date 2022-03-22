const express = require('express');

const user = require('./validators/userCredentials');
const donor = require('./validators/donorCredentials');
// const dependent = require('./validators/dependentCredentials');
// const hospital = require('./validators/hospitalCredentials');
// const collaborator = require('./validators/collaboratorCredentials');

const UserController = require('./controllers/UserController.js');
const DonorController = require('./controllers/SessionController.js');
const SessionController = require('./controllers/SessionController.js');
// const DependentController = require('./controllers/DependentController.js');
// const HospitalController = require('./controllers/HospitalController.js');
// const CollaboratorController = require('./controllers/CollaboratorController.js');
// const SheduleController = require('./controllers/SheduleController.js');

const routes = express.Router();

routes.post('/user/register', user.validate, UserController.create);
routes.get('/user/list', UserController.index);
// routes.post('/donor/register', donor.validate, DonorController.create);
// routes.get('/donor/list', DonorController.index);
routes.post('/session', SessionController.login);

// routes.post('/dependent/register', dependent.validate, DependentController.create);
// routes.post('/hospital/register', hospital.validate, HospitalController.create);
// routes.post('/collaborator/register', collaborator.validate, CollaboratorController.create);

module.exports = routes;