<template>
  <div>
    <div class="wrap1">
      <header class="bigheader">
        <div class="smallheader">
          <div class="centerheader">
            <div class="centerheaderleft">
              欢迎,登录反坦克教室系统！
            </div>
            <div class="centerheaderright" @click="loginstudent" v-show="!isquie">
              <i class="el-icon-user"></i>
              <span>登录</span>
            </div>
            <div class="centerheaderright" @click="logout" v-show="isquie">
              <i class="el-icon-switch-button"></i>
              <span>退出登录</span>
            </div>
          </div>
        </div>
        <div class="hdceter">
          <div class="title">欢迎，登录反坦克教室系统</div>
<!--          <div class="smaltitle1">-->
<!--            VR虚拟现实系统采用人机交互的方式进行装备仿真模拟操作，具有对四连站某型航空-->
<!--            电源车进行演示、分解、提示、指导、实操等功能。-->
<!--          </div>-->
<!--          <div class="smaltitle2">-->
<!--            让受训人员进入虚拟现实环境，实时感知和操作虚拟环境中的各种装设备，-->
<!--            从而通过视觉、触觉和听觉等获得身临其境的真实感受。-->
<!--          </div>-->
        </div>


        <div id="wrap2">
          <div class="smw">
            <div class="kuang" @click="$router.push('/first')">
              <img src="../assets/shouye.png" alt="" class="smpic">
            </div>
            <h3>首页
              <span class="badge dba1"></span>
            </h3>

          </div>

          <div class="smw">
            <div class="kuang">
              <img src="../assets/zyxuexi.png" alt="" class="smpic">
            </div>
            <h3>课件资源学习
              <span class="badge dba1"></span>
            </h3>

          </div>
          <div class="smw">
            <div class="kuang" @click="$router.push('/fmtask')">
              <img src="../assets/kaoshi2.png" alt="" class="smpic">
            </div>

            <h3>模拟考试
              <span class="badge dba2"></span>
            </h3>

          </div>
          <div class="smw">
            <div class="kuang" @click="geren">
              <img src="../assets/geren.png" alt="" class="smpic">
            </div>
            <h3>个人中心
              <span class="badge dba3"></span>
            </h3>

          </div>
        </div>
      </header>
      <div class="container">
        <div class="cttab">
          <div v-for="(item,index) in tabs" @click="tab(index)"
               :key="index"
               :class="[tabnum==index?'activetab':'cttab1']">
            {{item}}
          </div>
        </div>
        <!--        被切换内容-->
        <div class="newsleft">
          <div class="newsleft1">
								<span class="zaozinls">
									{{tabs[tabnum]}}
								</span>
            <div>
              <select v-model="queryInfo.value2" class="sles" @change="slecfunc($event,queryInfo.value2)">
                <option value="0">全部 </option>
                <option :value="item.id" v-for="(item,index) in subjectarr"
                        :key="item.id">
                  {{item.lable}}
                </option>
              </select>
            </div>
          </div>

          <!--        课程列表8个-->
          <div class="newsleft2">
            <div class="smalleft3" v-for="(item,index) in gonggaoarr"
                 :key="index" @click="hrefgonggao(item.id)">
              <div class="smalleft31"></div>
              <div class="smalleft32">
                {{item.title}}
              </div>
              <div class="smalleft33">{{item.publishDate}}</div>
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-size="queryInfo.pagesize"
              layout="total, prev, pager, next,jumper"
              :total="total">
            </el-pagination>
          </div>

        </div>

      </div>
      <footer class="wrap1footer">
        <div class="jhg">
          <span>服务协议|</span>
          <span>关于我们|</span>
          <span>联系我们</span>
        </div>
        <div>
          COPYRIGHT@2020反坦克教室平台
        </div>
        <div>
          技术支持:中国科学院沈阳计算研究所有限公司
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        isquie:false,
        subjectarr:[],
        subjectId:'',
        isloged:'',
        searchdata:'',
        p1:'/static/home.png',
        pic11:'/static/home.png',
        pic12:'/static/homecopy.png',
        p2:'/static/xuexi.png',
        pic22:'/static/xuexi.png',
        pic23:'/static/xuexicopy.png',
        p3:'/static/VRD.png',
        p31:'/static/VRD.png',
        p32:'/static/VRDcopy.png',
        p4:'/static/kaoshi.png',
        p41:'/static/kaoshi.png',
        p42:'/static/kaoshicopy.png',
        p5:'/static/shenqing.png',
        p51:'/static/shenqing.png',
        p52:'/static/shenqingcopy.png',
        p6:'/static/man.png',
        p61:'/static/man.png',
        p62:'/static/mancopy.png',
        gonggaoarr:[],
        tabs:["教学文件学习","教学视频学习"],
        types:['426电源车','30电源车'],
        tabnum:0,
        // tabMain:['内容1','内容2','内容3']
        //默认426电源车
        typenum:0,
        total:0,
        queryInfo:{
          //资源类
          value1:0,
          //课程类
          value2:0,
          value3:'',
          pagenum:1,
          pagesize:5
        },
        base:''

      }
    },
    created() {
      this.base=this.BASE_URL
      this.loginid=window.sessionStorage.getItem('loginid')
      this.loginName=window.localStorage.getItem('loginName')
      if(this.loginid){
        //  已登录
        this.isquie=true
      }else{
        this.isquie=false
      }
      this.getsubjectList()

    },
    mounted() {

    },
    methods:{
      getsubjectList(){
        this.$http.get(`${this.base}/api/Subject/getAllSubject`).then(res=>{
          console.log('返回列表')
          console.log(res.data)
          this.subjectarr=res.data[0].children

          this.getGongao()

        }).catch(res=>{
          console.log('获取科目失败')
        })
      },
      handleCurrentChange(val){
        this.queryInfo.pagenum=val
        this.getGongao()

      },
      logout(){
        window.sessionStorage.removeItem('loginid')
        this.$router.push('/login')
      },
      tab(index){
        // 切换
        this.tabnum=index
        this.queryInfo.value1=index
        this.getGongao()
      },
      tabtypes(index){
        this.queryInfo.value2=index
        this.getGongao()
      },
      geren(){


        const logintype=this.logintype

        if(logintype==''||logintype==null){
          this.$message.warning('请登录')
        }else if(logintype=='1'){
          this.$router.push('/studenthome')
        }else if(logintype=='0'){
          this.$router.push('/home')
        }

      },
      shouye(){
        this.$router.push('/first')
      },
      studyye(){
        this.$router.push('/firststudy')
      },
      loginstudent(){
        //  登录
        this.$router.push('/login')
      },
      mainsearch(data){
        console.log('监听')
      },
      formaltask(){
        this.$router.push('/fmtask')

      },
      getGongao(){
        this.$http.post(`${this.base}/api/resource/getresourceByPage1`,this.queryInfo).
        then(res=>{
         console.log('获取资源列表')
          console.log(res.data)
          this.gonggaoarr=res.data.data
          this.total=res.data.total
        })
      },
      practice(){
        this.$router.push('/practice')
      },
      hrefgonggao(id){
        console.log('id在这里')
        console.log(id)
        this.$router.push({
          path:'/opensources',
          query:{
            params:id
          }
        })
      },
      slecfunc($event,item){
        console.log('change了')
        console.log(item)
        this.queryInfo.pagenum=1
        this.getGongao()

      }
    }
  }
</script>

<style lang="less" scoped>
  html,body{
    font-family: '微软雅黑';
  }
  .wrap1{
    min-width: 830px;
    background: rgb(245,247,250);

  }
  *{
    margin:0;
    padding: 0;

  }
  @font-face {
    font-family: "zaozi";
    src:url("../assets/fonts/zaozi.otf");
  }
  header{
    width: 100%;
    height: 425px;
    min-height: 255px;

  }
  .hdceter{
    width:750px;
    margin:115px auto 0;
    text-align: center;
  }
  .headerimg{
    width: 100%;

  }
  .bigheader{
    height:450px;
    background: url("../assets/pcbg1.png");
    background-position: center;
    background-size:100% 100%;
    position: relative;
  }
  .smallheader{
    /*position: absolute;*/
    /*top:0;*/
    /*left:0;*/
    width: 100%;

    height: 28px;
    line-height: 28px;
    background: rgba(10,104,171,0.6);
  }
  .centerheader{
    width:70%;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color:white;
    align-items: center;
  }
  .pcsearch{
    width:466px;
    height: 35px;




  }
  .pcsearch .el-input__inner{
    border-radius: 35px;
    background-color: rgba(3,19,42,.6);
    color: white;
  }
  .centerheaderright{
    cursor: pointer;
  }
  .title{
    font-size: 1.9em;
    color: white;
    margin-bottom: 25px;
  }
  .smaltitle1{
    font-size: .5em;
    color: white;
    margin-bottom: 15px;
  }
  .smaltitle2{
    font-size: .5em;
    color: white;
    margin-bottom: 35px;
  }
  .bottomheader{
    position: absolute;
    bottom: -50px;
    height:100px;
    width:850px;
    background: white;
    box-shadow:0 3px 3px rgba(0,0,0,.2) ;
    border-radius: 10px;
    left: 50%;
    margin-left: -425px;
    text-align: center;
  }
  .headerblock{
    /*background: red;*/
    width: 16%;
    height: 100%;
    display: inline-block;
    padding: 7px 5px 5px 5px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .headerblock img{
    width: 55%;
  }
  .headerblock p{
    font-size: 14px;
    color:dimgray;
  }
  .container{
    width:1480px;
    height: 355px;
    overflow: hidden;
    padding-top: 75px;
    margin:170px auto 0;
    background: rgb(245,247,250);
  }

  .smalleft3{
    width:100%;
    display: flex;
    align-items: center;
    margin-top:6px ;
    cursor: pointer;
    /*justify-content: space-between;*/

    overflow: hidden;

  }
  .smallef3{
    width:100%;
    margin-top:6px ;
    cursor: pointer;
    /*justify-content: space-between;*/


  }
  .newsleft1{
    width: 100%;
    height: 35px;
    border-bottom: 1px solid rgb(193,193,193);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .newsleft1 img{
    width: 15px;
    height: 15px;
    margin-top: -10px;
  }
  .zaozinls{
    font-family: "zaozi";
    color: rgb(48, 61, 111);
    font-size: 24px;
    border-bottom:1px solid rgb(48, 61, 111);
    /*padding-bottom: 8px;*/
    box-sizing: border-box;
    display: block;
    height: 100%;
  }
  .newsleft{
    float: right;
    width:75%;
    margin-left: 5%;
    box-shadow:0 1px 1px lightgray;
    background: white;
    padding: 20px;
    box-sizing: border-box;
  }

  .smalleft32{
    width: 55%;
    color: grey;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 10px;
    float: left;
  }
  .smalleft33{
    color: rgb(152,152,152);
    font-size: 12px;
    /*margin-left: 10px;*/
    margin-left: auto;
    float: right;
  }
  .smalleft31{
    width: 5px;
    height: 5px;
    background:rgb(48, 61, 111);
    float: left;
  }
  .disleveltop{
    overflow: hidden;
    width: 100%;
    color: grey;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }
  .disleveltop .smalleft31{
    float: left;
  }
  .dislevelbot{
    width:100%;
    color: rgb(152,152,152);
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .smle{
    margin-left: 10px;
  }
  .smri{
    margin-left: auto;
    float: right;
  }
  .fispan{
    margin-left: 10px;
  }
  .wrap1footer{
    padding-top: 12px;
    padding-bottom: 8px;
    width: 100%;
    /*height: 75px;*/
    background: rgb(235,238,240);
    font-size: 12px;
    color: grey;
    text-align: center;

  }
  .wrap1footer div{
    margin-bottom: 8px;
  }
  .jhg span{
    cursor: pointer;
  }
  .cttab{
    float: left;
    width: 20%;

  }
  .cttab1{
    width: 100%;
    height: 40px;
    background: darkgrey;
    color: darkslategray;
    text-align: center;
    line-height: 40px;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .activetab{
    background: #303D6F;
    color: white;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .normalbtn{
    width: 90px;
    height: 25px;
    border-radius: 3px;
    border: 1px solid #303D6F;
    color: cornflowerblue;
    margin-left: 8px;
    background: white;
  }
  .btnactive{
    width:  90px;
    height: 25px;
    border-radius: 3px;
    border: 1px solid #303D6F;
    color: white;
    background: cornflowerblue;
    margin-left: 8px;
  }
  .sles{
    width: 150px;
    height: 25px;
    border-radius: 4px;
    border: 1px solid #303D6F;
    outline: none;
  }

  #wrap2{
    position: absolute;
    width: 1480px;
    bottom: -180px;

    left: 50%;
    margin-left: -740px;
    height: 300px;
    display: flex;
    justify-content: space-around;
  }
  .smw{
    width: 320px;
    height: 100%;
    background: white;
    box-shadow: 0px 1px 10px rgba(0,0,0,0.5);
    border: 3px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
  }
  .smpic{
    width: 100%;
    transition: all .7s;
  }
  .smpic:hover{
    transform: scale(1.3);
    transition: .7s;
  }
  .kuang{
    width: 86%;
    overflow: hidden;
    cursor: pointer;
  }
  .smw h3{
    font-size: 22px;
    margin-top: 20px;
  }


</style>
