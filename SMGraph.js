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
    }
  };
}());
