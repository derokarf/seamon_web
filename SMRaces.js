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
    /** @description Загружает конфигурацию гонки
    * @param {tbRaceConfig} Объект таблицы GUI, контейнера данных
    */
    getconfig(tbRaceConfig, idRace) {
      const data = {
        idrow: idRace
      };
      fetch(`${urlApi}/races/getconfig`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(dataSet => {
          tbRaceConfig.clear();
          tbRaceConfig.rows.add(SMUtils.objArr2arrArr(dataSet, 'SMRaceConfig', [true, false, true]));
          tbRaceConfig.draw();
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
    /** @description Получает список участвующих лодок
    * @param {idRace} Id гонки
    * @param {tbRaces} Объект таблицы GUI
    */
    getboats(idRace, tbBoats) {
      const data = {
        idrace: idRace
      };
      fetch(`${urlApi}/races/getboats`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(dataSet => {
          tbBoats.clear();
          tbBoats.rows.add(SMUtils.objArr2arrArr_raw(dataSet));
          tbBoats.draw();
        })
        .catch(err => console.log(err));
    },
    /** @description Получает список участвующих трекеров
    * @param {idRace} Id гонки
    * @param {tbGadgets} Объект таблицы GUI
    */
    getgadgets(idRace, tbGadgets) {
      const data = {
        idrace: idRace
      };
      fetch(`${urlApi}/races/getgadgets`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(dataSet => {
          tbGadgets.clear();
          tbGadgets.rows.add(SMUtils.objArr2arrArr_raw(dataSet));
          tbGadgets.draw();
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
    },
    /** @description Добавляет запись об участнике в гонке
    * @param {data} Данные об участнике
    * @param {tbRaces} Объект таблицы GUI
    */
    addConfig(data, tbRaceConfig) {
      fetch(`${urlApi}/races/addConfig`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getconfig(tbRaceConfig,data.raceConfigIdRace);
        })
        .catch(err => console.log(err));
    }
  };
}());
