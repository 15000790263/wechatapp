Component({
  data: {
    currentIndex:0,
    toTop:0,
  },
  properties: {
    cateLeft:{
      type:Array,
      value:[]
    },
    cateList:{
      type:Array,
      value:[]
    },
    rightList:{
      type:Object,
      value:{}
    }
  },
  
  methods: {
    leftTap(e){
      // console.log(e);
      this.triggerEvent("leftTap",e.target.dataset.index)
      this.setData({
        currentIndex:e.target.dataset.index,
        toTop:0
        // rightList:this.properties.cateList[e.target.dataset.index]
      })
      // console.log(this.data.rightList);
    }
  }
})


// //Component Object
// Component({
//   properties: {
//     myProperty:{
//       type:String,
//       value:'',
//       observer: function(){}
//     },

//   },
//   data: {

//   },
//   methods: {
    
//   },
//   created: function(){

//   },
//   attached: function(){

//   },
//   ready: function(){

//   },
//   moved: function(){

//   },
//   detached: function(){

//   },
// });

