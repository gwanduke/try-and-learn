import { Fragment, useState } from "react";
import {
  ArrayField,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Form } from "../../components/Form";
import { Button } from "../../components/Button";
import { FormTitle } from "../../components/FormTitle";
import { FormRow } from "../../components/FormRow";
import { Label } from "../../components/Label";
import { TextInput } from "../../components/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

enum Company {
  "태구은행" = "태구은행",
  "푸산은행" = "푸산은행",
  "구한은행" = "구한은행",
  "한국은행" = "한국은행",
  "미국은행" = "미국은행",
  "고구려증권" = "고구려증권",
}

enum ApplyType {
  "신입" = "신입",
  "경력" = "경력",
}
enum ApplySector {
  "영업" = "영업",
  "마케팅" = "마케팅",
  "개발" = "개발",
  "기타" = "기타",
}

interface Recommender {
  name: string;
  workingWith: boolean;
  workingWithText: string;
}

interface FormValues {
  name: string;
  regNo: string;
  birthday: string;
  age: number;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  email: string;
  applyCompanies: Company[];
  applyType: ApplyType;
  applySector: ApplySector;
  applySectorEtc: string;
  recommender: Recommender[];
}

const NameField = () => {
  const { errors } = useFormContext();
  console.log("NameField", errors);
  return (
    <div>
      <FormRow
        label={<Label htmlFor="name">이름</Label>}
        field={<TextInput type="text" id="name" name="name" />}
      />
      {errors.name?.message}
    </div>
  );
};

const RegNoField = () => {
  const { setValue } = useFormContext();

  return (
    <FormRow
      label={<Label htmlFor="regNo">주민등록번호</Label>}
      field={
        <TextInput
          type="text"
          id="regNo"
          name="regNo"
          onChange={(e) => {
            setValue("regNo", formatRegNo(e.target.value));
          }}
        />
      }
    />
  );
};

const BirthdayField = () => {
  return (
    <FormRow
      label={<Label htmlFor="birthday.year">생일</Label>}
      field={
        <div style={{ display: "flex" }}>
          <TextInput
            maxLength={4}
            type="text"
            id="birthday.year"
            name="birthday.year"
          />
          년
          <TextInput
            maxLength={2}
            type="text"
            id="birthday.month"
            name="birthday.month"
          />
          월
          <TextInput
            maxLength={2}
            type="text"
            id="birthday.day"
            name="birthday.day"
          />
          일
        </div>
      }
    />
  );
};

const AgeField = () => {
  return (
    <FormRow
      label={<Label htmlFor="age">나이</Label>}
      field={<TextInput type="text" id="age" name="age" />}
    />
  );
};

const AddressField = () => {
  return (
    <FormRow
      label={<Label htmlFor="address">주소</Label>}
      field={<TextInput type="text" id="address" name="address" />}
    />
  );
};

const ApplyCompaniesField = () => {
  const { register } = useFormContext();

  return (
    <FormRow
      label={"지원 회사"}
      field={
        <Fragment>
          <input
            ref={register}
            type="checkbox"
            id="applyCompanies[0]"
            name="applyCompanies[]"
            value={Company.태구은행}
          />
          <Label htmlFor="applyCompanies[0]">태구은행</Label>
          <input
            ref={register}
            type="checkbox"
            id="applyCompanies[1]"
            name="applyCompanies[]"
            value={Company.푸산은행}
          />
          <Label htmlFor="applyCompanies[1]">푸산은행</Label>
          <input
            ref={register}
            type="checkbox"
            id="applyCompanies[2]"
            name="applyCompanies[]"
            value={Company.한국은행}
          />
          <Label htmlFor="applyCompanies[2]">한국은행</Label>
          <br />
          <input
            ref={register}
            type="checkbox"
            id="applyCompanies[3]"
            name="applyCompanies[]"
            value={Company.미국은행}
          />
          <Label htmlFor="applyCompanies[3]">미국은행</Label>
          <input
            ref={register}
            type="checkbox"
            id="applyCompanies[4]"
            name="applyCompanies[]"
            value={Company.구한은행}
          />
          <Label htmlFor="applyCompanies[4]">구한은행</Label>
          <input
            ref={register}
            type="checkbox"
            id="applyCompanies[5]"
            name="applyCompanies[]"
            value={Company.고구려증권}
          />
          <Label htmlFor="applyCompanies[5]">고구려증권</Label>
        </Fragment>
      }
    />
  );
};

const ControlPanel = () => {
  const [formValues, setFormValues] = useState({});
  const [formStates, setFormStates] = useState({});
  const { formState, reset, getValues } = useFormContext();

  return (
    <div>
      <hr />
      <Button
        onClick={() => {
          localStorage.setItem("__FORM_PAGE1__", JSON.stringify(getValues()));
        }}
      >
        저장
      </Button>

      <Button
        onClick={() => {
          reset(JSON.parse(localStorage.getItem("__FORM_PAGE1__")!));
        }}
      >
        불러오기
      </Button>

      <hr />

      <div>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
        <pre>{JSON.stringify(formStates, null, 2)}</pre>
        <Button
          onClick={() => {
            setFormValues(getValues());
            setFormStates(formState);
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const formatRegNo = (regNo: string = "") => {
  const x = regNo.replace(/\D/g, "").match(/(\d{0,6})(\d{0,7})/)!;

  if (x[2]) {
    return x[1] + " - " + x[2];
  } else {
    return x[1];
  }
};

const formatPhoneNumber = (phoneNumber: string = "") => {
  let x = phoneNumber.replace(/\D/g, "");

  if (x[0] && x[0][0] !== "0") {
    const y = x.match(/(\d{0,4})(\d{0,4})/)!;
    if (y[2]) {
      return y[1] + " - " + y[2];
    }

    return y[1];
  } else {
    const y = x.match(/(\d{0,3})(\d{0,4})(\d{0,4})/)!;

    if (y[3]) {
      return y[1] + " - " + y[2] + " - " + y[3];
    } else {
      if (y[2]) {
        return y[1] + " - " + y[2];
      } else {
        return y[1];
      }
    }
  }
};

const schema = yup.object().shape<Record<keyof FormValues, any>>({
  // address: yup.string().required(),
  // addressDetail: yup.string().required(),
  name: yup.string().required(),
  // phoneNumber: yup.string().required(),
  // age: yup.string().required(),
  // applyCompanies: yup.string().required(),
  recommender: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      workingWith: yup.boolean(),
      workingWithText: yup.string().when("workingWith", {
        is: true,
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
    })
  ),
} as any);

const ResumeForm = () => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    trigger,
    errors,
    formState,
    setError,
    control,
  } = methods;

  const onSubmit = async (data: Partial<FormValues>) => {
    const res = await Promise.resolve({
      error: true,
      data: {
        name: "이름은 필수야!",
      },
    });

    Object.keys(res.data).forEach((key) => {
      setError(key, {
        message: res.data[key as "name"],
      });
    });

    console.log(res);
  };

  // TODO: onError에서 포커스를 커스텀할 수 있다.
  const onError = (err: any) => {
    console.log(err);

    const definedKeys = [
      "recommender",
      "recommender",
      "name",
      "regNo",
      "birthday.year",
      "birthday.month",
      "birthday.day",
      "age",
      "address",
      "addressDetail",
      "phoneNumber",
      "email",
      "applyCompanies[]",
      "applyType",
      "applySector",
    ];

    const errKeys = Object.keys(err);
    let errIndex = -1;
    errKeys.forEach((errKey) => {
      console.log(errKey);
      if (errIndex === -1) {
        errIndex = definedKeys.indexOf(errKey);
      } else {
        if (errIndex > definedKeys.indexOf(errKey)) {
          errIndex = definedKeys.indexOf(errKey);
        }
      }
    });
    console.log(errIndex);
    if (errIndex !== -1) {
      console.log(definedKeys[errIndex], errIndex);

      if (control && control.fieldsRef && control.fieldsRef.current) {
        const el = control.fieldsRef.current[definedKeys[errIndex]]?.ref;
        console.log(control.fieldsRef.current, definedKeys[errIndex], el);

        if (el) {
          el?.focus && el?.focus();
        }
      }
    }
  };

  const applySector = watch("applySector");

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormTitle title="Form 기능 테스트" />
        <FormRow label={<h2>추천인</h2>} field={<RecommenderFields />} />
        <NameField />
        <RegNoField />
        <BirthdayField />
        <AgeField />
        <AddressField />
        <FormRow
          label={<Label htmlFor="addressDetail">주소 상세</Label>}
          field={
            <TextInput type="text" id="addressDetail" name="addressDetail" />
          }
        />
        <FormRow
          label={<Label htmlFor="phoneNumber">전화번호</Label>}
          field={
            <TextInput
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={(e) => {
                setValue("phoneNumber", formatPhoneNumber(e.target.value));
              }}
            />
          }
        />
        <FormRow
          label={<Label htmlFor="email">이메일</Label>}
          field={<TextInput type="text" id="email" name="email" />}
        />
        <ApplyCompaniesField />
        <FormRow
          label={<Label htmlFor="applyType">경력/신입</Label>}
          field={
            <select ref={register} name="applyType" id="applyType">
              <option value={ApplyType.경력}>
                {ApplyType[ApplyType.경력]}
              </option>
              <option value={ApplyType.신입}>
                {ApplyType[ApplyType.신입]}
              </option>
            </select>
          }
        />
        <FormRow
          label={<Label htmlFor="applySector">지원 부서</Label>}
          field={
            <select ref={register} name="applySector" id="applySector">
              <option value={ApplySector.개발}>
                {ApplySector[ApplySector.개발]}
              </option>
              <option value={ApplySector.마케팅}>
                {ApplySector[ApplySector.마케팅]}
              </option>
              <option value={ApplySector.영업}>
                {ApplySector[ApplySector.영업]}
              </option>
              <option value={ApplySector.기타}>
                {ApplySector[ApplySector.기타]}
              </option>
            </select>
          }
        />
        {applySector === ApplySector.기타 && (
          <FormRow
            label={<Label htmlFor="applySectorEtc">지원 부서 기타</Label>}
            field={
              <TextInput
                type="text"
                id="applySectorEtc"
                name="applySectorEtc"
              />
            }
          />
        )}
        <ControlPanel />
        <button type="submit">전송</button>
      </Form>
    </FormProvider>
  );
};

function RecommenderFields() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray<Recommender>({
    control,
    name: "recommender",
  });
  const value = useWatch<Recommender[]>({
    control,
    name: `recommender`,
  });

  return (
    <div>
      <button
        onClick={() => {
          append({
            name: "",
            workingWith: false,
            workingWithText: "",
          });
        }}
      >
        추가
      </button>
      {console.log(fields)}
      {/* TODO: 빠른 삭제시 오류 있음 */}
      {fields.map((field, index) => (
        <RecommenderField
          key={field.id}
          field={field}
          index={index}
          onRemove={remove}
        />
      ))}
    </div>
  );
}

function RecommenderField({
  field,
  index,
  onRemove,
}: {
  field: Partial<ArrayField<Recommender, "id">>;
  index: number;
  onRemove: (index?: number | number[] | undefined) => void;
}) {
  const { register, control, setValue, getValues } = useFormContext();
  const value = useWatch<Recommender[]>({
    control,
    name: `recommender`,
  });

  return (
    <div>
      {index}
      <div>
        <span>이름</span>
        <input
          type="text"
          name={`recommender[${index}].name`}
          ref={register()}
          defaultValue={field.name}
        />
        <button
          onClick={() => {
            console.log(getValues());
            setValue(`recommender[${index}].name`, getValues("name"));
          }}
        >
          이름 복사
        </button>
      </div>
      <div>
        <span>함께 일했었나요?</span>
        <input
          type="checkbox"
          name={`recommender[${index}].workingWith`}
          ref={register()}
          defaultChecked={field.workingWith}
        />
      </div>
      {value && value[index]?.workingWith && (
        <div>
          <span>어디서 함께 일했나요?</span>
          <input
            type="text"
            name={`recommender[${index}].workingWithText`}
            ref={register()}
            defaultValue={field.workingWithText}
          />
        </div>
      )}
      <span onClick={() => onRemove(index)}>삭제</span>
      <hr />
    </div>
  );
}

export { ResumeForm };
