/*
Navicat MySQL Data Transfer

Source Server         : wf
Source Server Version : 50718
Source Host           : 39.108.4.6:3306
Source Database       : vue_admin

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-05-14 23:29:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_account
-- ----------------------------
DROP TABLE IF EXISTS `tb_account`;
CREATE TABLE `tb_account` (
  `a_pid` int(10) unsigned NOT NULL,
  `a_account` varchar(32) NOT NULL DEFAULT '',
  `a_telephone` varchar(32) NOT NULL DEFAULT '',
  `a_password` blob NOT NULL,
  `a_areaid` int(10) unsigned NOT NULL DEFAULT '0',
  `a_expiretime` int(10) NOT NULL DEFAULT '0',
  `a_agentcount` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`a_pid`),
  KEY `a_account` (`a_account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_account
-- ----------------------------


-- ----------------------------
-- Table structure for tb_register
-- ----------------------------
DROP TABLE IF EXISTS `tb_register`;
CREATE TABLE `tb_register` (
  `r_account` varchar(32) NOT NULL COMMENT '该表用来记录玩家的注册时的信息',
  `r_ip` varchar(32) NOT NULL,
  `r_mac` varchar(32) NOT NULL,
  `r_regtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`r_account`),
  KEY `Index_2` (`r_regtime`,`r_ip`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of tb_register
-- ----------------------------

SET FOREIGN_KEY_CHECKS=1;
