export const mainTemplate = () => `
  <div>
      <div class="form">
      </div>
      <hr/>
      <h3>Select model</h3>
      <ul class="models">
          <li><label><input type="radio" name="select-model" value="0"/>&nbsp;Timer</label></li>
          <li><label><input type="radio" name="select-model" value="1"/>&nbsp;Counter</label></li>
          <li><label><input type="radio" name="select-model" value="2"/>&nbsp;Random number</label></li>
      </ul>
      <pre class="model-state">
      </pre>
  </div>
`;

export const formTemplate = () => `
  <div class="form-item">
    <label>
      Enter your name: <input type="text" class="name" size="40" value=""/>
    </label>
  </div>
  <div class="form-item">
    <label>
    Base64 code name: <input type="text" class="output" size="40" value=""/>
    </label>
  </div>
  <div class="form-item"><span class="current-time">
    &nbsp;</span>
  </div>
`;
