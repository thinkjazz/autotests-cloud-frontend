import { AbstractComponent } from "./AbstractComponent";

export class Testcase extends AbstractComponent {
  constructor(number) {
    super();
    this.number = number;
    this._element = null;
  }

  getTemplate() {
    return `<fieldset class="testcase mb-4">
    <div class="form-control mb-4">
        <input type="text" placeholder="Name your test case" class="input input-bordered"
            name="testcase_${this.number}">
    </div>

    <div class="form-control form-control--scenario">
        <textarea class="textarea relative textarea-bordered max-h-36 mb-4"
            placeholder="scenario-${this.number}" name="scenario_${this.number}"></textarea>
    </div>
</fieldset>`;
  }
}
