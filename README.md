一：vue_cli
src\views\Works.vue
src\views\Statistics.vue
src\views\Contract.vue

下面三个文件是将seedata替换成了seeall
src\views\Integrate.vue
src\views\Enterprise.vue
src\views\Customer.vue



二：uniapp_cli
src\common\js\common.js
src\pages\myContractDetails\myContractDetails.vue
src\pages\sign\sign.vue

下面都是改时间
src\pages\internal\internal.vue
src\pages\loan\loan.vue
src\pages\enterprise\enterprise.vue



三：koa_cli
models\users.js //添加了seeall: String, //全部客户
controller\index.js // 93行给超级账号添加了seeall字段  "seeall":"是", //全部客户，改了抵押显示问题 440行
app.js //添加了api拦截规则
routes\Mobile\vipUser.js //更改了时间规则



四：vue_pc
src\request\api.js //主要是加了浏览量统计
src\views\Index.vue


开发情况：


全局替换金融客服为客服经理
全局替换大数据权限为客户查询，移动端也替换为客户查询

koa全局替换 14个地方   toLocaleString   toLocaleDateString
new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(2)

`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`
`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`


全局替换电话判断规则
/^1[3|4|5|7|8]\d{9}$/
/^1[3|4|5|6|7|8|9]\d{9}$/

