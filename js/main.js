let vm = new Vue({
  el: '.wrap',
  data: {
    currentIndex: 0,//默认第一首被选中
    isplaying: false, //是否正在播放
    isMvShow: false,//mv图标false默认不显示
    keywords: '',//搜索内容
    musicList: [], //所有歌曲列表
    musicPic: '', //歌曲图片
    musciComments: [],//音乐热门评论
    musicUrl: '',//音乐播放地址
    isShow: false,//mv默认不显示
    mvUrl: '',//mv的url地址
    flag: true,//用户控制用户点击回车键是否可以再点击(1.3s)
  },
  created() {
    // 创建完成
    // 获取所有歌曲列表
    this.getSongsList();
  },
  methods: {
    // 获取所有歌曲列表
    async getSongsList(){

      let res = await axios.get('http://localhost:3000/artist/top/song?id=6452');

      this.musicList = res.data.songs.map(song=>({id:song.id,name:song.name,mv:song.mv}));
    },

  //  播放音乐 传入下标 根据下标寻找music的id
    async playMusic(index) {
      const {musicList}=this;
      this.currentIndex=index;
      this.isplaying=true;
      let res=await axios.get(`http://localhost:3000/song/url?id=${musicList[this.currentIndex].id}`);
      this.musicUrl=res.data.data[0].url;
      res=await axios.get(`http://localhost:3000/song/detail?ids=${musicList[this.currentIndex].id}`);
      this.musicPic=res.data.songs[0].al.picUrl;
      res=await axios.get(`http://localhost:3000/comment/hot?type=0&id=${musicList[this.currentIndex].id}`);
      /*this.musciComments=res.hotComments;*/
      this.musciComments=res.data.hotComments.map(comment=>({content:comment.content,user:{avatarUrl:comment.user.avatarUrl,nickname:comment.user.nickname}}));
    },
    // 搜索歌曲
    async searchMusic() {
      const {keywords}=this;
      this.flag=false;
      setTimeout(()=>{
        this.flag=true;
      },130);
      try{
        let res=await axios.get(`http://localhost:3000/search?keywords="${keywords}"`);
        console.log(res);
        this.musicList=res.data.result.songs.map(song=>({id:song.id,name:song.name,mv:song.mvid}));
      }catch (e) {
        console.log(e);
      }


    },
    // 上一首 更改下标
    prev() {
      this.currentIndex?this.currentIndex--:"";
      this.playMusic(this.currentIndex);
    },
    // 下一首
    next() {
     this.currentIndex++;
     this.playMusic(this.currentIndex);

    },
    // 音乐播放
    play() {
      this.isplaying=true;
    },
    // 音乐暂停
    pause() {
      this.isplaying=false;
    },
    // 播放mv
    async playMv(mvid) {
      this.pause();
      this.musicUrl="";
      let res=await axios.get(`http://localhost:3000/mv/url?id=${mvid}`) ;
      this.isShow=true;
      this.mvUrl=res.data.data.url;

    },
    // 点击遮罩层 隐藏mv
    hide() {
      this.play();
      this.playMusic(this.currentIndex);
      this.isShow=false;
      this.mvUrl="";
    }
  }
})