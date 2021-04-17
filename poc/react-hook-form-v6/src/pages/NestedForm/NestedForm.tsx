import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Wrapper } from "../../components";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

enum PaymentType {
  NOT_SELECTED = "",
  /** 한번 */
  ONCE = "ONCE",
  /** 정기 */
  MANY = "MANY",
}

interface Subscription {
  name: string;
  paymentType: PaymentType;
  paymentDayTerm: "" | "1주" | "1달" | "1년";
}

interface User {
  name: string;
  hasTel: boolean;
  tel: string;
  subscriptions: Subscription[];
}

interface MainForm {
  users: User[];
}
export const NestedForm = () => {
  const methods = useForm<MainForm>({
    defaultValues: {
      users: [
        {
          name: "김관덕",
          subscriptions: [
            {
              name: "넷플릭스",
              paymentDayTerm: "1년",
              paymentType: PaymentType.ONCE,
            },
          ],
        },
      ],
    },
  });
  const { control, handleSubmit, getValues, watch } = methods;
  const { fields, append } = useFieldArray<User>({
    name: "users",
    control,
  });
  return (
    <>
      <DevTool control={control} />
      <Wrapper>
        <h2>NestedForm 컴포넌트</h2>
        <p>
          index 설정에 주의해야한다. 오타가 나지 않도록 조심하자. 타입을 줄
          방법이 있을까? 하위 필드를 사용할 때는 key를 꼭 전달하자. useForm에서
          전달한 기본값이 있더라도, 각 인풋에 defaultValue가 전달되지 않으면
          값이 올바르게 표시되지 않는다.
        </p>
        <FormProvider {...methods}>
          {fields.map((field, index) => (
            <div key={field.id}>{field.name}</div>
          ))}
          <div
            onClick={() => {
              append({
                name: "",
                hasTel: false,
                subscriptions: [],
                tel: "",
              });
            }}
          >
            추가
          </div>
          {fields.map((field, index) => (
            <SubForm key={field.id} field={field} index={index} />
          ))}
          <div>
            <button
              onClick={handleSubmit(
                () => {
                  console.log("---------성공-----------");
                  console.log(JSON.stringify(getValues(), null, 2));
                },
                (error) => {
                  console.log("---------에러-----------");
                  console.log(JSON.stringify(getValues(), null, 2));
                  console.log(error);
                }
              )}
            >
              전송
            </button>
          </div>
        </FormProvider>
      </Wrapper>
    </>
  );
};

function SubForm({ field: f1, index }: { field: FieldValues; index: number }) {
  const { control, register } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { append, fields, remove } = useFieldArray<Subscription>({
    control,
    name: `users[${index}].subscriptions`,
  });

  console.log(index, f1.id);

  return (
    <div>
      <input
        ref={register()}
        name={`users[${index}].name`}
        type="text"
        defaultValue={f1.name}
      />
      {fields.map((field, k) => (
        // key를 꼭 명시해주어야한다.
        <div key={field.id}>
          {field.id}
          {field.name} | {field.paymentType} | {field.paymentDayTerm}
          <input
            ref={register()}
            type="hidden"
            name={`users[${index}].subscriptions[${k}].name`}
            defaultValue={field.name}
          />
          <input
            ref={register()}
            type="hidden"
            name={`users[${index}].subscriptions[${k}].paymentType`} // subscription 으로 오타가 나지 않도록 주의하자!
            defaultValue={field.paymentType}
          />
          <input
            ref={register()} // register가 아니라 register()로 해주어야 삭제후에도 오류가 없다. map 중에 register가 호출되도록 처리해주어야한다.
            type="hidden"
            name={`users[${index}].subscriptions[${k}].paymentDayTerm`}
            defaultValue={field.paymentDayTerm} // defaultValue를 꼭 명시해주어야한다.
          />
          <Button
            colorScheme="red"
            size="xs"
            onClick={() => {
              remove(k);
            }}
          >
            삭제
          </Button>
        </div>
      ))}

      <Button onClick={onOpen}>내 구독 상품 정보 추가</Button>
      <SubscriptionAddForm
        isOpen={isOpen}
        onClose={onClose}
        onOk={(values) => {
          append(values);
        }}
      />
    </div>
  );
}

function SubscriptionAddForm({
  isOpen,
  onClose,
  onOk,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOk: (result: Subscription) => void;
}) {
  const { register, handleSubmit, errors } = useForm<Subscription>({
    defaultValues: {
      name: "",
      paymentType: PaymentType.NOT_SELECTED,
      paymentDayTerm: "",
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <label>
              구독상품 명:{" "}
              <input
                ref={register({
                  required: "상품명을 입력하세요~",
                })}
                name="name"
                type="text"
              />
            </label>
            {errors.name?.message}
          </div>
          <div>
            결제방식:
            <label>
              <input
                // NOTE: 모든 radio input에 동일하게 등록해주어야 합니다.
                ref={register({
                  required: "aa선택해주세요.",
                })}
                name="paymentType"
                type="radio"
                value={PaymentType.ONCE}
              />
              일시불
            </label>
            <label>
              <input
                ref={register({
                  required: "bb선택해주세요.",
                })}
                name="paymentType"
                type="radio"
                value={PaymentType.MANY}
              />
              할부
            </label>
            {errors.paymentType?.message}
          </div>
          <div>
            <label>
              구독상품 명:
              <select
                ref={register({
                  required: "구독상품을 선택해주세요.",
                })}
                name="paymentDayTerm"
              >
                <option value="">선택해주세요.</option>
                <option value="1주">1주</option>
                <option value="1달">1달</option>
                <option value="1년">1년</option>
              </select>
            </label>
            {errors.paymentDayTerm?.message}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit(
              (values) => {
                onOk(values);
                onClose();
              },
              () => {}
            )}
          >
            추가
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
