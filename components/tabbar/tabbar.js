Component({
  data: {
    currentIndex:0
  },
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },
  methods: {
    titleTap(e){
      // console.log(e);
      this.setData({
        currentIndex:e.currentTarget.dataset.index
      })
      this.triggerEvent("titleTap",e.currentTarget.dataset.index)
    },
    receiveIndex(index){
      this.setData({
        currentIndex:index
      })
    }
  }
})