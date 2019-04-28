<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div v-if="loaded" class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card id="stat-card-1"
                                title="Total reach"
                                type="gradient-red"
                                v-bind:sub-title="reachTotal7Days.toString()"
                                icon="ni ni-world-2"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="reachDifference>0" class="text-success mr-2"><i  class="fa fa-arrow-up"></i>{{reachDifference}}</span>
                            <span v-if="reachDifference<0" class="text-danger mr-2"><i class="fa fa-arrow-down"></i>{{reachDifference}}</span>
                            <span v-if="reachDifference==0" class="text-info mr-2"></i>{{reachDifference}}</span>
                            <span class="text-nowrap">Since last week</span>
                            <b-tooltip target="stat-card-1" title="Total number of unique accounts that have seen this profile in the last 7 days"></b-tooltip>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card id="stat-card-2"
                                title="Total impressions"
                                type="gradient-orange"
                                v-bind:sub-title="impressionsTotal7Days.toString()"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                          <span v-if="impressionsDifference>0" class="text-success mr-2"><i  class="fa fa-arrow-up"></i>{{impressionsDifference}}</span>
                          <span v-if="impressionsDifference<0" class="text-danger mr-2"><i class="fa fa-arrow-down"></i>{{impressionsDifference}}</span>
                          <span v-if="impressionsDifference==0" class="text-info mr-2"></i>{{impressionsDifference}}</span>
                            <span class="text-nowrap">Since last week</span>
                            <b-tooltip target="stat-card-2" title="Total number of times the Business Account’s media objects have been viewed in the last 7 days"></b-tooltip>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total profile views"
                                id="stat-card-3"
                                type="gradient-green"
                                v-bind:sub-title="viewsTotal7Days.toString()"
                                icon="ni ni-glasses-2"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                          <span v-if="viewsDifference>0" class="text-success mr-2"><i  class="fa fa-arrow-up"></i>{{viewsDifference}}</span>
                          <span v-if="viewsDifference<0" class="text-danger mr-2"><i class="fa fa-arrow-down"></i>{{viewsDifference}}</span>
                          <span v-if="viewsDifference==0" class="text-info mr-2"></i>{{viewsDifference}}</span>
                            <span class="text-nowrap">Since last week</span>
                            <b-tooltip target="stat-card-3" title="Total number of users who have viewed the Business Account’s profile in the last 7 days"></b-tooltip>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="New followers"
                                id = "stat-card-4"
                                type="gradient-info"
                                v-bind:sub-title="newFollowersTotal7Days.toString()"
                                icon="ni ni-single-02"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                          <span v-if="newFollowersDifference>0" class="text-success mr-2"><i  class="fa fa-arrow-up"></i>{{newFollowersDifference}}</span>
                          <span v-if="newFollowersDifference<0" class="text-danger mr-2"><i class="fa fa-arrow-down"></i>{{newFollowersDifference}}</span>
                          <span v-if="newFollowersDifference==0" class="text-info mr-2"></i>{{newFollowersDifference}}</span>
                            <span class="text-nowrap">Since last week</span>
                            <base-button id="popover-reactive-1" type="info" size="sm" class="ml-4">
                                  FGR
                                  <b-popover
                                          target="popover-reactive-1"
                                          placement="auto"
                                          ref="popover"
                                        >
                                          <base-progress type="info" :height="8" :value="((totalNewFollowersLast30Days/(currentFollowers - totalNewFollowersLast30Days))*100).toFixed(2)" label="Follower Growth Rate"></base-progress>
                                      </b-popover>
                            </base-button>
                            <b-tooltip target="stat-card-4" title="Total number of unique accounts following this profile in the last 7 days"></b-tooltip>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Performance</h6>
                                <h5 class="h3 text-white mb-0">Reach Analytics</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">7 Days</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">30 Days</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                v-if="loaded"
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Demographics</h6>
                                <h5 class="h3 mb-0">Age/Gender Distribution</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: pieChart.activeIndex === 0}"
                                           @click.prevent="initPieChart(0)">
                                            <span class="d-none d-md-block">Age</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: pieChart.activeIndex === 1}"
                                           @click.prevent="initPieChart(1)">
                                            <span class="d-none d-md-block">Gender</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <doughnut-chart
                                v-if="loaded"
                                :height="350"
                                ref="pieChart"
                                :chart-data="pieChart.chartData"
                        >
                      </doughnut-chart>
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <!--`GeoChart`-->
            <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                  <g-chart v-if="loaded"
                      :chart-data="GeoChart.chartData"
                      :chart-options="GeoChart.chartOptions"
                  ></g-chart>
                </div>

                <div class="col-xl-4">
                      <card header-classes="bg-transparent">
                          <div slot="header" class="row align-items-center">
                              <div class="col">
                                  <h6 class="text-uppercase text-muted ls-1 mb-1">Location</h6>
                                  <h5 class="h3 mb-0">Top Towns/Cities</h5>
                              </div>
                          </div>
                          <bar-chart
                                  v-if="loaded"
                                  :height="350"
                                  ref="barChart"
                                  :chart-data="barChart.chartData"
                          >
                        </bar-chart>
                      </card>
                </div>

            </div>


            <!--End GeoChart-->
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import DoughnutChart from '@/components/Charts/DoughnutChart';
  import BarChart from '@/components/Charts/BarChart';
  import axios from 'axios';
  import GChart from './Dashboard/GeoChart';
  import BPopoverDirective from 'bootstrap-vue/es/directives/popover';
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip';
  import Vue from 'vue';
  import BootstrapVue from 'bootstrap-vue'
  Vue.use(BootstrapVue)

  export default {
    components: {
      LineChart,
      DoughnutChart,
      BarChart,
      GChart,
    },
    directives: {
      'v-b-popover': BPopoverDirective,
      'b-tooltip': BTooltipDirective,
    },
    data() {
      return {
      GeoChart: {
        chartData: [
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        }
      },
        loaded: false,
        bigLineChart: {
          allReachData: [],
          allImpressionsData: [],
          allViewsData: [],
          allFollowersData: [],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.lineChartOptionsBlue,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        },
        pieChart: {
          allData: [],
          allLabels: [],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          }
        },
        barChart: {
          chartData: {
            labels: [],
            datasets: [{
              data: []
            }]
          }
        },
        facebookToken: "EAALLZCjUDvuUBAMNutTwC9d94HGi9wcijdeCmHD8FZCby4lTlXFRvPY8IAd3n6AUODoxy2s1aE3GtZAUb3Rd0xz36hLdngsEzpPibvDU2af2Ij5NJAWZC7F5f5FXMA5ZBDcLOnMfmddogtZAfjK61SY3u1Asb9boMZD",
        instagramID: "17841404187319036",

        reachLast7Days: 0,
        impressionsLast7Days: 0,
        reachTotal7Days: 0,
        impressionsTotal7Days: 0,
        viewsTotal7Days: 0,
        newFollowersTotal7Days: 0,
        reachDifference: 0,
        impressionsDifference: 0,
        viewsDifference: 0,
        newFollowersDifference: 0,
        totalNewFollowersLast30Days: 0,
        currentFollowers: 0,
      };
    },
    created(){
    },
    methods: {
      fetchData(instaID, fbToken){
      var self = this
      return new Promise(function(resolve, reject){

        var currentDate = new Date()
        var sevenDaysAgo = new Date();
        var fourteenDaysAgo = new Date();
        var thirtyDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        fourteenDaysAgo.setDate(currentDate.getDate() - 14);
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        var currentDateUnix = Math.floor(currentDate / 1000);
        var sevenDaysAgoUnix = Math.floor(sevenDaysAgo / 1000);
        var fourteenDaysAgoUnix = Math.floor(fourteenDaysAgo / 1000);
        var thirtyDaysAgoUnix = Math.floor(thirtyDaysAgo/1000)

        //Get the reach, impressions, profile views and new followers from the last 7 days
        axios.get(`https://graph.facebook.com/v3.2/${instaID}/insights?metric=impressions,reach,profile_views,follower_count&period=day&since=${sevenDaysAgoUnix}&until=${currentDateUnix}&access_token=${fbToken}`)
        .then(response => {
          var impressions = response.data.data[0]
          var reach = response.data.data[1]
          var profile_views = response.data.data[2]
          var follower_count = response.data.data[3]

          var reachLast7Days = []
          var impressionsLast7Days = []
          var viewsLast7Days = []
          var followersLast7Days = []

          for (var i=0; i<impressions.values.length;i++){
            self.impressionsTotal7Days += impressions.values[i].value
            impressionsLast7Days.push(impressions.values[i].value)
          }
          for (var i=0; i<reach.values.length;i++){
            self.reachTotal7Days += reach.values[i].value
            reachLast7Days.push(reach.values[i].value)
          }
          for (var i=0; i<profile_views.values.length;i++){
            self.viewsTotal7Days += profile_views.values[i].value
            viewsLast7Days.push(profile_views.values[i].value)

          }
          for (var i=0; i<follower_count.values.length;i++){
            self.newFollowersTotal7Days += follower_count.values[i].value
            followersLast7Days.push(follower_count.values[i].value)
          }

          self.bigLineChart.allReachData.push(reachLast7Days)
          self.bigLineChart.allImpressionsData.push(impressionsLast7Days)
          self.bigLineChart.allViewsData.push(viewsLast7Days)
          self.bigLineChart.allFollowersData.push(followersLast7Days)

          console.log(self.bigLineChart.allReachData)

          //Get the reach, impressions, profile views and new followers from last week and the week before last
          axios.get(`https://graph.facebook.com/v3.2/${instaID}/insights?metric=impressions,reach,profile_views,follower_count&period=day&since=${fourteenDaysAgoUnix}&until=${sevenDaysAgoUnix}&access_token=${fbToken}`)
          .then(response => {
            var impressions = response.data.data[0]
            var reach = response.data.data[1]
            var profile_views = response.data.data[2]
            var follower_count = response.data.data[3]

            var totalImpressions = 0;
            var totalReach = 0;
            var totalProfileViews = 0;
            var totalNewFollowers = 0;

            for (var i=0; i<impressions.values.length;i++){
              totalImpressions += impressions.values[i].value
            }
            for (var i=0; i<reach.values.length;i++){
              totalReach += reach.values[i].value
            }
            for (var i=0; i<profile_views.values.length;i++){
              totalProfileViews += profile_views.values[i].value
            }
            for (var i=0; i<follower_count.values.length;i++){
              totalNewFollowers += follower_count.values[i].value
            }

            self.impressionsDifference = self.impressionsTotal7Days - totalImpressions
            self.reachDifference = self.reachTotal7Days - totalReach
            self.viewsDifference = self.viewsTotal7Days - totalProfileViews
            self.newFollowersDifference = self.newFollowersTotal7Days - totalNewFollowers

            //Get the reach, impressions, profile views and new followers from last 30 days
            axios.get(`https://graph.facebook.com/v3.2/${instaID}/insights?metric=impressions,reach,profile_views,follower_count&period=day&since=${thirtyDaysAgoUnix}&until=${currentDateUnix}&access_token=${fbToken}`)
            .then(response => {
              var impressions = response.data.data[0]
              var reach = response.data.data[1]
              var profile_views = response.data.data[2]
              var follower_count = response.data.data[3]

              var reachLast30Days = []
              var impressionsLast30Days = []
              var viewsLast30Days = []
              var followersLast30Days = []
              var totalNewFollowersLast30Days = 0

              for (var i=0; i<impressions.values.length;i++){
                impressionsLast30Days.push(impressions.values[i].value)
              }
              for (var i=0; i<reach.values.length;i++){
                reachLast30Days.push(reach.values[i].value)
              }
              for (var i=0; i<profile_views.values.length;i++){
                viewsLast30Days.push(profile_views.values[i].value)
              }
              for (var i=0; i<follower_count.values.length;i++){
                followersLast30Days.push(follower_count.values[i].value)
                totalNewFollowersLast30Days += follower_count.values[i].value
              }

              self.bigLineChart.allReachData.push(reachLast30Days)
              self.bigLineChart.allImpressionsData.push(impressionsLast30Days)
              self.bigLineChart.allViewsData.push(viewsLast30Days)
              self.bigLineChart.allFollowersData.push(followersLast30Days)
              self.totalNewFollowersLast30Days = totalNewFollowersLast30Days

              //Get the the age and audience distributions
              axios.get(`https://graph.facebook.com/v3.2/${instaID}/insights?metric=audience_gender_age&period=lifetime&access_token=${fbToken}`)
              .then(response => {
                console.log(response)
                var sample = response.data.data[0].values[0].value
                var male_sum = 0;
                var female_sum = 0;
                var undefined_sum = 0;
                var _13to17 = 0;
                var _18to24 = 0;
                var _25to34 = 0;
                var _35to44 = 0;
                var _45to54 = 0;
                var _55to64 = 0;
                var _65to74 = 0;
                var _75to84 = 0;
                var _85to94 = 0;

                for (var key in sample) {
                  if (key[0] == "F")
                    	female_sum += sample[key];
                  else if (key[0] == "M")
                    	male_sum += sample[key];
                  else if (key[0] == "U")
                    	undefined_sum += sample[key];

                  switch(key.slice(2)){
                   		case "13-17":
                        _13to17 += sample[key];
                        break;

                   		case "18-24":
                      	_18to24 += sample[key];
                        break;

                   		case "25-34":
                      	_25to34 += sample[key];
                        break;

                   		case "35-44":
                      	_35to44 += sample[key];
                        break;

                   		case "45-54":
                      	_45to54 += sample[key];
                        break;

                   		case "55-64":
                      	_55to64 += sample[key];
                        break;

                   		case "65-74":
                      	_65to74 += sample[key];
                        break;

                   		case "75-84":
                      	_75to84 += sample[key];
                        break;

                   		case "85-94":
                      	_85to94 += sample[key];
                        break;
                   }

                }

                var gender_data = [male_sum, female_sum, undefined_sum]
                var gender_labels = ["Male", "Female", "Undefined"]
                var gender_data_final = []
                var gender_labels_final = []

                for (var i=0; i<gender_data.length; i++){
                  if (gender_data[i] != 0) {
                    gender_data_final.push(gender_data[i])
                    gender_labels_final.push(gender_labels[i])
                  }
                }

                var age_data = [_13to17, _18to24, _25to34, _35to44, _45to54, _55to64, _65to74, _75to84, _85to94]
                var age_labels = ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75-84", "85-94"]

                var age_data_final = []
                var age_labels_final = []

                for (var i=0; i<age_data.length; i++){
                	if (age_data[i] != 0) {
                  	age_data_final.push(age_data[i])
                    age_labels_final.push(age_labels[i])
                  }
                }

                self.pieChart.allData.push(age_data_final)
                self.pieChart.allData.push(gender_data_final)
                self.pieChart.allLabels.push(age_labels_final)
                self.pieChart.allLabels.push(gender_labels_final)


                //Get the the country data
                axios.get(`https://graph.facebook.com/v3.2/${instaID}/insights?metric=audience_country&period=lifetime&access_token=${fbToken}`)
                .then(response => {
                  var sample = response.data.data[0].values[0].value

                  var headings = ['Country', 'Popularity'];
                  self.GeoChart.chartData.push(headings)

                  for (var key in sample){    //['UK', 20]
                    var data = [key, sample[key]]
                    self.GeoChart.chartData.push(data)
                  }

                  //Get the the city/town data
                  axios.get(`https://graph.facebook.com/v3.2/${instaID}/insights?metric=audience_city&period=lifetime&access_token=${fbToken}`)
                  .then(response => {
                    var sample = response.data.data[0].values[0].value

                    var props = Object.keys(sample).map(function(key) {
                    return { key: key, value: this[key] };
                    }, sample);

                    props.sort(function(p1, p2) { return p2.value - p1.value; });
                    var top5 = props.slice(0, 5);

                    var labels = []
                    var data = []
                    for (var i = 0; i < top5.length; i++){
                      self.barChart.chartData.labels.push(top5[i].key)
                      self.barChart.chartData.datasets[0].data.push(top5[i].value)
                    }


                    //Get the current number of followers
                    axios.get(`https://graph.facebook.com/v3.2/${instaID}?fields=followers_count&access_token=${fbToken}`)
                    .then(response => {
                      console.log(response)
                      self.currentFollowers = response.data.followers_count

                    resolve()

                  }).catch(error => {
                      console.log(error);
                  })

                }).catch(error => {
                    console.log(error);
                })

              }).catch(error => {
                  console.log(error);
              })

            }).catch(error => {
                console.log(error);
            })

          }).catch(error => {
              console.log(error);
          })
        }).catch(error => {
            console.log(error);
        })

      }).catch(error => {
          console.log(error);
      })



  });

    },
      initBigChart(index) {
      var x_labels = [];

        if (index == 0) {
          var days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
          var goBackDays = 7
          var today = new Date();

          for(var i = 0; i < goBackDays; i++) {
              var newDate = new Date(today.setDate(today.getDate() - 1));
              x_labels.unshift(days[newDate.getDay()]);
          }
      }

      if (index == 1){
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var goBackDays = 30;
        var today = new Date();

        for(var i = 0; i < goBackDays; i++)
        {
            var newDate = new Date(today.setDate(today.getDate() - 1));
            x_labels.unshift(newDate.getDate().toString() + " " + months[newDate.getMonth()].toString());
        }

      }

      if (index == 2) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var goBackMonths = 12;

        var today = new Date();

        for(var i = 0; i < goBackMonths; i++)
        {
            var newDate = new Date(today.setDate(today.getDate() - 31));
            x_labels.unshift(months[newDate.getMonth()]);
        }
      }

        let chartData = {
          datasets: [
            {
              label: 'Reach',
              data: this.bigLineChart.allReachData[index],
              borderColor: '#e46646',
            },
            {
              label: 'Impressions',
              data: this.bigLineChart.allImpressionsData[index],
              borderColor: '#f1ac56'

            },
            {
              label: 'Views',
              data: this.bigLineChart.allViewsData[index],
              borderColor: '#64cbc7'

            },
            {
              label: 'New Followers',
              data: this.bigLineChart.allFollowersData[index],
              borderColor: '#367ee8'

            },
          ],
          labels: x_labels,
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      initPieChart(index){

        let chartData = {
          datasets: [
            {
              label: 'Test',
              data: this.pieChart.allData[index],
              backgroundColor: [
                '#e46646',
                '#f1ac56',
                '#64cbc7',
                '#367ee8',
                '#8b64cb',
                '#cb647c',
                '#cacb64',
                '#84cb64',
                '#cb64b9'

              ]
            }
          ],
          labels: this.pieChart.allLabels[index]
        };
        this.pieChart.chartData = chartData;
        this.pieChart.activeIndex = index;

      }
    },
    async mounted() {
      this.loaded = false;
      await this.fetchData(this.instagramID, this.facebookToken);
      this.initBigChart(0);
      this.initPieChart(0);
      this.loaded = true;
    }
  };
</script>
<style></style>
