import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

type Inputs = {
  name: string;
  reversedName: string;
  phoneNumber: string;
  canAlcohol: boolean;
  alcoholType: string;
  drinkType: string;
  drinkEtc: string;
  candidateName: string;
  candidatePhoneNumber: string;
};

const schema = yup.object().shape({}).defined();

function App() {
  const [formState, setFormState] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    errors,
    getValues,
    setValue,
    unregister,
    formState: hillState,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      alcoholType: "소주",
    },
  });
  const onSubmit = (data: any) => {
    console.log("submit");
    setFormState(data);
  };

  const canAlcohol = watch("canAlcohol");
  const drinkType = watch("drinkType");
  console.log(canAlcohol);
  const fields = watch();

  return (
    <div className="App">
      <h1>React Hook Form</h1>
      <section>
        <h2>파티 참석자</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label>한글명</label>
              <input
                ref={register}
                name="name"
                type="text"
                onChange={(e) => {
                  setValue(
                    "reversedName",
                    (e.target.value || "").split("").reverse().join("")
                  );
                }}
              />
            </div>
            <div>
              <label>거꾸로 이름</label>
              <input ref={register} name="reversedName" type="text" />
            </div>
            <div>
              <label>휴대폰 번호</label>
              <input ref={register} name="phoneNumber" type="text" />
            </div>
            <div>
              <label>음주가능 여부</label>
              <input ref={register} name="canAlcohol" type="checkbox" />
              {canAlcohol ? (
                <select key="alcoholType" ref={register} name="alcoholType">
                  <option value="소주">소주</option>
                  <option value="맥주">맥주</option>
                  <option value="양주">양주</option>
                </select>
              ) : (
                <select key="drinkType" ref={register} name="drinkType">
                  <option value="콜라">콜라</option>
                  <option value="사이다">사이다</option>
                  <option value="기타">기타</option>
                </select>
              )}
              {drinkType === "기타" ? (
                <input ref={register} type="text" name="drinkEtc" />
              ) : null}
            </div>
          </div>
          <hr />
          <div>
            대표자 정보
            <div>
              <input
                ref={register}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue("candidateName", getValues("name"));
                  }
                }}
              />
              <label>위 정보와 동일</label>
            </div>
            <div>
              이름: <input ref={register} type="text" name="candidateName" />
              <br />
              휴대폰 번호:{" "}
              <input ref={register} type="text" name="candidatePhoneNumber" />
            </div>
          </div>

          <button>제출</button>
        </form>
      </section>
      <section>
        <h2>제출 결과</h2>
      </section>
      <button onClick={() => unregister("name")}>이름 거거</button>
      <div>
        <h2>폼 값</h2>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
        <h2>폼 상태</h2>
        <pre>{JSON.stringify(hillState, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
