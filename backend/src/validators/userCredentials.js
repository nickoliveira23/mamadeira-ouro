const { celebrate, Segments, Joi } = require('celebrate');

exports.validate = [
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            password: Joi.string()
                .required()
                .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')),

            type: Joi.string().required()
        })
    })
];

// exports.email = [
//     celebrate({
//         [Segments.BODY]: Joi.object().keys({
//             email: Joi.string()
//                 .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//         }).unknown(),
//     }),
// ];

// exports.password = [
//     celebrate({
//         [Segments.BODY]: Joi.object().keys({
//             password: Joi.string()
//                 .required()
//                 .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')),
//         }).unknown(),
//     }),
// ];