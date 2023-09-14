<template>
    <div class="wrapper">
        <div class="container">
            <div class="row">
                <label class="pb-2">Categories</label>
                <div class="containerDropDown" v-for="(category,idx) in categories" :key="idx"
                 @mouseover="showSubCategories(category.name_en)" 
                 @mouseleave="hideSubCategories(category.name_en)">
                    <div class="dropdown" >
                        <button
                            class="cssBtn"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <p>{{ category.name_en }} </p>
                        </button>
                        <ul :class="'dropdown-menu '+ category.name_en" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            
        }
    },

    props:['categories'],

    methods:{
        showSubCategories(dropdownName){
            let documentClass = document.getElementsByClassName('dropdown-menu ' + dropdownName)[0];
            documentClass.style.display = 'block';
        },
        hideSubCategories(dropdownName){
            let documentClass = document.getElementsByClassName('dropdown-menu ' + dropdownName)[0];
            documentClass.style.display = 'none';
        }
    },
}
</script>

<style scoped lang="scss">
  .cssStyleSpanIcon{
    position: absolute;
  }
  .containerDropDown{
    cursor: pointer;
  }
  p{
    color: #000;
    text-align: start;
  }
  .cssBtn{
    background-color: #fff;
    width: 100%;
    position: relative;
  }
  .cssBtn .dropdownSpan{
    color: #000;
    text-align: start;
  }
  .dropdown{
    position: relative;
    border: 1px solid #eee;
    padding: 0.5rem;
  }
</style>