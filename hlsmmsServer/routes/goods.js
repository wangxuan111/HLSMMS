var express = require('express');
var router = express.Router();
//引入
var conn=require('./conn');


//跨域请求
router.all("*", (req, res, next) => {
  //res.header("Access-Control-Allow-Origin","*"); //携带cookie证书是，跨域不能使用通配符*
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Allow-Credentials",true)
  next(); //放行执行下面的路由
});

//添加商品的路由
router.post("/add", (req, res) => {
    //接收前端参数
    let {classname, barcode, goodsname, saleprice, marketprice, costprice, stocknum, weight, unit, isdiscount, ispromotion, details}=req.body
    //构造sql语句
    let sqlStr ="insert into goodsinfo (classname, barcode, goodsname, saleprice, marketprice, costprice, stocknum, weight, unit, isdiscount, ispromotion, details) values (?,?,?,?,?,?,?,?,?,?,?,?)"
    //参数数组
    let sqlParams = [classname, barcode, goodsname, saleprice, marketprice, costprice, stocknum, weight, unit, isdiscount, ispromotion, details];
    //执行sql语句
    conn.query(sqlStr,sqlParams,(err,result)=>{
        if(err){
            throw err;
        }else{
            if (result.affectedRows>0){
                res.send({"isok":true,"message":"添加商品成功！"})
            }else{
                res.send({ "isok": false, "message": "添加商品失败！" })
            }
        }
    })
})

//获取商品列表的路由
router.get("/goodsmanage", (req, res) => {
    //接收参数classname，keywords
    let{classname,keywords}=req.query;
    

  //1. 构造sql语句
    let sqlStr = "select * from goodsinfo where 1=1";
    if(classname){
        sqlStr+=` and classname='${classname}'`;
    }
    if(keywords){
        sqlStr+=` and goodsname like '%${keywords}%' or barcode like '%${keywords}%'`;
    }
    //拼接上排序的子句
    sqlStr+=" order by goodsid DESC";

    //获取总记录条数
    let total=0;
    conn.query(sqlStr,(err,goodstatal)=>{
        if(err){
            throw err;
        }else{
            total =goodstatal.length;
        }
    })

    //分页，传参数，pagesize,currentpage
    let { pagesize, currentpage}=req.query;
    console.log(pagesize, currentpage)
    //设置每一页的显示
    if (pagesize && currentpage){
        //跳过的条数
        let n=(currentpage-1)*pagesize;
        //构造sql语句
        sqlStr += ` limit ${n},${pagesize}`
    }

  //2. 执行SQL语句
    conn.query(sqlStr, (err, goodsArray) => {
    if (err) {
      throw err;
    }
    else {
      //3. 返回查询的商品数据给前端
    //   res.send(result);
    res.send({"total":total,"goodsArray":goodsArray});
    }
  })
})

//销售统计报表的路由
// router.get("/saleecharts",(req,res)=>{
//     //构造sql语句，查询classname字段
//     let sqlStr="select stocknum from goodsinfo"
//     //执行sql语句
//     conn.query(sqlStr,(err,result)=>{
//         if(err){
//             throw err;
//         }else{
//             res.send(result)
//         }
//     })
// })



//后端接收删除商品列表的请求
router.get("/delgoods",(req,res)=>{
  //接收参数（userid）
  let goodsid = req.query.goodsid
  //构造sql语句
  const sqlStr = `delete from goodsinfo where goodsid=${goodsid}`
  //执行删除命令
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    }else{
      //console.log(result)
      if (result.affectedRows > 0){
        res.json({"isok":true,"message":"删除商品成功"})
      }else{
        res.json({"isok": false, "message": "删除商品失败" })
      }
    }
  })
})

//获取旧的商品数据的路由
router.get("/getgoodsData",(req,res)=>{
  let goodsid=req.query.goodsid;
  //构造sql查询语句
  let sqlStr=`select * from goodsinfo where goodsid=${goodsid}`;
  //执行SQL语句
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err
    }else{
      //拿到旧的数据回填到模态框
      res.send(result)
    }
  })
})

//修改数据后，保存商品数据的路由
router.post("/goodssave",(req,res)=>{
  //接收参数
  let { classname, barcode, goodsname, saleprice, marketprice, costprice, stocknum, weight, unit, isdiscount, ispromotion, details}=req.body;
  //构造sql语句
  let sqlStr ="update userinfo set classname=?,barcode=?,goodsname=?,saleprice=?,marketprice=?,costprice=?,stocknum=?,weight=?,unit=?,isdiscount=?,ispromotion=?,details=? where googsid=?";
  //参数数组
  let sqlparams = [classname, barcode, goodsname, saleprice, marketprice, costprice, stocknum, weight, unit, isdiscount, ispromotion, details];
  //执行sql语句
  conn.query(sqlStr, sqlparams,(err,result)=>{
    if(err){
      throw err
    }else{
      if (result.affectedRows>0){
        res.json({"isok":true,"message":"商品修改成功"})
      }else{
        res.json({ "isok": false, "message": "商品修改失败" })
      }
    }
  })
})
/* */


module.exports = router;
