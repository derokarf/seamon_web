// Отвечает за обмен с сервером информацией по трекерам
const SMGadgets = (function() {
  return {
    /** @description Загружает список всех трекеров
    * @param {tbGadgets} Объект таблицы GUI, контейнера данных
    */
    getall(tbGadgets) {
      fetch(`${urlApi}/gadgets/getall`, {
        method: 'GET',
        mode: 'cors',
        headers: SMHeaders
      })
        .then(res => res.json())
        .then(dataSet => {
          tbGadgets.clear();
          tbGadgets.rows.add(SMUtils.objArr2arrArr(dataSet, 'SMGadgets'));
          tbGadgets.draw();
        })
        .catch(err => console.log(err));
    },
    /** @description Удаляет запись о трекере
    * @param {id} Id записи для удаления
    * @param {tbGadgets} Объект таблицы GUI
    */
    remove(id, tbGadgets) {
      const data = {
        idrow: id
      };
      fetch(`${urlApi}/gadgets/remove`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getall(tbGadgets);
        })
        .catch(err => console.log(err));
    },
    /** @description Добавляет запись о трекере
    * @param {data} Данные о лодке
    * @param {tbGadgets} Объект таблицы GUI
    */
    add(data, tbBоats) {
      fetch(`${urlApi}/gadgets/add`, {
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
