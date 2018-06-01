// Отвечает за gps треки и их загрузку/обработку
const SMTracks = (function() {
  const MON_URL = 'http://localhost:8085/api/track';
  return {
    /** @description Загружает трек отдельного трекера из определенной гонки
     * и передает его обработчику результата (handler).
     * @param {function} handler Обработчик результата запроса.
     * @param {number} imei IMEI трекера или телефона
     * @param {number} race Идентификатор гонки, в рамках которой
     * выполняется запрос
     */
    loadFromIMEI(handler, imei, race) {
      return fetch(MON_URL).then(response => response.json().then(data => handler(data)));
    },
    test() {
      return fetch(MON_URL).then(response => response);
    }
  };
}());
