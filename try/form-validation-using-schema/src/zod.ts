import { TypeOf, z, ZodError } from 'zod';
import { invalidValues,
validValues1,validValues2,validValues3,
} from './values';

type Values = {
  userName: string;
  age: number;
  agreeOfParent: boolean;
  hasCar: boolean;
  carNumber: string;
}

const schema = z.object({
  userName: z.string().min(1),
})

const ageSchema = z.object({
  age: z.number().min(0),
  agreeOfParent: z.boolean(),
}).refine((data) => {
  if (data.age < 20 && data.agreeOfParent === false) {
    return false;
  }

  return true;
}, {
  message: '미성년자는 부모의 동의가 필요합니다.',
  path: ['agreeOfParent'] as (keyof Values)[]
})

const carSchema = z.object({
  hasCar: z.boolean(),
  carNumber: z.string()
}).refine((data) => {
  if (data.hasCar && data.carNumber.length === 0) {
    return false;
  }

  return true;
}, {
  message: '자동차 번호를 입력해주세요.',
  path: ['carNumber'] as (keyof Values)[]
})

const finalSchema: z.ZodType<Values> = schema.and(ageSchema).and(carSchema)


const values: Values = validValues3

try {
  finalSchema.parse(values)
} catch (err) {
  console.log('--------');
  console.log(err);
}
