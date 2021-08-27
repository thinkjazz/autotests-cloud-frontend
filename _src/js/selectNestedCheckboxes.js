let checkAllGithub = document.getElementById("option1"); //Родительский чекбокс гитхаба
let checkBoxesGithub = document.querySelectorAll("input.github"); //Дочерний чекбокс

let checkAllJenkins = document.getElementById("option3"); //Родительский чекбокс Jenkins
let checkBoxesJenkins = document.querySelectorAll("input.jenkins"); //Дочерний чекбокс

function selectingAllNestedCheckboxes(parents, childs, className) {
  for (let i = 0; i < childs.length; i++) {
    childs[i].onclick = function () {
      let checkedCount = document.querySelectorAll(
        `input.${className}:checked`
      ).length;

      parents.checked = checkedCount > 0;
      parents.indeterminate = checkedCount > 0 && checkedCount < childs.length;
    };
  }

  parents.onclick = function () {
    for (let i = 0; i < childs.length; i++) {
      childs[i].checked = this.checked;
    }
  };
}


export  { selectingAllNestedCheckboxes, checkAllGithub, checkBoxesGithub, checkAllJenkins, checkBoxesJenkins };