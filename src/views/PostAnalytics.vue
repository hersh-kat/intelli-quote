<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">

        </base-header>

        <insta-feed token="4152291577.9fede48.f98f5827ced349bf9ac780e2e272c34c" :count="6" class="row">
        <template slot="feeds" slot-scope="props">
          <div class="col-4">
            <card header-classes="bg-transparent">
                <div slot="header" class="row align-items-center">
                  <div class="media align-items-center">
                    <a href="#" class="avatar rounded-circle mr-3">
                      <img alt="Image placeholder" :src="props.feed.user.profile_picture">
                    </a>
                    <div class="media-body">
                      <h6 class="text-uppercase text-muted ls-1 mb-1"">@{{props.feed.user.username}}</h6>
                      <h5 class="h3 mb-0" style="font-size:16px;">{{props.feed.user.full_name}}</h5>
                    </div>
                  </div>
                </div>

                <div class="content" style="height: 320px; overflow: auto;">
                <img :src="props.feed.images.low_resolution.url" alt="Image">
               </div>

                <div class="content" style="height: 150px; overflow: auto;">
                  {{ props.feed.caption.text }}
                </div>

                <div class="card-footer text-muted">
                <div class="card-profile-stats d-flex justify-content-center mt-md-1">
                    <div>
                        <span class="heading">{{ props.feed.likes.count }}</span>
                        <span class="description">Likes</span>
                    </div>
                    <div>
                        <span class="heading">{{ props.feed.comments.count }}</span>
                        <span class="description">Comments</span>
                    </div>
                    <div>
                        <span class="heading">-</span>
                        <span class="description">Link</span>
                    </div>
                </div>

                <div class="col text-center">
                  <a href="#!" class="btn btn-xl btn-primary"
                                @click.prevent="showModal(props.index)"
                                >Analytics</a>

                </div>

              </div>

            </card>
          </div>
      </template>
    </insta-feed>

<div>
  <!-- Modal Component -->
  <b-modal ref="my-modal" size='lg' ok-only title="Post Analytics">
        <div class="row">

          <div class="col-6">
          <stats-card id="stat-card-1" title="Reach"
                      type="gradient-red"
                      v-bind:sub-title="allReachData[index]"
                      icon="ni ni-world-2"
                      class="mb-xl-4"
          >
          </stats-card>
          <b-tooltip target="stat-card-1" title="Total number of unique accounts that have seen the media object"></b-tooltip>
          </div>

          <div class="col-6">
          <stats-card id="stat-card-2" title="Impressions"
                      type="gradient-orange"
                      v-bind:sub-title="allImpressionsData[index]"
                      icon="ni ni-chart-bar-32"
                      class="mb-xl-4"
          >
          </stats-card>
          <b-tooltip target="stat-card-2" title="Total number of times the media object has been seen"></b-tooltip>
        </div>

          <div class="col-6">
          <stats-card id="stat-card-3" title="Engagement"
                      type="gradient-green"
                      v-bind:sub-title="allEngagementData[index]"
                      icon="ni ni-active-40"
                      class="mb-4 mb-xl-0"
          >
          </stats-card>
          <b-tooltip target="stat-card-3" title="Total number of likes and comments on the media object"></b-tooltip>

        </div>

          <div class="col-6">
          <stats-card id="stat-card-4" title="Saved"
                      type="gradient-info"
                      v-bind:sub-title="allSavedData[index]"
                      icon="ni ni-book-bookmark"
                      class="mb-4 mb-xl-0"
          >
          </stats-card>
          <b-tooltip target="stat-card-4" title="Total number of unique accounts that have saved the media object"></b-tooltip>
        </div>
    </div>

    <div class="row">
      <div class="col-6">
      <base-progress type="success" :height="8" :value="parseFloat(((allCombinedLikesComments[index]/currentFollowers)*100).toFixed(2))" label="Engagement Rate"></base-progress>
    </div>
      <div class="col-6">
      <base-progress type="danger" :height="8" :value="parseFloat(((allReachData[index]/currentFollowers)*100).toFixed(2))" label="Reach Rate"></base-progress>
    </div>
    </div>


  </b-modal>
</div>

    </div>
</template>
<script>
import InstaFeed from '@/components/InstaFeed';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue'
import BModalDirective from 'bootstrap-vue/es/directives/modal'
import Vue from 'vue'

Vue.use(BootstrapVue)
  export default {
    directives: {
      'b-modal': BModalDirective
    },
    components: {
      InstaFeed
    },
    data() {
      return {
        facebookToken: "EAALLZCjUDvuUBAMNutTwC9d94HGi9wcijdeCmHD8FZCby4lTlXFRvPY8IAd3n6AUODoxy2s1aE3GtZAUb3Rd0xz36hLdngsEzpPibvDU2af2Ij5NJAWZC7F5f5FXMA5ZBDcLOnMfmddogtZAfjK61SY3u1Asb9boMZD",
        instagramID: "17841404187319036",
        mediaObjects: [],
        allImpressionsData: [],
        allEngagementData: [],
        allReachData: [],
        allSavedData: [],
        allReachRates: [],
        currentFollowers: 0,
        allCombinedLikesComments: [],
        index: null,
    }
  },
  methods: {
    fetchData(instaID, fbToken){
      var self = this
      return new Promise(function(resolve, reject){

      //Get the last 6 media ID's
      axios.get(`https://graph.facebook.com/v3.2/${instaID}/media?limit=6&access_token=${fbToken}`)
        .then(response => {

          var sample = response.data.data

          for (var i = 0; i < sample.length; i++){
            self.mediaObjects.push(sample[i].id) //Push each media ID into an array
          }

          //Get the insights on the 6 media ID's
          for (var i = 0; i < self.mediaObjects.length; i++){

          axios.get(`https://graph.facebook.com/v3.2/${self.mediaObjects[i]}/insights?metric=impressions,engagement,reach,saved&access_token=${fbToken}`)
            .then(response => {

              var sample = response.data.data

              self.allImpressionsData.push(sample[0].values[0].value.toString())
              self.allEngagementData.push(sample[1].values[0].value.toString())
              self.allReachData.push(sample[2].values[0].value.toString())
              self.allSavedData.push(sample[3].values[0].value.toString())

            }).catch(error => {
                console.log(error);
            })

          }

          //Get likes, comments, current followers
          axios.get(`https://graph.facebook.com/v3.2/${instaID}?fields=business_discovery.username(kcsocnational){followers_count,media_count,media{comments_count,like_count}}&access_token=${fbToken}`)
            .then(response => {
              console.log(response)
              var sample = response.data.business_discovery
              var currentFollowers = sample.followers_count
              self.currentFollowers = currentFollowers

              for (var i = 0; i < 6; i++){
                var post_metrics = sample.media.data[i]
                var combined_likes_comments = post_metrics.comments_count + post_metrics.like_count
                self.allCombinedLikesComments.push(combined_likes_comments)
              }

              resolve()

            }).catch(error => {
                console.log(error);
            })

        }).catch(error => {
            console.log(error);
        })

    });
    },
  showModal(index) {
    this.index = index
    this.$refs['my-modal'].show()

  },
  closeModal(){
    this.$refs['my-modal'].hide()
  }
},
async mounted() {
  //this.loaded = false;
  await this.fetchData(this.instagramID, this.facebookToken);
  //this.initBigChart(0);
  //this.initPieChart(0);
  //this.loaded = true;
}
}
</script>
<style>
</style>
