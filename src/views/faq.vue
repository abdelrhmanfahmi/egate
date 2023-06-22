<template>
  <!-- faq page  -->
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">
          {{ $t("home.faq") }}
        </h1>
      </div>
    </div>

    <div class="container">
      <div class="faq-list">
        <div v-for="(questin , index) in questions" :key="index">
          <details :class="`details-${index}`">
            <summary :title="questin.title">
              {{questin.title}}
            </summary>
            <p class="faq-content">
              {{questin.description}}
            </p>
          </details>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>0
// faq page 
import profile from "@/services/profile";
export default {
  data() {
    return {
      questions: null,
    };
  },
  methods: {
    /**
     * @vuese
     * this function used to get faq 
     */
    faqPage() {
      profile
        .faqPage()
        .then((res) => {
          this.questions = res.data.items;
        })
    },
  },
  mounted(){
    this.faqPage()
  }
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
  background-color: $main-color;
  height: 0.17em;
  margin-left: -1.8em;
}

.faq-list > div {
  border-bottom: 0.07em solid #ededed;
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
  color: $main-color;
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
  color: $main-color;
}

details[open] p {
  border-left: 2px solid $main-color;
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
  width: 60%;
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
  color: $main-color;
  float: left;
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
  background-color: $main-color;
  text-align: center;
  color: #fff;
  padding: 3% 0;
}
</style>
