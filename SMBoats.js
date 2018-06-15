// Отвечает за обмен с сервером информацией по лодкам
const SMBoats = (function() {
  return {
    /** @description Загружает список всех лодок
    * @param {tbBoats} Объект таблицы GUI, контейнера данных
    */
    getall(tbBoats) {
      fetch(`${urlApi}/boats/getall`, {
        method: 'GET',
        mode: 'cors',
        headers: SMHeaders
      })
        .then(res => res.json())
        .then(dataSet => {
          tbBoats.clear();
          tbBoats.rows.add(SMUtils.objArr2arrArr(dataSet, 'SMBoats'));
          tbBoats.draw();
        })
        .catch(err => console.log(err));
    },
    // /** @description Загружает список всех лодок для простого списка
    // * @param {tbBoats} Объект таблицы GUI, контейнера данных
    // */
    // getall_list(tbBoats) {
    //   fetch(`${urlApi}/boats/getall`, {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: SMHeaders
    //   })
    //     .then(res => res.json())
    //     .then(dataSet => {
    //       tbBoats.clear();
    //       tbBoats.rows.add(SMUtils.objArr2arrArr(dataSet, 'SMBoatsList', [false, false, false]));
    //       tbBoats.draw();
    //     })
    //     .catch(err => console.log(err));
    // },
    /** @description Удаляет запись о лодке
    * @param {id} Id записи для удаления
    * @param {tbBoats} Объект таблицы GUI
    */
    remove(id, tbBoats) {
      const data = {
        idrow: id
      };
      fetch(`${urlApi}/boats/remove`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getall(tbBoats);
        })
        .catch(err => console.log(err));
    },
    /** @description Добавляет запись о лодке
    * @param {data} Данные о лодке
    * @param {tbBoats} Объект таблицы GUI
    */
    add(data, tbBоats) {
      fetch(`${urlApi}/boats/add`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getall(tbBоats);
        })
        .catch(err => console.log(err));
    }
  };
}());
