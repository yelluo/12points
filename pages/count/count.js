var util = require('../../utils/util.js');
Page({
    data:{
         disabled:[false,false,false,false,false,false],
         countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],
         last_disabled: [false, false, false, false, false, false],
         last_countLine: [{ firstNum: '', operator: '', nextNum: '', result: '', isCounted: false }],
         result:[],
         isFinised:false,
         isSuccessed:false,
         game:'24点',
         sum:24,
         numT:4,
         old_numbers_string:[],   
         grade:'随机',
         total:0,
         score:{gameIndex:0,successNum:0,skipNum:0,failNum:0}
    },
    onLoad:function(options){
      this.setData({ game: options.game,grade:options.grade,userInfo:options.user});
      if (options.game == '24点')
        this.setData({sum: 24, numT: 4 });
      else if (options.game == '12点')
        this.setData({ sum: 12, numT: 3 });
      else if (options.game == '6点')
        this.setData({ sum: 6, numT: 3 });
      this.creatUnit();
    },
    creatUnit(){
      var newData;
      let game = this.data.game, g = this.data.grade, beginDate = new Date().getTime(); //newData = util.count(g)
            // if(game != '24点')
              // newData = util.count2(g, this.data.sum);

            var flag = true, tryTimes = 0;
            while (flag) {
              // console.log(this.data.old_numbers_string);
              if (game != '24点')
                newData = util.count2(g, this.data.sum, tryTimes);
              else
                newData = util.count(g);
              // console.log('while ' + newData);
              if (newData) {  
                flag = false;
                for (var i = 0; i < this.data.old_numbers_string.length; i++) {
                  if (newData.nums.toString() == this.data.old_numbers_string[i]) {
                    flag = true;                  
                  }
                }
              }
              tryTimes++;
              if (tryTimes > 500)
                break;
            }

            if(newData){
                // console.log(newData.nums);               
                
                this.data.old_numbers_string.push(newData.nums.toString());
                this.setData({
                    numbers: newData.nums,
                    answer:newData.answer,
                    showAnswer: false,
                    disabled:[false,false,false,false,false,false],
                    countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],               
                    isFinised:false,
                    isSuccessed:false,
                    modalHidden:true,
                    'score.gameIndex':this.data.score.gameIndex +1,
                    beginT:beginDate
                });
                if (game != '24点')
                  this.setData({
                    disabled: [false, false, false, false]
                  });
                this.setData({
                  last_countLine: this.data.countLine,
                  last_disabled: this.data.disabled
                });
            }else{
              // console.log('newData false: ' + newData);
              this.creatUnit();
            }            
       },
    
    usetoCount(e){        
        var num ,index = Number(e.target.dataset.index),disStatus=[],line = this.data.countLine.length - 1,newCountLine = this.data.countLine;
        let thisLine = this.data.countLine[line];

        this.setData({
          last_countLine: JSON.parse(JSON.stringify(this.data.countLine)),
          last_disabled: this.data.disabled
        });

        if (index < this.data.numT) {
          num = this.data.numbers[index];
        } else {
          num = this.data.countLine[index - this.data.numT].result
        }         

        if (thisLine.firstNum && thisLine.nextNum){
            return false;
        }else{
            if (!util.empty(thisLine.firstNum)){
                newCountLine[line].firstNum = num;
            }else{
                newCountLine[line].nextNum = num;
            }
             for (var i in this.data.disabled){
                disStatus[i] = i==index?true : this.data.disabled[i];           
            } 
            this.setData({           
                countLine:newCountLine,
                disabled:disStatus
            });
        }       
    },
    useOperator(e){
        var o = e.target.dataset.operator,line = this.data.countLine.length - 1 ,newCountLine = this.data.countLine;
        newCountLine[line].operator = o;
        this.setData({
            countLine:newCountLine
        });
    },
    toCount(){
        var oldData = this.data;
        var line = oldData.countLine.length - 1,thisLine =oldData.countLine[line], num1 = Number( thisLine.firstNum),num2 = Number(thisLine.nextNum),o = thisLine.operator,r=Number( thisLine.result);
        var newCountLine = oldData.countLine;       

        if (!util.empty(num1) || !util.empty(num2) || o =='' ){
            return false;
        }else{
            if (o=='+'){
                r=num1 + num2;
            }else if(o == '-'){
                r=num1 - num2;
            }else if(o == '×'){
                r= num1 * num2;
            }else{
                r= num1/num2;
            }
           
            newCountLine[line].result = String(r);
            newCountLine[line].isCounted = true; //当行计算完成
            
            if (oldData.disabled.indexOf(false)<0){
                //已经用完可用数字
                let useTime = Math.floor((new Date().getTime() - oldData.beginT)/1000),useTimeTxt='';
                if (useTime >=60){
                    useTimeTxt +=parseInt(useTime/60) + '分'+ (useTime % 60) +'秒'
                }else{
                    useTimeTxt = useTime +'秒';
                } 
      
                // if (Number(r) == this.data.sum){
                if (Math.abs(this.data.sum - Number(r)) < 1e-10) {
                     // console.log('equal');
                     r = this.data.sum;                  
                     let thisGradeNum = 1,thisScore=0;
                     if (oldData.grade == '中级'){
                         thisGradeNum = 2;
                     }else if(oldData.grade == '高级'){
                        thisGradeNum = 3;
                     }else if (oldData.grade == '随机') {
                       thisGradeNum = 4;
                     }
                     thisScore = thisGradeNum * Math.max(1,Math.ceil(2-(useTime-13)/6)) + oldData.total;
                                          
                       this.setData({total:oldData.total + thisScore}); 
                    
                        //结果正确
                        this.setData({
                            countLine : newCountLine,
                            isFinished:true,
                           // modalHidden:false,
                            isSuccessed:true,
                            'score.successNum':Number(oldData.score.successNum) +1,
                            thisUnitTime:useTime,
                            total: thisScore
                        })                        
                }else{
                    //结果错误
                    // console.log('not equal');

                    this.setData({
                        countLine : newCountLine,
                        isFinished:true,
                        //modalHidden:false,
                        isSuccessed:false,
                        'score.failNum':Number(oldData.score.failNum) +1,
                        thisUnitTime:useTimeTxt
                    })
                }
                // console.log('gameIndex: ' + oldData.score.gameIndex);
                // console.log('successNum: ' + oldData.score.successNum);
                //每局完成的反馈 >= 10 && >= 8
                if (oldData.score.gameIndex >= 10 && oldData.score.successNum >= 8){ 
                      //  let that=this, btnTxt= oldData.grade=='高级'?'看看成绩':'下一等级',cnt = '';
                     let that = this, btnTxt = oldData.grade == '随机' ? '看看成绩' : '下一等级', cnt = '';
                      //  if (oldData.grade=='高级'){
                      if (oldData.grade == '随机') {
                           cnt="最难的一关你已经完成"+(oldData.score.successNum+1) +"局，这么厉害，你咋不上天呢？"       
                       }else{
                           cnt="您已经完成"+(oldData.score.gameIndex)+"轮"+oldData.grade +"级别的练习，正确率达到"+Math.floor(oldData.score.successNum/oldData.score.gameIndex*10000)/100+"%，这么厉害，赶紧开始下个等级的练习吧！"
                       }
                       wx.showModal({
                            content: cnt,
                            title:'过关',
                            confirmText:btnTxt ,
                            showCancel:false,
                            success: function(res) {
                                if (res.confirm) {
                                    // if ( that.data.grade=='高级'){
                                    if (that.data.grade == '随机') {
                                      wx.navigateTo({ url: '../result/result?total=' + that.data.total + '&game=' + that.data.game+'&user='+that.data.userInfo});
                                    }else{
                                        // let newGrade = that.data.grade=="初级"?'中级':'高级';
                                        let newGrade = that.data.grade == "初级" ? '中级' : (that.data.grade == "中级" ? '高级' : '随机');      
                                        that.setData({grade:newGrade});  
                                        that.creatUnit();
                                        that.setData({score:{gameIndex:1,successNum:0,skipNum:0,failNum:0}})
                                    }
                                }
                            }
                        })
                    }else{
                let that = this,cnt = '',tt='可惜，不对哦！';
                        if(Number(r) == this.data.sum){
                            if(useTime<=18){
                                cnt='天才，受我一拜！'
                            }else if(useTime<=53){
                                cnt='您真是才思敏捷！'
                            }else if(useTime<=70){
                                cnt='争取更快点，加油！' 
                            }else{
                                cnt='脑子生锈了吧？那更需要动动咯，加油'
                            }
                            tt='祝贺你，成功了！'    
                        }
                        
                        cnt+="你用了"+useTime+"秒完成这题的计算。"
                        wx.showModal({
                            title: tt,
                            content: cnt,
                            confirmText:"下一题" ,
                            cancelText:"重新计算" ,
                            success: function(res) {
                                if (res.confirm) {
                                    that.creatUnit();
                                }else{
                                    that.setData(
                                        {
                                            disabled:[false,false,false,false,false,false],
                                            countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],
                                            isFinised:false,
                                            isSuccessed:false,
                                            modalHidden:true
                                        }
                                    )
                                    if (that.data.game != '24点')
                                      that.setData({
                                        disabled: [false, false, false, false]
                                      })
                                }
                            }
                        })
                    }
            }else{
                //计算未完成，生成新一行空的算式列式
                 newCountLine.push({firstNum:'',nextNum:'',isCounted:false});
                 this.setData({isFinished:false,countLine : newCountLine});
            }
        }
    },
    getNextUnit(){        
        this.creatUnit();
    },
    undo() {
      this.setData({
        countLine: this.data.last_countLine,
        disabled: this.data.last_disabled
      });
    },
    reCount(){
        this.setData(
            {
                disabled:[false,false,false,false,false,false],
                countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],
                isFinised:false,
                isSuccessed:false,
                modalHidden:true
            }
        );
        if (this.data.game != '24点')
          this.setData({
            disabled: [false, false, false, false]
          });
        this.setData({
          last_countLine: this.data.countLine,
          last_disabled: this.data.disabled,
          showAnswer: false
        });
    },
    toSkip(){
        this.setData({'score.skipNum':Number(this.data.score.skipNum) +1});
        this.creatUnit();
    },
    toHint() {
      this.setData({
        showAnswer: true
      });
    }
});