// Отвечает за обмен с сервером информацией по гонкам
const SMRaces = (function() {
  return {
    /**
    * @description Класс объектов гонки. Содержи в себе учавствующие лодки с треками и
    *              другие элементы гонки
    */
    Race: function(id) {
      return {
        id: id,
        name: null,
        begin: null,
        end: null,
        start: null,
        finish: null,
        location: null,
        about: null,
        boats: [],
        __proto__: {
          /**
          * @description Загружает данные для объекта гонки и инициализирует его.
          * @return {Promise} Возвращает <code>Promise</code> после загрузки.
          */
          async load() {
            if(id == undefined){
              console.error('Гонка не загружена');
              return;
            }
            // Загружаем параметры гонки.
            try {
              const race = await SMRaces.getone(id);
                this.name = race.name;
                this.begin = race.begin;
                this.end = race.end;
                this.start = race.start;
                this.finish = race.finish;
                this.location = race.location;
                this.about = race.about;
                console.log(this);
              // Загружаем список id лодок и трекеров, назначенным для них.
              // Инициализируем пустые массивы под участников
              // для дальнейшего заполнения.
              const config = await SMRaces.getmembers(id);
              config.forEach((item, i, arr) => {
                const boat = new SMBoats.boat();
                boat.id = item.boat_id;
                boat.name = item.boat_name;
                boat.gadget = item.gadget_id;
                boat.role = item.status_id;
                boat.about = item.about;
                this.boats.push(boat);
              });
              // Загружаем треки для лодок.
              for(let i=0; i < this.boats.length; i++){
                let track;
                try {
                  track = await SMTracks.loadTrack(this.boats[i].id, this.begin, this.end);
                } catch (e) {
                  console.error('Ошибка трека: ' + e);
                } finally {
                  this.boats[i].track = track;
                }
              }
            } catch (err) {
              console.error(err);
            }
          },
          getListMembers() {
            const members = [];
            this.boats.forEach((boat, i, arr) => {
              members.push([ boat.id, boat.name ]);
            });
            return members;
          }
        }
      };
    },
    /**
    * @description Асинхронный метод. Загружает параметры одной гонки.
    * @param {int} idRace Id гонки в базе данных.
    * @return {Promise} Возвращает объект с параметрами гонки.
    */
    async getone(idRace) {
      const data = {
        idrow: idRace
      };
      try {
        const result = await fetch(`${urlApi}/races/getone`, {
          method: 'POST',
          mode: 'cors',
          headers: SMHeaders,
          body: JSON.stringify(data)
        });
        const resultJSON = await result.json();
        return resultJSON[0];
      } catch (err) {
        console.error(err);
      }
    },
    /**
    * @description Загружает список всех гонок
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
    /**
    * @description Загружает конфигурацию гонки
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
          tbRaceConfig.rows.add(SMUtils.objArr2arrArr_raw(dataSet));
          tbRaceConfig.draw();
        })
        .catch(err => console.log(err));
    },
    /**
    * @description Удаляет запись о гонке
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
    /**
    * @description Удаляет запись о гонке
    * @param {id} Id записи для удаления
    * @param {idRace} Id гонки, для которой показана конфигурация
    * @param {tbRaceConfig} Объект таблицы GUI
    */
    removeConfig(id, idRace, tbRaceConfig) {
      const data = {
        idrow: id
      };
      fetch(`${urlApi}/races/removeConfig`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getconfig(tbRaceConfig,idRace);
        })
        .catch(err => console.log(err));
    },
    /**
    * @description Получает список участвующих лодок
    * @param {idRace} Id гонки
    * @return {Promise} Возвращает массив объектов лодок
    */
    getboats(idRace) {
      const data = {
        idrace: idRace
      };
      return fetch(`${urlApi}/races/getboats`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .catch(err => console.error(err));
    },
    /**
    * @description Асинхронный метод. Получает список участвующих лодок
    *              и трекеров, зарегистрированных для этих лодок
    * @param {idRace} Id гонки
    * @return {Promise} Возвращает массив объектов
    */
    async getmembers(idRace) {
      const data = {
        idrace: idRace
      };
      try {
        const result = await fetch(`${urlApi}/races/getmembers`, {
          method: 'POST',
          mode: 'cors',
          headers: SMHeaders,
          body: JSON.stringify(data)
        });
        const resultJSON = await result.json();
        return resultJSON;
      } catch (err) {
        console.error(err);
      }
    },
    /**
    * @description Получает список участвующих трекеров
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
    /**
    * @description Добавляет запись о гонке
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
    /**
    * @description Добавляет запись об участнике в гонке
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
