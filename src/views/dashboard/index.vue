<template>
  <div class="dashboard-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据看板</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-row :gutter="20" class="topRow">
        <el-col :span="6" class="leftCol">
          <el-card class="box-card" body-style="width:100%;">
            <div class="left">
              <h4 class="tit">活跃用户</h4>
              <div class="data">802</div>
              <div class="trend">
                <div class="trendData">
                  <i class="el-icon-top up">5.23%</i>
                  &nbsp;
                  <div class="time">最近一个月</div>
                </div>
              </div>
            </div>
            <i class="el-icon-user right"></i>
          </el-card>
          <el-card class="box-card" body-style="width:100%;">
            <div class="left">
              <h4 class="tit">平均访问量</h4>
              <div class="data">1298</div>
              <div class="trend">
                <div class="trendData">
                  <i class="el-icon-bottom down">8.56%</i>
                  &nbsp;
                  <div class="time">截至最后一周</div>
                </div>
              </div>
            </div>
            <i class="el-icon-tickets right"></i>
          </el-card>
          <el-card class="box-card" body-style="width:100%;">
            <div class="leftTip">Enhance your Campaign for better outreach →</div>
            <img class="rightImg" src="@/assets/img.svg" alt="" />
          </el-card>
        </el-col>
        <el-col :span="18" class="echartCol">
          <el-card class="box-card echartCard" body-style="height:100%;">
            <div id="main" style="height: 100%"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bottomRow">
        <el-col :span="8" class="leftCol">
          <el-card class="box-card" body-style="width:100%;height:100%;">
            <div id="genderPie" style="height: 100%"></div>
          </el-card>
        </el-col>
        <el-col :span="8" class="leftCol">
          <el-card class="box-card" body-style="width:100%;height:100%;">
            <div id="viewsRadar" style="height: 100%"></div>
          </el-card>
        </el-col>
        <el-col :span="8" class="leftCol">
          <el-card class="box-card" body-style="width:100%;height:100%;">
            <div id="osPie" style="height: 100%"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'DashBoard',
  mounted() {
    this.drawBar()
    this.drawGenderPie()
    this.drawRadar()
    this.drawOsPie()
  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '职业方向热度'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['体育', '医疗', '科技', '电商', '土木', '金融']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    drawGenderPie() {
      var myChart = echarts.init(document.getElementById('genderPie'))
      var option = {
        title: {
          text: '性别分布情况',
          left: '0'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 484, name: '男' },
              { value: 300, name: '女' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    drawRadar() {
      var myChart = echarts.init(document.getElementById('viewsRadar'))
      var option = {
        title: {
          text: '浏览访问情况'
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {
              name: 'Chrome',
              max: 100,
              axisLabel: {
                show: true,
                formatter: '{value}%',
                color: '#ccc'
              }
            },
            { name: 'Explorer', max: 100 },
            { name: 'Edge', max: 100 },
            { name: 'Oprear', max: 100 },
            { name: 'Safari', max: 100 },
            { name: 'FireFox', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            symbol: 'roundRect', //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: [15, 13], //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            data: [
              {
                value: [80, 20, 60, 40, 30, 50],
                name: 'Allocated Budget',
                areaStyle: {
                  color: 'skyblue'
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    drawOsPie() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('osPie'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '设备系统访问情况'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '0'
        },
        series: [
          {
            name: '设备系统访问情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Iphone' },
              { value: 735, name: 'Android' },
              { value: 580, name: 'Harmony OS' },
              { value: 484, name: 'Mac' },
              { value: 300, name: 'Windows' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  height: 100%;
  .el-breadcrumb {
    margin-bottom: 20px;
  }
  .main {
    .topRow {
      display: flex;
      .leftCol {
        display: flex;
        flex-direction: column;
        .el-card {
          margin-bottom: 20px;
          flex: 1;
          ::v-deep .el-card__body {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .left {
              width: 160px;
              .tit {
                margin: 5px 0;
              }
              .data {
                font-weight: 700;
                font-size: 35px;
                color: #ccc;
              }
              .trend {
                .trendData {
                  display: flex;
                  align-items: center;
                  .up {
                    color: #2fd6a6;
                  }
                  .down {
                    color: red;
                  }
                  .time {
                    color: gray;
                    font-size: 14px;
                  }
                }
              }
            }

            .right {
              font-size: 40px;
              color: gray;
            }
            .leftTip {
              font-size: 20px;
              color: gray;
            }
            .rightImg {
              width: 40%;
            }
          }
        }
      }
      .echartCol {
        padding-bottom: 20px;
        flex: 1;
        .echartCard {
          height: 100%;
          ::v-deep .el-card__body {
            box-sizing: border-box;
          }
        }
      }
    }
    .bottomRow {
      height: 400px;
      display: flex;
      .el-col {
        .el-card {
          height: 100%;
          ::v-deep .el-card__body {
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
