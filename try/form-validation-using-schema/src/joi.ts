import * as Joi from 'joi';
import { invalidValues } from './values';

const schema = Joi.object({
  userName: Joi.string().required(),
  age: Joi.number().required(),
  agreeOfParent: Joi.boolean().when('age', {
    is: Joi.number().less(20),
    then: Joi.required().valid(true).error((errors) => new Error('hi2'))
  }),
  hasCar: Joi.boolean().valid(true),
  carNumber: Joi.string().when('hasCar', {
    is: true,
    then: Joi.required().error((errors) => new Error('hi'))
  })
})

const result = schema.validate(invalidValues, {
  abortEarly: false
})

console.log(result);
