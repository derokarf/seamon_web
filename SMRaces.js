// Отвечает за обмен с сервером информацией по гонкам
const SMRaces = (function() {
  return {
    /** @description Загружает список всех гонок
    * @param {tbRaces} Объект таблицы GUI, контейнера данных
    */
    getall(tbRaces) {
      fetch(`${urlApi}/races/getall`, {
        method: 'GET',
        mode: 'cors',
        headers: SMHeaders
      })
        .then(res => res.json())
        .then(dataSet => {
          tbRaces.clear();
          tbRaces.rows.add(SMUtils.objArr2arrArr(dataSet, 'SMRaces', [true, true, true]));
          tbRaces.draw();
        })
        .catch(err => console.log(err));
    },
    /** @description Удаляет запись о гонке
    * @param {id} Id записи для удаления
    * @param {tbRaces} Объект таблицы GUI
    */
    remove(id, tbRaces) {
      const data = {
        idrow: id
      };
      fetch(`${urlApi}/races/remove`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getall(tbRaces);
        })
        .catch(err => console.log(err));
    },
    /** @description Добавляет запись о гонке
    * @param {data} Данные о гонке
    * @param {tbRaces} Объект таблицы GUI
    */
    add(data, tbRaces) {
      fetch(`${urlApi}/races/add`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getall(tbRaces);
        })
        .catch(err => console.log(err));
    }
  };
}());
