<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">

        </base-header>
        <div class="container-fluid mt--7">

          <div class="col-xl-12 order-xl-1">
              <card shadow type="secondary">
                  <div slot="header" class="bg-white border-0">
                      <div class="row align-items-center">
                          <div class="col-8">
                              <h3 class="mb-0">Graphic Maker</h3>
                          </div>
                      </div>
                  </div>
                  <template>
                      <form @submit.prevent>
                          <h6 class="heading-small text-muted mb-4">Choose Image</h6>
                          <div class="row">
                          <div class="col-md-6">
                            <div>
                              <b-button id="cameraButton" variant="info" @click="showModal" @hide="stopCamera">Camera</b-button>

                              <b-modal ref="mymodal" hide-footer title="Upload from camera">
                                <div class="d-block text-center">
                                  <video id="video" width="100%" height="50%"></video>
                                  <canvas id="canvas" style="display: none;"></canvas>
                                </div>
                                <b-button class="mt-3" variant="outline-danger" block @click="updateCanvasFromCamera">Capture</b-button>
                              </b-modal>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="btn btn-info">
                              Browse
                          <input type="file" style="display: none;" id="imageLoader" accept="image/*" @change="updateCanvasFromFile"/>
                        </label>

                        </div>
                        <div id="imagecanvasdiv" style="height: 300px; overflow: auto;">
                          <canvas id="imageCanvas">
                          </canvas>
                        </div>
                      </div>

                          <hr class="my-4" />
                          <!-- Social Media Input -->
                          <h6 class="heading-small text-muted mb-4">Quote Category</h6>
                          <div class="pl-lg-4">
                              <div class="row">
                                  <div class="col-md-6">
                                    <b-button :pressed="bookButton" id="book-button" @click="toggleBookState" variant="success"><span class="ni ni-books"></span>  Vedic</b-button>
                                    <b-tooltip placement="right" target="book-button" title="Select this if you want to to retrieve quotes from Ancient Indian literature (The Bhagavad Gita & Srimad Bhagavatam)"></b-tooltip>

                                  </div>
                                  <div class="col-md-6">
                                    <b-button :pressed="peopleButton" id="people-button" @click="togglePeopleState" variant="success" ><span class="ni ni-single-02"></span>  Yogi</b-button>
                                      <b-tooltip placement="right" target="people-button" title="Select this if you want to retrieve quotes from famous ISKCON teachers and leaders"></b-tooltip>
                                    <p v-if="peopleButton==true">Identify person?</p>
                                    <base-switch flat id="identify-switch" v-if="peopleButton==true"
                                          v-model="detectWebEntities"
                                        ></base-switch>
                                        <b-tooltip placement="right" target="identify-switch" title="Enable this if you have uploaded a picture of a famous ISKCON teacher, to find quotes by them"></b-tooltip>

                                  </div>
                              </div>
                          </div>
                          <hr class="my-4" />
                          <!-- Description -->
                          <h6 class="heading-small text-muted mb-4">Create & Edit Grahpic</h6>
                          <b-button class="mt-3" variant="outline-danger" block @click="main">Generate Image</b-button>

                          <div v-if="isRendered==true" class="row align-items-center">
                            <div class="col-md-4">
                          <base-dropdown>
                          <base-button slot="title" type="secondary" class="dropdown-toggle">
                            Text Design Style
                          </base-button>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(0)">Light Blocks</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(1)">Equal Width</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(2)">Celebrate</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(3)">Sunshine</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(4)">Badge</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(5)">Condensed Blocks</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(6)">Celebrate Simple</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(7)">Equal Width Fat</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(8)">Watercolour</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(9)">Particles</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(10)">Speech Bubble</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(11)">Comic</a>
                          <a class="dropdown-item" @click.prevent="photoEditorNewTextDesign(12)">Multiline</a>
                        </base-dropdown>
                      </div>


                      <div class="col-md-4">
                        <base-dropdown>
                        <base-button slot="title" type="secondary" class="dropdown-toggle">
                          Quote Text
                        </base-button>
                        <div class="content" style="height: 320px; overflow: auto;">
                        <a class="dropdown-item" v-for="(item,index) in quotes" @click.prevent="photoEditorNewQuote(index)">{{item.split(' ').slice(0,12).join(' ') + "..."}}</a>
                      </div>
                      </base-dropdown>
                    </div>

                    <div class="col-md-4">
                      <base-button type="secondary" @click="showColourModal">
                        Text Design Colour
                      </base-button>
                    </div>
                  </div>

                  <b-modal ref="colour-modal" hide-footer title="Text Design Colour">
                      <chrome-picker v-model="colors" />
                      <b-button class="mt-4" variant="outline-danger" @click="photoEditorNewColour(colors)">Set Colour</b-button>
                  </b-modal>


                        <div
                          ref="container"
                          style="width: 100vw; height: 100vh;"
                        />


                      </form>
                  </template>
              </card>
          </div>

            </div>
        </div>
</template>
<script>
  import $ from "jquery";
  import Vue from 'vue';
  import VueClipboard from 'vue-clipboard2';
  import '../photoeditorsdk/css/PhotoEditorSDK.UI.DesktopUI.min.css';
  import '../photoeditorsdk/css/PhotoEditorSDK.UI.ReactUI.min.css';
  import BModalDirective from 'bootstrap-vue/es/directives/modal';
  import PhotoEditorDesktopUI from 'photoeditorsdk/desktop-ui';
  import PhotoEditorSDK from 'photoeditorsdk';
  import PesdkLicense from '../photoeditorsdk/html5_license.json';
  import {Chrome} from 'vue-color';
  import axios from 'axios'

  Vue.use(VueClipboard)
  import BootstrapVue from 'bootstrap-vue'
  Vue.use(BootstrapVue)

  export default {
    directives: {
      'b-modal': BModalDirective
    },
    components: {
      'chrome-picker': Chrome
    },
    ui: 'desktop',
    customOptions: {
        title: "Hello!!!",
      },
      customEditorOptions: {
        export: {
          showButton: true
        },
        controlsOptions: {
          focus: {
            availableModes: ['radial', 'mirrored', 'linear', 'gaussian']
          }
        }
      },
    data() {
      return {
        bookButton: true,
        peopleButton: false,
        detectWebEntities: false,
        isRendered: false,
        stream: null,
        apiKey: /*** REMOVED: Google Cloud Vision API Key ***/
        license: JSON.stringify(PesdkLicense),
        data: {               //type vision api Request
            "requests": [{
                "features": [{
                    "type": null,
                    "maxResults": 10
                }],
                "image": {
                    "content": null
                }
            }]
        },
        quotes: [],
        references: [],
        quotesIndex: 0,
        textDesigns: [
          "imgly_text_design_blocks_light",
          "imgly_text_design_equal_width",
          "imgly_text_design_masked",
          "imgly_text_design_celebrate",
          "imgly_text_design_sunshine",
          "imgly_text_design_masked_badge",
          "imgly_text_design_blocks_condensed",
          "imgly_text_design_celebrate_simple",
          "imgly_text_design_equal_width_fat",
          "imgly_text_design_watercolor",
          "imgly_text_design_particles",
          "imgly_text_design_masked_speech_bubble",
          "imgly_text_design_masked_speech_bubble_comic",
          "imgly_text_design_multiline"
        ],
        textDesignsIndex: 0,
        base64: null,
        editor: null,
        colors: { r: 255, g: 255, b: 255, a:1 }

      }
    },
    methods: {
      async main() {
          var algoliasearch = require('algoliasearch');
          var algoliaClient = algoliasearch('M9XW3XVWG0', '288c28208b24251497422ab5aa1bb4fd');
          var index_name = "";

          //If books is selected by the user, search on books index and set image detector to label detection
          if (this.bookButton == true) {
            this.data.requests[0].features[0].type = "LABEL_DETECTION";
            index_name = 'GitaQuotes';
          }

          //If people is selected by the user, search on people index
          if (this.peopleButton == true) {
            index_name = 'PeopleQuotes';
            //If person identification is enabled by the user, set image detector to web detection
            if (this.detectWebEntities == true) {
              this.data.requests[0].features[0].type = "WEB_DETECTION";
              this.data.requests[0].features[0].maxResults = 1;

            }
            //Otherwise, default to label detection
            else {
              this.data.requests[0].features[0].type = "LABEL_DETECTION";
            }
          }

          /*//If all is selected
          if (this.toggle == 2) {
            this.data.requests[0].features[0].type = "LABEL_DETECTION";
            index_name = 'AllQuotes';
          }*/

          //Convert image from canvas to base64
          const canvas = document.getElementById('imageCanvas');
          const context = canvas.getContext('2d');
          const base64 = canvas.toDataURL();
          const img = canvas.toDataURL();
          this.canvasImage = img;
          const finalImage = base64.replace("data:image/png;base64,", "");
          this.data.requests[0].image.content = finalImage;

          //Get image labels from google cloud vision
          var cloudVisionResponse = await this.getImageLabels(this.data);
          var imageLabels = []
          console.log(cloudVisionResponse)
          for (var i = 0; i < cloudVisionResponse.length; i++){
            var label = cloudVisionResponse[i].description
            imageLabels.push(label)
            this.$notify({
              type: 'success',
              title: "Detected Label: " + label
            })
          }
          //Search the index for relevant quotes
          var hits = await this.getQuotes(imageLabels, index_name, algoliaClient);

          //Put all the quotes in an array
          for (var i = 0; i < hits.length; i++){
            var arr = hits[i]
            for (var j = 0; j < arr.length; j++){
              var quote = arr[j].quote
              var reference = arr[j].reference
              this.quotes.push(quote)
              this.references.push(reference)
            }
          }

          /*//Output labels to U.I
          for(var i = 0; i < imageLabels.length; i++) {
              var obj = imageLabels[i];
              document.getElementById('printstuff').innerHTML += "<li>" + obj.description + " (confidence: " + obj.score + ")</li>";
          }*/
          //console.log(this.quotesIndex)
          //console.log(this.quotes[this.quotesIndex])


          var photoEditor = await this.renderPhotoEditorUI(this.quotesIndex);
      },
      getImageLabels(imageData){
      self = this
      return new Promise(function (resolve, reject){

      /*var dummy = {
            "responses": [
              {
                "labelAnnotations": [
                  {
                    "mid": "/m/0bt9lr",
                    "description": "Hair",
                    "score": 0.97346616
                  }
                ]
              }
            ]
        }
        resolve(dummy)*/

        axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${self.apiKey}`,
            imageData).then(response => {
              console.log(response)
              var result = null
              if (self.detectWebEntities == false){
                result = response.data.responses[0].labelAnnotations;
              }
              else {
                result = response.data.responses[0].webDetection.webEntities;
              }
              resolve(result);
      }).catch(error => {
          console.log(error);
      })

    });
  },
  getQuotes(labels, indexName, client){
    var self = this
    return new Promise(function(resolve, reject){

      var index = client.initIndex(indexName);
      var matchedHits = []
      var promises = []

      for(var i = 0; i < labels.length; i++) {
          //var obj = labels[i]; //Access the JSON object in the labels array
          //var keyword = obj.description; //Get the image label from the object
          var keyword = labels[i]
          //Search the index using the image label
          //var hit = await searchIndex(index, keyword)

          promises.push(new Promise((resolve, reject) => {

            index.search({ query: keyword }, (err, content) => {
              if (err) {
                console.log(err);
                console.log(err.debugData);
                return;
              }
              //Store the results of the search
              resolve(content.hits)
            })
          })
        )
        }
        resolve(Promise.all(promises))

      });
    },
    renderPhotoEditorUI(quoteIndex){
      //Get the quote at the first index of the quotes array
      var quoteText = this.quotes[quoteIndex]
      var referenceText = this.references[quoteIndex]

      //Get the image that is currently displayed on the canvas
      const imagecanvas = document.getElementById('imageCanvas')
      const base64 = imagecanvas.toDataURL(); //Convert the image to base64 format

      const image = new Image()
      image.addEventListener('load', () => {

      //Initialise the photo editor
      const editorUI = new PhotoEditorDesktopUI({
        container: this.$refs.container,
        license: this.license,
        assets: {
          baseUrl: "assets/"
        },
        editor: {
          image: image
        }
      })

      //Set the isRendered boolean to true
      this.isRendered = true

      this.editor = editorUI
      editorUI.on(PhotoEditorDesktopUI.Events.EDITOR_READY, () => {

            //Get the existing editor/sdk in the Desktop U.I
            const editor = editorUI.getEditor()
            const sdk = editor.getSDK()

            //Create a state for the editor, configuring the text option
            const state = {
                            "version": "3.4.0",
                            "operations": [
                              {
                                "type": "sprite",
                                "options": {
                                  "sprites": [
                                    {
                                      "type": "textdesign",
                                      "options": {
                                        "position": { //Place the text design at the centre of the page
                                          "x": 0.5,
                                          "y": 0.5
                                        },
                                        "rotation": 0,
                                        "flipHorizontally": false,
                                        "flipVertically": false,
                                        "text": quoteText + " - " + referenceText, //Set the text to the quote, followed by the reference
                                        "color": {
                                          "rgba": [ //Set the default colour to white
                                            1,
                                            1,
                                            1,
                                            1
                                          ]
                                        },
                                        "width": 0.8,
                                        "seed": 1555501613058,
                                        "inverted": false,
                                        "padding": 0.008,
                                        "identifier": "imgly_text_design_equal_width" //Set the design style
                                      }
                                    }
                                  ]
                                }
                              }
                            ],
                            "meta": {
                              "platform": "html5",
                              "version": "4.18.0",
                              "createdAt": "2019-04-17T11:47:07Z"
                            },
                            "image": {
                              "width": 1920,
                              "height": 1280
                            }
                          }

            editor.deserialize(state)
              .then(() => {
                console.log('State restored')
              })

          })

      })
      image.src = this.base64

    },
    async shuffleQuote(){
      this.quotesIndex += 1
      await this.photoEditorNewQuote(this.quotesIndex)

    },
    photoEditorNewQuote(index){
        var quoteText = this.quotes[index]
        var referenceText = this.references[index]
        //Get the existing editor/sdk in the Desktop U.I
        const editor2 = this.editor.getEditor()
        editor2.serialize({ image: false })
          .then((state) => {
            var new_state = state
            new_state.operations[0].options.sprites[0].options.text = quoteText + " - " + referenceText

             editor2.deserialize(new_state)
               .then(() => {
               })

          })


    },
    photoEditorNewTextDesign(index){
      //Get the existing editor/sdk in the Desktop U.I
      const editor2 = this.editor.getEditor()
      var identifier = this.textDesigns[index]

      editor2.serialize({ image: false })
        .then((state) => {
          var new_state = state
          new_state.operations[0].options.sprites[0].options.identifier = identifier

           editor2.deserialize(new_state)
             .then(() => {
             })

        })


    },
    photoEditorNewColour(colors){
      this.$refs['colour-modal'].hide()
      var r = colors.rgba.r/255
      var g = colors.rgba.g/255
      var b = colors.rgba.b/255
      var a = colors.rgba.a

      var rgba = [r,g,b,a]
      console.log(rgba)
      const editor2 = this.editor.getEditor()

      editor2.serialize({ image: false })
        .then((state) => {
          var new_state = state
          new_state.operations[0].options.sprites[0].options.color.rgba = rgba

           editor2.deserialize(new_state)
             .then(() => {
             })
        })

    },
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      },
      showModal() {
            this.$refs['mymodal'].show()
            self = this
        $(function() {
               const video = document.getElementById('video');
               if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                  navigator.mediaDevices.getUserMedia({
                      video: true
                  }).then(stream => {
                      video.srcObject = stream;
                       video.play();
                       self.stream = stream
                   });
               }

            })
  },
  stopCamera(){
    console.log("lol")
    this.stream.getTracks()[0].stop()
  },
  showColourModal(){
    this.$refs['colour-modal'].show()
  },
  updateCanvasFromCamera() {
      this.stream.getTracks()[0].stop()
      const canvas = document.getElementById('imageCanvas');

      //Get the current image data from the video tag
      var video = document.querySelector('video');
      var w, h, ratio;
      ratio = video.videoWidth / video.videoHeight;

      // Define the required width as 100 pixels smaller than the actual video's width
      w = video.videoWidth - 100;
      // Calculate the height based on the video's width and the ratio
      h = parseInt(w / ratio, 10);
      canvas.width = w;
      canvas.height = h;

      //Get the 2D context of the canvas and draw the video image onto it
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, w, h);
      //Get base64 string of the image
      const base64 = canvas.toDataURL();
      //Strip the header of the string, storing just the raw image data
      const finalImage = base64.replace("data:image/png;base64,", "");
      var image = new Image();
      image.onload = function() {
       context.drawImage(image, 0, 0);
      };
     image.src = base64;
     this.base64 = base64;


    this.$refs['mymodal'].hide()
  },
  updateCanvasFromFile(e) {
    var self = this;
    var reader, files = e.target.files;
    var reader = new FileReader();

    reader.onload = (e) => {
        var img = new Image();
        img.onload = function() {
            self.drawCanvasImage(img)
        }
        img.src = event.target.result;
        console.log(img)
        this.base64 = img.src
    };

    console.log(reader.readAsDataURL(files[0]));

  },
  drawCanvasImage(img) {
    const canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    const width = 300;
    const scaleFactor = width / img.width;
    canvas.width = width;
    canvas.height = img.height * scaleFactor;
    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
  },
  toggleBookState() {
    this.bookButton = true
    this.peopleButton = false
    this.detectWebEntities = false
  },
  togglePeopleState() {
    this.bookButton = false
    this.peopleButton = true
  },
},
mounted(){
  $(this.$refs.mymodal).on("hidden.bs.modal", this.stopCamera())
}
}

</script>
<style></style>
