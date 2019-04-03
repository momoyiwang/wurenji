function openwin() {
    window.open ("page.html", "newwindow", "height=600, width=800, toolbar=no,right=10, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
  }
  var url1="http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
  var url2="http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
  var url3="http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
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
      var annotationlayer=new ol.layer.Tile({
          source: new ol.source.XYZ({
           wrapX: false,
              url: url2
          })
      });
    
    var map = new ol.Map({
        layers: [openlayer,usuallayer,annotationlayer],
        target: divId,
        view: new ol.View({
            center: ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857'),
            //projection: 'EPSG:4326',
            zoom: 10,
            minZoom: 4,
            maxZoom: 18
           
        })
    });
  
  return map;
  }
  function Station(){
   var  ridiostation = new ol.style.Style({
      image: new ol.style.Icon({
          opacity: 0.8,
          src: "./pictures/信号.png",
          scale: 0.25
      })
  })
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857')),
    name: '监测站',
    // population: 4000,
    // rainfall: 500
  });
  iconFeature.setStyle(ridiostation);
  var scaleFeature = new ol.Feature({
    geometry: new ol.geom.Circle(ol.proj.transform([104.11069, 30.6289], 'EPSG:4326', 'EPSG:3857'),60000),
    name: '范围图',
  });
 var scalestyle= new ol.style.Style({
    image: new ol.style.Circle({
        radius: 300,
        fill: new ol.style.Fill({
            color: 'rgba(100,149,237, 0.2)'
        }),
        stroke: new ol.style.Stroke({    //图形边界宽度与颜色
            color:'rgba(100,149,237, 1)',
            width: 4})
    })
})
scaleFeature.setStyle(scalestyle);
var source = new ol.source.Vector({
  features: [scaleFeature,iconFeature,],
  wrapX: false
});
var stationvector = new ol.layer.Vector({
source: source
});
  map.addLayer(stationvector);
  }
  function Plane(){
    var plane=new ol.style.Style({
      image: new ol.style.Icon({
          opacity: 0.6,
          src: "./pictures/飞机.png",
          scale: 0.20
      })
  })
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([103.91069, 30.2289]),
    name: '无人机',
    // population: 4000,
    // rainfall: 500
  });
  
  var source = new ol.source.Vector({
    features: [iconFeature],
    wrapX: false
});
var stationvector = new ol.layer.Vector({
  source: source
});
  iconFeature.setStyle(plane);
  map.addLayer(stationvector);
  }
  var map = createMap('map');
  //卫星图层的切换
  var satellitetag=true;
  Station();
  Plane();

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
