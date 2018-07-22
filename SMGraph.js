// Отвечает за отрисовку треков, геоданных, гео-меток
const SMGraph = (function() {
/** viewer - CESIUM Viewer
*/
  return {
    init(viewer) {
      this.viewer = viewer;
    },
    drawTrack(listGps, viewer) {
      const lineTrack = new Cesium.PolylineCollection();
      lineTrack.add({
        positions: Cesium.Cartesian3.fromDegreesArray(listGps),
        width: 4
      });
      viewer.scene.primitives.add(lineTrack);
    },
    /**
    * @description Ставит визуальный "флаг" на карте.
    * @param {array} GPS точка.
    * @param {Object} Cesium Viewer
    */
    drawFlag(point, viewer){
      const flag = viewer.entities.add({
        name : 'Flag',
        position: Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 15),
        cylinder : {
          length: 30,
          topRadius: 2,
          bottomRadius: 2,
          material : Cesium.Color.BLUE
        }
      });
      return flag;
    }
  };
}());
