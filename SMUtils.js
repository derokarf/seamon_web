// utilities and supply function
const SMUtils = (function() {
  return {
    /** @description Конвертирует GPS координаты из формата градусы минуты секунды
    /* в градусы double
    /* @param {value} широта или долгода в "градусы минуты секунды"
    /* @return {float} широта или долгота во float
    */
    latlng2deg (value) {
      value += '';
      const degrees = value.slice(0, value.indexOf('.') - 2);
      const minutes = value.slice(value.indexOf('.') - 2);
      return parseInt(degrees, 10) + (parseFloat(minutes, 10) / 60);
    },
    /** @description Конвертируем результат из массива объектов
    * в "массив массивов" для DataTables и код для кнопок управления записью
    * @param {objArray} "Массив объектов"
    * @param {typeTable} Тип таблицы в GUI
    * @param {listButtons} Список управляющих кнопок для записи true/false [edit manage delete]
    * @return {array[][]} Возвращает двумерный массив, "массив массивов" и
    * код html для управляющих кнопок
    */
    objArr2arrArr (objArray, typeTable, listButtons) {
      // Если вызывается типичная таблица
      if (typeof listButtons == 'undefined'){
        listButtons = [true, false, true];
      }
      const arrArr = [];
      for (let i = 0; i < objArray.length; i++) {
        const tmp = [];
        Object.keys(objArray[i]).forEach(key => {
          tmp.push(objArray[i][key]);
        });
        let codBt = ``;
        //btEdit
        if(listButtons[0]){
          codBt = `${codBt}<button data-row-id="${objArray[i].id}"
            data-table-name="${typeTable}" onclick="clickBtEdit(event)">=</button>`;
        }
        //btManage
        if(listButtons[1]){
          codBt = `${codBt}<button data-row-id="${objArray[i].id}"
            data-table-name="${typeTable}" onclick="clickBtConfig(event)">...</button>`
        }
        //btDelete
        if(listButtons[2]){
          codBt = `${codBt}<button data-row-id="${objArray[i].id}"
            data-table-name="${typeTable}" onclick="clickBtDel(event)">x</button>`;
        }
        tmp.push(codBt);
        arrArr.push(tmp);
      }
      return arrArr;
    }
  };
}());
