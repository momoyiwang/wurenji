$(document).ready(function echart() {
    // 基于准备好的dom，初始化echarts实例
    var myCharts= echarts.init(document.getElementById('gauge'));
    $(window).resize(function(){
        myCharts.resize();
    });
option = {
    toolbox: {
        feature: {
        }
    },
    series: [
        {
            name: '俯仰角',
            type: 'gauge',
            radius: '130%',
            startAngle: 180, //开始角度 左侧角度
            endAngle: 90, //结束角度 右侧
            min: -30,
            max: 90,
            splitNumber: 5, //分割段数
            center : ['70%', '70%'],    // 默认全局居中
            // radius:200,
            axisLine: {            // 仪表盘轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 7,
                    lineStyle: {       // 属性lineStyle控制线条样式  
                        color: '#63869e', 
                               } 
                }
            },
            splitLine: {           // 分隔线
                length: 10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#63869e',
                    width:5,
                }
            },
        
            axisTick:{      //刻度
                splitNumber: 5, //分割线之间刻度数
                length:3,
                lineStyle:{
                    color:'blue'
                }


            },
            pointer:{
                width:4,
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
            },


            detail: {
              textStyle: {
                fontSize: 15,
                color: 'black'
            },
            offsetCenter:[0,'7%']
            },
              
            data: [{value: 30, name: '俯仰角'}]
        }
    ]
};

myCharts.setOption(option)    //为echarts对象加载数据
})