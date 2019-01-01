var express = require('express');
var router = express.Router();

//引入mysql模块
const mysql=require('mysql');
//数据库连接配置
const conn=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"hlsmms"
});
//打开数据库连接
conn.connect(err=>{
  if(err){
    console.log("数据库连接失败", err.message);
  }else{
    console.log("数据库连接成功")
  }
})

//跨域请求
router.all("*", (req, res, next) => {
  //res.header("Access-Control-Allow-Origin","*"); //携带cookie证书是，跨域不能使用通配符*
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Allow-Credentials",true)
  next(); //放行执行下面的路由
});

router.post("/useradd", (req, res) => {
  //前端的参数，用户信息
  let {username,pass,usergroup} = req.body;
  //添加用户路由中构造sql语句和参数数组
  let sqlStr="insert into userinfo (username,userpwd,usergroup) values(?,?,?)"
  //参数数组
  let params=[username,pass,usergroup];
  //执行sql 语句
  //语法：conn.query("sql语句","参数数组",回调函数(err错误对象,result返回的结果)=>{});
  conn.query(sqlStr,params,(err,result)=>{
    if(err){
      throw err;
    }else{
     //console.log(result);
       //根据执行结果，返回数据给前端
      if (result.affectedRows > 0) {
        res.json({ "isok": true, "message": "添加用户成功" })
      } else {
        res.json({ "isok": false, "message": "添加用户失败" })
      }
    }
  })
})

//获取用户列表的路由
router.get("/getusers", (req, res) => {
  //1. 构造sql语句
  let sqlStr = "select * from userinfo order by userid DESC"; //按用户id降序排列

  //2. 执行SQL语句
  conn.query(sqlStr, (err, users) => {
    if (err) {
      throw err;
    }
    else {
      //3. 返回查询的用户数据给前端
      res.send(users);
    }
  })
})

//后端接收删除用户列表的请求
router.get("/deluser",(req,res)=>{
  //接收参数（userid）
  let userid = req.query.userid
  //构造sql语句
  const sqlStr = `delete from userinfo where userid=${userid}`
  //执行删除命令
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    }else{
      //console.log(result)
      if (result.affectedRows > 0){
        res.json({"isok":true,"message":"删除用户成功"})
      }else{
        res.json({"isok": false, "message": "删除用户失败" })
      }
    }
  })
})

//获取旧的用户数据的路由
router.get("/getuserData",(req,res)=>{
  let userid=req.query.userid;
  //构造sql查询语句
  let sqlStr=`select * from userinfo where userid=${userid}`;
  //执行SQL语句
  conn.query(sqlStr,(err,olduserData)=>{
    if(err){
      throw err
    }else{
      //拿到旧的数据回填到模态框
      res.send(olduserData)
    }
  })
})

//修改数据后，保存用户数据的路由
router.post("/usersave",(req,res)=>{
  //接收参数
  let { userid, username, userpwd, usergroup, addDate}=req.body;
  //构造sql语句
  let sqlStr="update userinfo set username=?,userpwd=?,usergroup=? where userid=?";
  //参数数组
  let params=[username,userpwd,usergroup,userid];
  //执行sql语句
  conn.query(sqlStr,params,(err,result)=>{
    if(err){
      throw err
    }else{
      if (result.affectedRows){
        res.json({"isok":true,"message":"用户修改成功"})
      }else{
        res.json({ "isok": false, "message": "用户修改失败" })
      }
    }
  })
})

//检验用户登录登录的路由
router.post("/checkLogin",(req,res)=>{
  //接收参数
  let {username,userpwd}=req.body;
  //构造sql语句
  let sqlStr="select * from userinfo where username=? and userpwd=?";
  //参数数组
  let params=[username,userpwd]
  // 执行sql语句
  conn.query(sqlStr, params,(err,result)=>{
    if(err){
      throw err
    }else{
      //如果result是一个空数组，就代表不是数据库中的数据
      //res.send(result)
      if(result.length>0){
        //登录成功，写入cookie，返回成功标识
        res.cookie("userid",result[0].userid);
        res.cookie("username",username);
        res.json({"isok":true,"message":"登录成功，欢迎您"})
      }else{
        res.json({ "isok": false, "message": "登录失败，账号或密码错误！" })

      }
    }
  })
})

//获取cookie的路由
router.get("/getCookie",(req,res)=>{
  let userid=req.cookies.userid;
  let username=req.cookies.username;
  //如果存在cookie就返回isok为true
  if(userid&&username){
    res.send({"isok":true})
  }else{
    res.send({ "isok": false})
  }
})

//退出登录，清除cookie的路由
router.get("/loginOut",(req,res)=>{
  res.clearCookie("userid");
  res.clearCookie("username");
  res.json({"isok":true})
})


module.exports = router;
