// Отвечает за gps треки и их загрузку/обработку
// Тестовые данные start = 1530269726000
// stop = 1530967303000
const SMTracks = (function() {
  const MON_URL = 'http://localhost:8085/api/track';
  return {
    /** @description Загружает трек отдельного трекера из определенной гонки
     *               и передает его обработчику результата (handler).
     * @param {function} handler Обработчик результата запроса.
     * @param {number} imei IMEI трекера или телефона
     * @param {number} race Идентификатор гонки, в рамках которой
     * выполняется запрос
     */
    loadFromIMEI(handler, imei, race) {
      return fetch(MON_URL).then(response => response.json().then(data => handler(data)));
    },
    /**
    * @description Загружает трек трекера за указанное время.
    *              Сортировка по времени.
    * @param {number} id Id трекера.
    * @param {number} start Начальное время.
    * @param {number} stop Конечное время.
    * @return {Promise} При успехе возвращает массив GPSRMC.
    */
    loadTrack(id, start, stop) {
      const data = {
        id: id,
        start: start,
        stop: stop
      };
      return fetch(`${urlApi}/tracks/gettrack`, {
        method: 'POST',
        mode: 'cors',
        headers: SMHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json());
    },
    test() {
      return fetch(MON_URL).then(response => response);
    },
    /**
    * @description Объект единичной записи трекера
    * @param {array} attr Массив для прочих параметров, отличающихся в
    *                     зависисмости от типа или модели трекера
    */
    rowGPS(ttdd,lat,lng,speed,course,attr){
      this.ttdd = ttdd;
      this.lat = lat;
      this.lng = lng;
      this.speed = speed;
      this.course = course;
      this.attr = attr;
    }
  };
}());
