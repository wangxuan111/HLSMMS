//引入mysql模块
const mysql = require('mysql');
//数据库连接配置
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hlsmms"
});
//打开数据库连接
conn.connect(err => {
    if (err) {
        console.log("数据库连接失败", err.message);
    } else {
        console.log("数据库连接成功")
    }
})


//暴露模块
module.exports=conn;