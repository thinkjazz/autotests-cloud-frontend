 
// Эта функция возвращает массив объектов с добавлеными полями из разобраной строки из localStorage
function loadingStateFromStorage() {
  let archive = []; // Массив выходных данных
  let keys = Object.keys(localStorage); //Возвращаем массив из собственных перечисляемых свойств переданного объекта, в том же порядке, в котором они бы обходились циклом for... in - это быстрее
  let i = 0;
  let key;
  // Проходим циклом и добавляем в массив объекты из localStorage
  console.log("localStorage: " + localStorage);
  console.log("keys Object.keys(localStorage): " + keys);
  for (; (key = keys[i]); i++) {
    console.log("i: " + i);
    console.log("key: " + key);

    if (key.includes("steps")) {
      console.log("localStorage.getItem(key): " + localStorage.getItem(key));
      console.log(
        "JSON.parse(localStorage.getItem(key)): " +
          JSON.parse(localStorage.getItem(key))
      );
      archive.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  console.log("archive: " + JSON.stringify(archive));

  return archive;
}

export default loadingStateFromStorage;