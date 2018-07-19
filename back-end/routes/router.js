var express = require('express');
var goods = require('../controls/goods');
var user = require('../controls/user');
var api = require('../api');
var upload = require('../utils/upload');
var service = require('../controls/service');


var router = express.Router();

router.get('/test', service.selectAll);
router.post('/login', service.login);
router.post('/search', service.search);
router.post('/resetpwd', service.resetPwd);
router.post('/resetexpiretime', service.resetExpiretime);
router.post('/resetagentcount', service.resetAgentcount);
router.get('/gettodayreg', service.getTodayReg);

// goods
//router.get(api.test, res.json({code: 200, msg: 'ok', goods: rows}));
router.get(api.goodsList, goods.fetchAll);

router.post(api.goodsDetail, goods.fetchById);
router.post(api.goodsAdd, goods.addOne);
router.post(api.goodsDelete, goods.deleteOne);
router.post(api.goodsDeleteMulti, goods.deleteMulti);
router.post(api.goodsUploadImg, upload.single('avatar'),goods.uploadGoodsImg); // 图片上传

// user
router.get(api.userList, user.fetchAll);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限

module.exports = router;