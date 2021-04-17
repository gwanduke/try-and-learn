import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { PaymentType, Subscription } from "./type";

export function NewSubscriptionFormModal({
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
