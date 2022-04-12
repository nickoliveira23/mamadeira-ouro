const express = require('express');

const validate = require('./validators/userCredentials');
const donor = require('./validators/donorCredentials');
// const dependent = require('./validators/dependentCredentials');
// const hospital = require('./validators/hospitalCredentials');
// const collaborator = require('./validators/collaboratorCredentials');

const UserController = require('./controllers/UserController.js');
const DonorController = require('./controllers/DonorController.js');
const SessionController = require('./controllers/SessionController.js');
// const DependentController = require('./controllers/DependentController.js');
const HospitalController = require('./controllers/HospitalController.js');
const CollaboratorController = require('./controllers/CollaboratorController.js');
// const SheduleController = require('./controllers/SheduleController.js');

const routes = express.Router();

routes.post('/user/register', validate.user, UserController.create);
routes.post('/user/email', validate.email, UserController.validateEmail);
routes.post('/user/password', validate.password, UserController.validatePassword);
routes.get('/user/list', UserController.index);
routes.post('/donor/register', DonorController.create);
routes.post('/donor/validate', DonorController.validate);
routes.put('/donor/update/:id', DonorController.updateDonor)
routes.get('/donor/:id', DonorController.indexById);
routes.post('/session', SessionController.login);

// routes.post('/dependent/register', dependent.validate, DependentController.create);
routes.post('/hospital/register', HospitalController.create);
routes.get('/hospital/list', HospitalController.listHospital);
routes.post('/collaborator/register', CollaboratorController.create);
routes.get('/collaborator/list', CollaboratorController.index);

module.exports = routes;