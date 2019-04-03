function openwin() {
   var page1=window.open ('page.html','newwindow1','height=500,width=800,top=0,left=1200,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no,status=no')
  
  }
  function openmanager(){
    var page2=window.open ("management.html", "newwindow2", 'height=600,width=800,top=100,left=600,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no,status=no')

  }
  var url1="http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}";
  var url3="http://mt0.google.cn/maps/vt?lyrs=s@773&gl=cn&x={x}&y={y}&z={z}";
  
  function createMap(divId) {
    var openlayer = 
      new ol.layer.Tile({
        visible: false,
        source: new ol.source.OSM({
            wrapX: false
        })
    });
     var usuallayer=new ol.layer.Tile({
            source: new ol.source.XYZ({
              wrapX: false,
                url: url1
            })
        });
    
    var map = new ol.Map({
        layers: [openlayer,usuallayer],
        target: divId,
        view: new ol.View({
            center: ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857'),
            //projection: 'EPSG:4326',
            zoom: 14,
            minZoom: 4,
            maxZoom: 18
           
        })
    });
  
  return map;
 }
 //创建监测站位置、范围线和范围圆
  function StationScale(){
    var  ridiostation = new ol.style.Style({
       image: new ol.style.Icon({
           opacity: 0.8,
           src: "./pictures/信号.png",
          scale:0.2
       })
   })
   var scalestyle= new ol.style.Style({
    fill: new ol.style.Fill({
                   color: 'rgba(20, 100, 240, 0.2)'
               }),
               stroke: new ol.style.Stroke({
                   width: 3,
                   color: 'rgba(0, 100, 240, 0.8)'
               })
})

   var iconFeature = new ol.Feature({
     geometry: new ol.geom.Point(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857')),
     name: '监测站'
   });
   iconFeature.setStyle(ridiostation);
   var scaleFeature = new ol.Feature(new ol.geom.Circle(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857'), 3000 ));
   scaleFeature.setStyle(scalestyle);
 var source = new ol.source.Vector({
    projection: 'EPSG:4326',
   features: [iconFeature,scaleFeature],
   wrapX: false
 });
 var stationvector = new ol.layer.Vector({
 source: source
 });
   stationvector.name = "station";
   map.addLayer(stationvector);

   // 监听地图层级变化
  map.getView().on('change:resolution', function(){
    var style = iconFeature.getStyle();
    // 重新设置图标的缩放率，基于层级10来做缩放
    style.getImage().setScale(this.getZoom()/70);
    iconFeature.setStyle(style);
})
 }
 function createscanningLine(){
  var linestyle= new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: 3,
     color: 'rgba(255, 69, 0, 0.9)'
    })
   })
   var lineFeature = new ol.Feature({
    geometry:new ol.geom.LineString([ol.proj.transform([104.11069, 30.6289],'EPSG:4326', 'EPSG:3857'), ol.proj.transform([104.13750,30.6289],'EPSG:4326', 'EPSG:3857')]),
    name:'目标线'
      });
 lineFeature.setStyle(linestyle);
 var source = new ol.source.Vector({
  projection: 'EPSG:4326',
  wrapX: false
});
source.addFeature(lineFeature);
var linevector = new ol.layer.Vector({
source: source
});
 linevector.name = "scaline";
 map.addLayer(linevector);
 }

 //移除监测站位置、范围线和范围圆
  function removeStationLineScale(){
    var layers = map.getLayers().getArray();
    var layer = undefined;
    for (var index = 0; index < layers.length; index++) {
        var element = layers[index];
        if (element.name === "station"||element.name === "scaline") {
            layer = element;
            map.removeLayer(layer);
        }
    }
 }
 //更新范围线
 function updataScanningline(){
  var layers = map.getLayers().getArray();
  var getlastlayer=layers.length-1;
  if (layers[getlastlayer].name="scaline"){
    map.removeLayer(layers[getlastlayer])
  }
 }
   var map = createMap('map');
   //卫星图层的切换
   var satellitetag=true;
   StationScale();
   createscanningLine();
  //  updataScanningline();
  //  removeStationLineScale();
 myChart.setOption(option, true)
   $('#satellite').click(function(){
     if(satellitetag===true)
     {
       map.getLayers().item(1).setSource(
         new ol.source.XYZ({
             url: url3
         })
       )
     }
     else{
       map.getLayers().item(1).setSource(
         new ol.source.XYZ({
             url: url1
         })
       )
     }
     satellitetag=!satellitetag;
   })
 