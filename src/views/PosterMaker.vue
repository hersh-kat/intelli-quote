<template>
    <div>

      <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">

      </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">

                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                          <h2>Instructions</h2>
                        </div>
                        <div class="card-body pt-0 pt-md-4">

                            <div class="text-left">
                              <ol>
                                <li>Choose the event poster you want to create and fill in all the boxes</li>
                                <li>Click on the 'Make Poster' button - this will open up the created poster in Photopea (a web version of Photoshop).</li>
                                <li>Wait for the poster to load</li>
                                <li>Once loaded, go to File->Export As->JPG</li>
                                <li>Type '100%' in the quality box</li>
                                <li>Click save</li>
                              </ol>
                              <p>If you want to edit the poster once made or do this whole process manually, check out <a href="https://drive.google.com/file/d/14ZiwEXBzREEnRIp1HTcnE8uH_bm5sXTR/view" target="_blank">this guide</a>.</p>
                              <p>If you want information on printing this poster as flyers then click <a href="https://drive.google.com/file/d/1K1YXiCMcjmTGrMPhslhPebClkNgZ37C_/view" target="_blank">here</a>.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Poster Maker</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">Event Topic</h6>
                                <div class="pl-lg-4">

                                  <b-form-select v-model="model.myEvent" class="mb-3">
                                      <option :value="null" hidden disabled>Please select an event</option>
                                      <optgroup label="Term 1 Events">
                                        <option value="24hours">24 Hours to Live</option>
                                        <option value="Google">Have you ever Googled happiness?</option>
                                        <option value="underTheSkin">Under The Skin - Who am I?</option>
                                        <option value="insideTheMind">Inside the Mind</option>
                                        <option value="Habits">Habits - These are what you're missing</option>
                                        <option value="Karma">Karma - I saw that</option>
                                      </optgroup>
                                      <optgroup label="Term 2 Events">
                                        <option value="LearnAnythingFast">How to Learn Anything Fast</option>
                                        <option value="FakeNews">Fake News - This is why I have trust issues</option>
                                        <option value="Procrastination">Procrastination - Just Do It Later</option>
                                        <option value="ThankUNext">Thank U, Next</option>
                                        <option value="7Secrets">7 Secrets to Happiness</option>
                                      </optgroup>
                                      <optgroup label="Misc Events">
                                        <option value="Meditation">Meditation 101</option>
                                        <option value="Diwali">Filling the Void Within (Diwali Special)</option>
                                        <option value="GodDebate">The God Debate</option>
                                        <option value="SacredActivist">The Sacred Activist</option>
                                      </optgroup>
                                    </b-form-select>
                                </div>
                                <hr class="my-4" />
                                <!-- Social Media Input -->
                                <h6 class="heading-small text-muted mb-4">Social Media</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <base-input alternative=""
                                                        label="Facebook Tag"
                                                        placeholder="@kcsoc"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.fbTag"
                                            />
                                        </div>
                                        <div class="col-md-6">
                                            <base-input alternative=""
                                                        label="Instagram Tag"
                                                        placeholder="@kcsoc"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.instaTag"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <h6 class="heading-small text-muted mb-4">Event Details</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-6">
                                          <label class="form-control-label">
                                                      Event Date & Time
                                                      <!----></label>
                                          <base-input addon-left-icon="ni ni-calendar-grid-58">
                                              <flat-picker slot-scope="{focus, blur}"
                                                           @on-open="focus"
                                                           @on-close="blur"
                                                           :config="{allowInput: true}"
                                                           class="form-control datepicker"
                                                           v-model="model.datepicker">
                                              </flat-picker>
                                          </base-input>

                                        </div>
                                        <div class="col-md-6">
                                          <time-picker v-model="model.timepicker" :controls="true"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <base-input alternative=""
                                                        label="Building Name (Location Line 1)"
                                                        placeholder=""
                                                        input-classes="form-control-alternative"
                                                        v-model="model.location1"
                                            />
                                        </div>
                                        <div class="col-md-6">
                                            <base-input alternative=""
                                                        label="Room Number (Location Line 2)"
                                                        placeholder=""
                                                        input-classes="form-control-alternative"
                                                        v-model="model.location2"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </form>
                            <base-button size="lg" type="info" @click="linkBuilder" class="mr-4">Make Poster</base-button>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import BFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {TimePicker} from 'uiv'
import $ from "jquery"
import moment from "moment"

Vue.use(BootstrapVue)

  export default {
    components: {
      'b-form-select': BFormSelect,
      'flat-picker': flatPicker,
      'time-picker': TimePicker
    },
    name: 'user-profile',
    data() {
      return {
        model: {
          myEvent: '',
          fbTag: '',
          instaTag: '',
          datepicker: '',
          timepicker: new Date(),
          location1: '',
          location2: '',
        },
      }
    },
    methods: {
      linkBuilder(){

        console.log(this.model.datepicker)
        var date_formatted = moment(this.model.datepicker,'YYYY-MM-DD').format("ddd Do MMM")
        console.log(date_formatted)
        var time_hours = this.model.timepicker.getHours()
        var time_mins = this.model.timepicker.getMinutes()
        var time_formatted = moment(time_hours + ":" + time_mins,"H:m").format("h:mm A")

        //dateFormat(this.model.datepicker, "ddd dS mmm");
        //var time_formatted = dateFormat(this.model.timepicker, "h:MM TT");
        var dropboxlink = ""

        if (this.model.myEvent == "24hours") {
             dropboxlink = "https://dl.dropboxusercontent.com/s/5qozk2clzg55vqy/24Hours.psd?dl=0";
        }
        else if (this.model.myEvent == "Google"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/o3j4yg004behdlm/Google.psd?dl=0";
        }
        else if (this.model.myEvent == "underTheSkin"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/6ntprcmm1r0vo5g/UnderTheSkin.psd?dl=0";
        }
        else if (this.model.myEvent == "insideTheMind"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/0no7qqbp1c03rmb/Inside%20The%20Mind%202.psd?dl=0";
        }
        else if (this.model.myEvent == "Karma"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/2r1yefn4tlv2bvp/Karma.psd?dl=0";
        }
        else if (this.model.myEvent == "Habits"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/e77kq3kzwbuivj9/Habits.psd?dl=0";
        }
        else if (this.model.myEvent == "Meditation"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/7czwwekzk1p5aa4/Meditation.psd?dl=0";
        }
        else if (this.model.myEvent == "Diwali"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/mj9y3ksronkspya/Diwali.psd?dl=0";
        }
        else if (this.model.myEvent == "LearnAnythingFast"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/akl6sij4a912s8p/How%20to%20learn%20anything%20fast.psd?dl=0";
        }
        else if(this.model.myEvent == "FakeNews"){
            dropboxlink = "https://dl.dropboxusercontent.com/s/mt6kmd9bu47kzkx/Fake%20News.psd?dl=0";
      }
        else if(this.model.myEvent == "Procrastination"){
            dropboxlink = "https://dl.dropboxusercontent.com/s/z4li0wrf2gv35dz/Procrastination.psd?dl=0";
      }
        else if(this.model.myEvent == "ThankUNext"){
            dropboxlink = "https://dl.dropboxusercontent.com/s/df87923enriinrg/ThankYouNext.psd?dl=0";
      }
        else if(this.model.myEvent == "7Secrets"){
            dropboxlink = "https://dl.dropboxusercontent.com/s/01fxavwvhyh88yt/7SecretsToHappiness.psd?dl=0";
      }
      else if(this.model.myEvent == "GodDebate"){
          dropboxlink = "https://dl.dropboxusercontent.com/s/rcw4al3i3g36vgf/GodDebate.psd?dl=0";
      }
      else if(this.model.myEvent == "SacredActivist"){
        dropboxlink = "https://dl.dropboxusercontent.com/s/7otpg79pecnax96/SacredActivist.psd?dl=0";
      }

      var link = "https://www.photopea.com#%7B%22files%22:%5B%22" + dropboxlink + "%22%5D";
      var script = ",%22environment%22:%7B%7D,%22script%22:%22activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('@kcsoc%20FB%20Tag');%20activeDocument.activeLayer.textItem.contents%20=%20'" + this.model.fbTag + "';";
      var script2 = "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('@kcsoc%20Insta%20Tag');%20activeDocument.activeLayer.textItem.contents%20=%20'" + this.model.instaTag + "';";
      var script3 = "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('Date');%20activeDocument.activeLayer.textItem.contents%20=%20'" + date_formatted + "';";
      var script4 = "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('Time');%20activeDocument.activeLayer.textItem.contents%20=%20'" + time_formatted + " start';";
      var script5 = "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('LocationLine1');%20activeDocument.activeLayer.textItem.contents%20=%20'" + this.model.location1 + "';";
      var script6 = "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('LocationLine2');%20activeDocument.activeLayer.textItem.contents%20=%20'" + this.model.location2 + "';";
      var script7 = "%22%7D";
      var finalLink = link + script + script2 + script3 + script4 + script5 + script6 + script7;
      finalLink = finalLink.trim();
      window.open(finalLink);

      }
    },
  };
</script>
<style></style>
