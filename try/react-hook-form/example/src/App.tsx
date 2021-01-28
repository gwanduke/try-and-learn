import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Inputs = {
  name: string;
  birthday: string;
  age: number;
  nickname: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  age: yup.number().positive().integer().required(),
  nickname: yup.string(),
});

function App() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="App">
      <h1>React Hook Form</h1>
      <section>
        <h2>파티 참석자</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label>한글명</label>
              <input type="text" />
            </div>
            <div>
              <label>거꾸로 이름</label>
              <input type="text" />
            </div>
            <div>
              <label>휴대폰 번호</label>
              <input type="text" />
            </div>
            <div>
              <label>직업</label>
              <input type="text" />
            </div>
            <div>
              <label>음주가능 여부</label>
              <input type="checkbox" />
              <select name="" id="">
                <option value="소주">소주</option>
                <option value="맥주">맥주</option>
                <option value="양주">양주</option>
              </select>
              <select name="" id="">
                <option value="콜라">콜라</option>
                <option value="사이다">사이다</option>
                <option value="기타">기타</option>
              </select>
              <input type="text" />
            </div>
          </div>
          <hr />
          <div>
            대표자 정보
            <div>
              <input type="checkbox" name="" id="" />
              <label>위 정보와 동일</label>
            </div>
            <div>
              이름: <input type="text" />
              <br />
              휴대폰 번호: <input type="text" />
            </div>
          </div>

          <button>제출</button>
        </form>
      </section>
      <section>
        <h2>제출 결과</h2>
      </section>
      <pre>{JSON.stringify({})}</pre>
    </div>
  );
}

export default App;
