import { AbstractComponent } from "./AbstractComponent";

export class Testcase extends AbstractComponent {
  constructor(number) {
    super();
    this._number = number;
    this._addRemoveButton = this._addRemoveButton();
  }

  _addRemoveButton() {
    const removeButton = this.getElement().querySelector("button");

    removeButton.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getTemplate() {
    return `<fieldset class="testcase testcase--added mb-4">
    <div class="form-control mb-4">        
        <div class="flex space-x-2">
        <input type="text" placeholder="Name your test case" class="input input-bordered w-full"
        name="testcase_${this._number}">
            <button class="btn btn--red" onclick="event.preventDefault()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    class="inline-block w-4 h-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </div>

    <div class="form-control form-control--scenario">
        <textarea class="textarea relative textarea-bordered h-36 max-h-44 mb-4"
            placeholder="scenario-${this._number}" name="scenario_${this._number}"></textarea>
    </div>
</fieldset>`;
  }
}
