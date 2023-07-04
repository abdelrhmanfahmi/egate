<template>
  <!-- faq page  -->
  <div>
    <v-app>
      <div class="wrapper">
        <v-container>
          <v-breadcrumbs :items="items" class="text-gray">
            <template v-slot:prepend>
              <v-icon size="small" icon="mdi-home"></v-icon>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>

          <h1>FAQS</h1>
          <v-row>
            <v-col cols="12" lg="8" md="8" sm="12">
              <div class="faq-list">
                <div v-for="(x, index) in 6" :key="index">
                  <details :class="`details-${index}`">
                    <summary :title="`title - ${index}`">
                      title - {{ index }}
                    </summary>
                    <p class="faq-content">{{ index }} - faq-content</p>
                  </details>
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
                <div class="d-flex" justify="start">
                    <img :src="require('@/assets/images/home/Braun-Desktop-EN.png')" class="img-responsive" />
                </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {},
        {
          title: "FAQS",
          disabled: true,
          href: "faq",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
div + div {
  clear: both;
}

p {
  line-height: 1.4em;
  color: #000;
}

.faq-title {
  font-size: 2em;
  margin: 0.4em 0;
}

div.seperator {
  width: 7.5em;
  background-color: $gray;
  height: 0.17em;
  margin-left: -1.8em;
}

.faq-list > div {
  border-bottom: 2px solid $gray;
  padding: 1.5em 0em;
}

.faq-list > div:last-child {
  border: unset;
}

details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}

summary {
  font-size: 1.4em;
  font-weight: bold;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.3s ease;
}

summary:hover {
  color: $gray;
}

details[open] summary ~ * {
  animation: sweep 0.5s ease-in-out;
}

@keyframes sweep {
  0% {
    opacity: 0;
    margin-left: -10px;
  }
  100% {
    opacity: 1;
    margin-left: 55px;
  }
}

details[open] summary {
  color: $gray;
}

details[open] p {
  //border-left: 2px solid $gray;
  margin-left: 55px;
  padding-left: 25px;
  opacity: 100;
  transition: all 3s ease;
  margin-top: 20px;
}

details[open] summary:after {
  content: "-";
  font-size: 3.2em;
  margin: -33px 0.35em 0 0;
  font-weight: 200;
}

.faq-body {
  width: 70em;
  margin: 4em auto;
  box-shadow: 0px 0px 16px #5b5b5b;
  border-radius: 0.2em;
  padding: 5em;
  background-color: #fff;
}

.faq-list {
  width: 100%;
  margin: 1em auto;
  padding: 2em 0;
}

summary::-webkit-details-marker {
  display: none;
}

summary:after {
  background: transparent;
  border-radius: 0.3em;
  content: "+";
  color: $gray;
  float: right;
  font-size: 1.8em;
  font-weight: bold;
  margin: -0.3em 0.65em 0 0;
  padding: 0;
  text-align: center;
  width: 25px;
}
.jumbotron {
  margin-bottom: 30px;
  color: inherit;
  background-color: $gray;
  text-align: center;
  color: #fff;
  padding: 3% 0;
}

img.img-responsive{
    width: 100%;
    min-height: 300px;
    object-fit: cover;
}
</style>
