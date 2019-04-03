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
  function StationLineScale(){
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
var linestyle= new ol.style.Style({
 stroke: new ol.style.Stroke({
   width: 3,
  color: 'rgba(255, 69, 0, 0.9)'
 })
})
   var iconFeature = new ol.Feature({
     geometry: new ol.geom.Point(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857')),
     name: '监测站'
   });
   
   iconFeature.setStyle(ridiostation);
   var scaleFeature = new ol.Feature(new ol.geom.Circle(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857'), 3000 ));
   scaleFeature.setStyle(scalestyle);
   var lineFeature = new ol.Feature({
    // geometry:new ol.geom.LineString(ol.proj.transform([[104.11069, 30.6289], [103.11069,30.6289]],'EPSG:4326', 'EPSG:3857')),
    geometry:new ol.geom.LineString([ol.proj.transform([104.11069, 30.6289],'EPSG:4326', 'EPSG:3857'), ol.proj.transform([104.13750,30.6289],'EPSG:4326', 'EPSG:3857')]),
    name:'目标线'
      });
  //  var smalldisscaleFeature = new ol.Feature(new ol.geom.Circle(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857'), 1000 ));
 lineFeature.setStyle(linestyle);
 var source = new ol.source.Vector({
    projection: 'EPSG:4326',
  //  features: [scaleFeature,iconFeature, smalldisscaleFeature],
   features: [iconFeature,scaleFeature,lineFeature],
   wrapX: false
 });
 var stationvector = new ol.layer.Vector({
 source: source
 });
   map.addLayer(stationvector);

   // 监听地图层级变化
  map.getView().on('change:resolution', function(){
    var style = iconFeature.getStyle();
    // 重新设置图标的缩放率，基于层级10来做缩放
    style.getImage().setScale(this.getZoom()/70);
    iconFeature.setStyle(style);
})
   }
   
   var map = createMap('map');
   //卫星图层的切换
   var satellitetag=true;
   StationLineScale();
//   //添加无人机
//   var plane=new ol.style.Style({
//     image: new ol.style.Circle({
//       radius: 10,
//       snapToPixel: false,
//       fill: new ol.style.Fill({color: 'yellow'}),
//       stroke: new ol.style.Stroke({color: 'red', width: 1})
//     })
// })
// var omegaTheta = 30000; // Rotation period in ms运动时间
// var coordinates = [104.10069, 30.6289];
// map.on('postcompose', function(event) {
//   var vectorContext = event.vectorContext;
//   var frameState = event.frameState;
//   var time=frameState.time
//     if(coordinates[0]<104.11100||coordinates[1]<30.6389)
//       {
//         var x=coordinates[0]+0.00001;
//         var y=coordinates[1]+0.00001;
//         cc=document.getElementById("gauge")
//         option.series[0].data[0].value = (Math.random()*180).toFixed(2) - 0;
//         // option.series[1].data[0].value = (Math.random()*180).toFixed(2) - 0;
//         myChart.setOption(option, true); 
//       }
//       else{
//         var x=coordinates[0];
//         var y=coordinates[1];
//       }
    
//     coordinates=[x,y];
//   vectorContext.setStyle(plane);
//   vectorContext.drawGeometry(new ol.geom.Point(ol.proj.transform( coordinates, 'EPSG:4326', 'EPSG:3857')));
//   map.render();
// });
//地图切换
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
 