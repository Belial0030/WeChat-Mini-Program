-- Sanitized demonstration database. Import into a NEW empty database only.
-- Fictional accounts and instructional content; no private profiles, sessions or learning histories.
-- Public demo password: ChangeMe-2026! Replace before deployment.
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '配置参数名称',
  `value` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配置参数值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '配置文件' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES (1, '守护账号，从独立密码开始', 'upload/security/account.jpg');
INSERT INTO `config` VALUES (2, '可疑消息，先核实再操作', 'upload/security/phishing.jpg');
INSERT INTO `config` VALUES (3, '重要数据，备份并验证恢复', 'upload/security/backup.jpg');

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dic_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字段',
  `dic_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字段名',
  `code_index` int(11) NULL DEFAULT NULL COMMENT '编码',
  `index_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编码名字  Search111 ',
  `super_id` int(11) NULL DEFAULT NULL COMMENT '父字段id',
  `beizhu` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dictionary
-- ----------------------------
INSERT INTO `dictionary` VALUES (1, 'sex_types', '性别类型', 1, '男', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (2, 'sex_types', '性别类型', 2, '女', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (3, 'zujuan_types', '组卷方式', 1, '自动组卷', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (4, 'zujuan_types', '组卷方式', 2, '手动组卷', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (5, 'kemu_types', '科目', 1, '网络安全基础', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (6, 'kemu_types', '科目', 2, '网络安全综合', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (7, 'exampaper_types', '试卷状态', 1, '启用', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (8, 'exampaper_types', '试卷状态', 2, '禁用', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (9, 'examquestion_types', '试题类型', 1, '单选题', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (10, 'examquestion_types', '试题类型', 2, '多选题', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (11, 'examquestion_types', '试题类型', 3, '判断题', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (12, 'examquestion_types', '试题类型', 4, '填空题', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (13, 'news_types', '公告类型', 1, '学习指引', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (14, 'news_types', '公告类型', 2, '安全提醒', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (15, 'news_types', '公告类型', 3, '实践任务', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (16, 'forum_state_types', '帖子状态', 1, '发帖', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (17, 'forum_state_types', '帖子状态', 2, '回帖', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (18, 'shipin_types', '课程分类', 1, '账号与隐私', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (19, 'shipin_types', '课程分类', 2, '反诈与上网', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (20, 'shipin_types', '课程分类', 3, '设备与数据', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (21, 'xuexizuji_types', '学习状态', 1, '学习中', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (22, 'xuexizuji_types', '学习状态', 2, '异常结束', NULL, NULL, '2026-01-01 09:00:00');
INSERT INTO `dictionary` VALUES (23, 'xuexizuji_types', '学习状态', 3, '正常结束', NULL, NULL, '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for exampaper
-- ----------------------------
DROP TABLE IF EXISTS `exampaper`;
CREATE TABLE `exampaper`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `exampaper_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '试卷名称 Search111',
  `exampaper_date` int(11) NULL DEFAULT NULL COMMENT '考试时长(分钟)',
  `exampaper_myscore` int(20) NOT NULL DEFAULT 0 COMMENT '试卷总分数',
  `kemu_types` int(11) NULL DEFAULT NULL COMMENT '科目 Search111',
  `exampaper_types` int(11) NOT NULL DEFAULT 0 COMMENT '试卷状态 Search111',
  `zujuan_types` int(11) NULL DEFAULT NULL COMMENT '组卷方式',
  `exampaper_delete` int(255) NULL DEFAULT 0 COMMENT '逻辑删除（1代表未删除 2代表已删除）',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 show2 photoShow',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '试卷表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exampaper
-- ----------------------------
INSERT INTO `exampaper` VALUES (3, '网络安全核心知识测评', 10, 100, 2, 1, 2, 1, '2026-01-01 09:00:00');
INSERT INTO `exampaper` VALUES (4, '网络安全综合能力练习', 20, 100, 2, 1, 1, 1, '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for exampapertopic
-- ----------------------------
DROP TABLE IF EXISTS `exampapertopic`;
CREATE TABLE `exampapertopic`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `exampaper_id` int(20) NOT NULL COMMENT '试卷',
  `examquestion_id` int(20) NOT NULL COMMENT '试题',
  `exampapertopic_number` int(20) NOT NULL COMMENT '试题分数',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '试卷选题' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exampapertopic
-- ----------------------------
INSERT INTO `exampapertopic` VALUES (51, 3, 24, 25, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (52, 3, 23, 25, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (53, 3, 22, 25, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (54, 3, 21, 25, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (55, 4, 23, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (56, 4, 24, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (57, 4, 17, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (58, 4, 14, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (59, 4, 19, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (60, 4, 13, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (61, 4, 21, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (62, 4, 18, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (63, 4, 15, 10, '2026-01-01 09:00:00');
INSERT INTO `exampapertopic` VALUES (64, 4, 20, 10, '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for examquestion
-- ----------------------------
DROP TABLE IF EXISTS `examquestion`;
CREATE TABLE `examquestion`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `examquestion_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '试题名称 Search111',
  `kemu_types` int(11) NULL DEFAULT NULL COMMENT '科目 Search111',
  `examquestion_options` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '选项，json字符串',
  `examquestion_answer` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '正确答案',
  `examquestion_analysis` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '答案解析',
  `examquestion_types` int(20) NULL DEFAULT 0 COMMENT '试题类型',
  `examquestion_sequence` int(20) NULL DEFAULT 100 COMMENT '试题排序，值越大排越前面',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '试题表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of examquestion
-- ----------------------------
INSERT INTO `examquestion` VALUES (13, '只要密码足够复杂，就可以在多个网站重复使用同一个密码。', 2, '[{"text":"对","code":"A"},{"text":"错","code":"B"}]', 'B', '密码复用会把多个账号的风险联系起来。一个网站的密码泄露后，其他使用相同密码的账号也可能受到影响。不同账号应使用独立密码。', 3, 1, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (14, '收到自称客服的消息，要求提供登录验证码，最合适的做法是什么？', 2, '[{"text":"对方头像看起来正规，立即提供","code":"A"},{"text":"不提供验证码，自己打开官方应用核实","code":"B"},{"text":"把验证码发到群里请大家判断","code":"C"},{"text":"先提供验证码，再修改密码","code":"D"}]', 'B', '验证码可能用于完成账号登录或其他敏感操作。不要交给陌生人，应通过独立的官方入口核实。', 1, 2, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (15, '为重要文件保留可恢复的独立副本，这项措施称为____。（填写两个汉字）', 2, '[]', '备份', '备份是保留数据副本，以便在误删、设备损坏等情况下恢复。副本应放在独立位置，并定期检查能否恢复。', 4, 3, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (16, '设备闲置时自动锁定屏幕的功能，通常称为自动____。（填写两个汉字）', 2, '[]', '锁屏', '自动锁屏能减少设备无人看管时被直接访问的机会。离开设备时也应主动锁屏。', 4, 4, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (17, '一条“账号即将停用”的短信要求点击链接处理，最安全的核验方式是什么？', 2, '[{"text":"直接点击短信链接登录","code":"A"},{"text":"自行打开已知的官方应用查看通知","code":"B"},{"text":"拨打短信中提供的号码自证身份","code":"C"},{"text":"把密码回复给短信发送者","code":"D"}]', 'B', '可疑消息中的链接和电话也可能由攻击者控制。应使用自己已知的官方应用或自行查找的官方联系方式核实。', 1, 5, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (18, '只要电脑还能正常使用，就可以长期忽略系统和应用的安全更新。', 2, '[{"text":"对","code":"A"},{"text":"错","code":"B"}]', 'B', '正常运行不代表没有已知弱点。通过官方入口及时安装安全更新，有助于修复这些弱点。', 3, 6, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (19, '以下哪些做法有助于减少个人信息暴露？', 2, '[{"text":"根据实际功能需要授予应用权限","code":"A"},{"text":"分享截图前遮挡验证码等敏感信息","code":"B"},{"text":"定期检查社交账号的公开可见范围","code":"C"},{"text":"在讨论区上传完整身份证件供大家核验","code":"D"}]', 'A,B,C', '按需授权、分享前脱敏、管理公开范围，都能减少不必要的信息暴露。完整证件和验证码不应公开展示。', 2, 7, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (20, '让文件从备份副本重新变为可用数据的过程，称为数据____。（填写两个汉字）', 2, '[]', '恢复', '恢复是验证备份是否可用的重要步骤。应把测试文件恢复到新目录核对，避免覆盖唯一原件。', 4, 8, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (21, '如果平台支持多因素认证，开启它通常可以增加账号登录的保护。', 2, '[{"text":"对","code":"A"},{"text":"错","code":"B"}]', 'A', '多因素认证在密码之外增加验证环节，有助于降低密码泄露后的风险。它不能替代对可疑消息和异常登录的警惕。', 3, 9, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (22, '拒绝与当前功能无关的信息访问请求，体现了应用权限应按____授予。（填写“需”或“全”）', 2, '[]', '需', '权限应按需授予，结合实际功能判断定位、相机、麦克风或通讯录等访问是否必要，而不是一次性全部开放。', 4, 10, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (23, '关于备份，哪一种做法更合理？', 2, '[{"text":"只把文件复制到原硬盘的另一个文件夹","code":"A"},{"text":"在独立位置保留副本，并定期进行恢复检查","code":"B"},{"text":"等设备损坏后再开始备份","code":"C"},{"text":"备份完成后就永远不用再检查","code":"D"}]', 'B', '独立副本可以减少同一设备故障的影响，恢复检查能确认备份是否可用。备份频率应结合数据变化和重要程度安排。', 1, 11, '2026-01-01 09:00:00');
INSERT INTO `examquestion` VALUES (24, '在外出场景中需要处理重要账号信息时，应优先选择哪种连接？', 2, '[{"text":"自己可信的网络或个人热点","code":"A"},{"text":"任何名称里写着“免费”的热点","code":"B"},{"text":"信号最强但来源不明的热点","code":"C"},{"text":"要求先提交账号密码的陌生热点页面","code":"D"}]', 'A', '热点名称和信号强度不能证明可信。应优先选择自己可信的网络或个人热点，谨慎处理重要账号信息。', 1, 12, '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for examrecord
-- ----------------------------
DROP TABLE IF EXISTS `examrecord`;
CREATE TABLE `examrecord`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `examrecord_uuid_number` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考试编号',
  `yonghu_id` int(20) NOT NULL COMMENT '考试用户',
  `exampaper_id` int(20) NOT NULL COMMENT '所属试卷id（外键）',
  `total_score` int(200) NULL DEFAULT NULL COMMENT '所得总分',
  `insert_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '考试时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '考试记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of examrecord
-- ----------------------------



-- ----------------------------
-- Table structure for examredetails
-- ----------------------------
DROP TABLE IF EXISTS `examredetails`;
CREATE TABLE `examredetails`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `examredetails_uuid_number` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '试卷编号',
  `yonghu_id` int(20) NOT NULL COMMENT '用户id',
  `examquestion_id` int(20) NOT NULL COMMENT '试题id（外键）',
  `examredetails_myanswer` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考生答案',
  `examredetails_myscore` int(20) NOT NULL DEFAULT 0 COMMENT '试题得分',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '答题详情表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of examredetails
-- ----------------------------









-- ----------------------------
-- Table structure for examrewrongquestion
-- ----------------------------
DROP TABLE IF EXISTS `examrewrongquestion`;
CREATE TABLE `examrewrongquestion`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `yonghu_id` int(20) NOT NULL COMMENT '用户id',
  `exampaper_id` int(20) NOT NULL COMMENT '试卷（外键）',
  `examquestion_id` int(20) NOT NULL COMMENT '试题id（外键）',
  `examredetails_myanswer` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考生作答',
  `insert_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 show3',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '错题表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of examrewrongquestion
-- ----------------------------







-- ----------------------------
-- Table structure for forum
-- ----------------------------
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `forum_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '帖子标题  Search111 ',
  `yonghu_id` int(11) NULL DEFAULT NULL COMMENT '用户',
  `users_id` int(11) NULL DEFAULT NULL COMMENT '管理员',
  `forum_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '发布内容',
  `super_ids` int(11) NULL DEFAULT NULL COMMENT '父id',
  `forum_state_types` int(11) NULL DEFAULT NULL COMMENT '帖子状态',
  `insert_time` timestamp NULL DEFAULT NULL COMMENT '发帖时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间 show2',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '论坛' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forum
-- ----------------------------
INSERT INTO `forum` VALUES (1, '账号换设备后，怎样检查多因素认证和恢复方式？', 1, NULL, '学习账号安全课程后，我准备检查常用邮箱。除了确认多因素认证已开启，还应该核对哪些恢复方式？欢迎分享通用检查步骤，请不要发布真实验证码、恢复码或账号截图。', 325, 1, '2026-01-01 09:00:00', '2026-01-01 09:00:00', '2026-01-01 09:00:00');
INSERT INTO `forum` VALUES (2, '收到“校园邮箱即将停用”的通知，你会怎样核实？', 1, NULL, '这是一道模拟情境题：消息要求立即点击链接并填写密码，否则邮箱将停用。请讨论其中的可疑信号，并写出不依赖消息内链接的核实方法。练习不需要访问任何真实可疑网站。', 37, 1, '2026-01-01 09:00:00', '2026-01-01 09:00:00', '2026-01-01 09:00:00');
INSERT INTO `forum` VALUES (3, '一个简单工具申请通讯录权限，应该怎样判断？', 1, NULL, '我在权限课程中学到按需授权。假设一个只用来照明的工具请求通讯录和定位权限，你会先考虑哪些问题？可以从功能目的、必要性和可替代方式讨论。', 77, 1, '2026-01-01 09:00:00', '2026-01-01 09:00:00', '2026-01-01 09:00:00');
INSERT INTO `forum` VALUES (4, '外出使用网络时，你有哪些安全习惯？', 2, NULL, '欢迎交流你在公共场所处理账号信息时的做法，例如优先使用可信网络或个人热点、不自动连接陌生热点、从官方入口办理业务。请勿分享真实网络密码或个人行程。', 376, 1, '2026-01-01 09:00:00', '2026-01-01 09:00:00', '2026-01-01 09:00:00');
INSERT INTO `forum` VALUES (5, '备份做好之后，怎样确认需要时真的能恢复？', 3, NULL, '课程强调备份还需要恢复检查。我打算用一个不含敏感信息的测试文档练习，应该把它恢复到哪里、核对哪些内容，才能避免误覆盖原件？', 77, 1, '2026-01-01 09:00:00', '2026-01-01 09:00:00', '2026-01-01 09:00:00');
INSERT INTO `forum` VALUES (6, NULL, 1, NULL, '可以把测试文件恢复到一个新建目录，再核对文件是否能打开、内容是否完整。记录恢复位置和时间，不要拿唯一原件做覆盖测试。', 5, 2, '2026-01-01 09:00:00', NULL, '2026-01-01 09:00:00');
INSERT INTO `forum` VALUES (7, NULL, NULL, 1, '补充：备份副本应放在独立位置，敏感资料的副本也要保护。离线设备不用时断开连接，并根据文件变化定期更新备份与检查恢复结果。', 5, 2, '2026-01-01 09:00:00', NULL, '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `news_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告信息标题  Search111 ',
  `news_types` int(11) NULL DEFAULT NULL COMMENT '公告类型  Search111 ',
  `news_photo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告信息图片',
  `insert_time` timestamp NULL DEFAULT NULL COMMENT '添加时间',
  `news_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '公告信息详情',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间 show1 show2 nameShow',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '公告信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1, '学习指引：从五个安全习惯开始', 1, 'upload/security/account.jpg', '2026-01-01 09:00:00', '<h3>本期提示</h3><p>每天花一点时间，把安全知识变成可以执行的习惯。</p><h3>学习要点</h3><ul><li>先学习账号安全，检查独立密码与多因素认证。</li><li>再学习识别网络钓鱼，练习通过官方渠道核实消息。</li><li>检查应用权限、设备更新与重要文件备份。</li><li>学完后进入网络安全测评，结合解析复习薄弱知识点。</li></ul><h3>行动建议</h3><p>建议先完成一节微课和一项实践任务，再参加测评。讨论时只分享脱敏后的学习结论。</p>', '2026-01-01 09:00:00');
INSERT INTO `news` VALUES (2, '安全提醒：遇到“账号异常”消息先独立核实', 2, 'upload/security/phishing.jpg', '2026-01-01 09:00:00', '<h3>本期提示</h3><p>熟悉的头像、紧迫的话术和相似的页面，都不能单独证明消息真实。</p><h3>学习要点</h3><ul><li>不要被“限时处理”“立即停用”等话术催促。</li><li>不向消息发送者提供密码、验证码或恢复码。</li><li>自己打开已知的官方应用，或自行查找官方联系方式核实。</li><li>如果已经泄露密码，及时从可信设备进入官方入口修改，并检查账号活动。</li></ul><h3>行动建议</h3><p>练习：写下一个常用服务的官方核验入口，不必提交账号信息。</p>', '2026-01-01 09:00:00');
INSERT INTO `news` VALUES (3, '实践任务：做一次应用权限与隐私检查', 3, 'upload/security/privacy.jpg', '2026-01-01 09:00:00', '<h3>本期提示</h3><p>权限设置应服务于正在使用的功能，而不是越多越好。</p><h3>学习要点</h3><ul><li>选择三个常用应用，分别记录它们的实际用途。</li><li>检查定位、相机、麦克风和通讯录等权限是否必要。</li><li>查看锁屏通知预览以及社交账号的公开可见范围。</li><li>关闭不需要的权限，清理长期不使用的应用。</li></ul><h3>行动建议</h3><p>在学习讨论区分享检查方法即可，不上传真实聊天记录、验证码或完整证件。</p>', '2026-01-01 09:00:00');
INSERT INTO `news` VALUES (4, '安全提醒：通过官方入口安装系统和应用更新', 2, 'upload/security/devices.jpg', '2026-01-01 09:00:00', '<h3>本期提示</h3><p>更新不只是获得新功能，也可能修复已经发现的安全弱点。</p><h3>学习要点</h3><ul><li>从设备设置、官方应用商店或软件的官方入口检查更新。</li><li>对陌生网页弹出的“紧急更新包”保持警惕。</li><li>确认设备开启自动锁屏，离开时主动锁定。</li><li>有家庭路由器管理权限的学习者，可同时检查路由器固件与默认管理密码。</li></ul><h3>行动建议</h3><p>今天检查一台自己的设备，记录更新状态与自动锁屏设置。</p>', '2026-01-01 09:00:00');
INSERT INTO `news` VALUES (5, '实践任务：完成一次备份与恢复检查', 3, 'upload/security/backup.jpg', '2026-01-01 09:00:00', '<h3>本期提示</h3><p>备份的价值在于需要时能够恢复，而不只是多出一个文件。</p><h3>学习要点</h3><ul><li>选择一份不含敏感信息的测试文档。</li><li>在外部存储或可信云服务中建立独立副本。</li><li>将测试文件恢复到新目录，核对内容是否完整。</li><li>记录检查结果；离线备份设备不用时断开连接。</li></ul><h3>行动建议</h3><p>不要覆盖唯一原件，也不要在公开讨论区分享备份中包含的个人信息。</p>', '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for shipin
-- ----------------------------
DROP TABLE IF EXISTS `shipin`;
CREATE TABLE `shipin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `shipin_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '视频标题 Search111',
  `shipin_photo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '视频照片',
  `shipin_video` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '视频',
  `shipin_types` int(11) NULL DEFAULT NULL COMMENT '视频类型 Search111',
  `shipin_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备课详情',
  `insert_time` timestamp NULL DEFAULT NULL COMMENT '添加时间',
  `shipin_delete` int(11) NULL DEFAULT NULL COMMENT '逻辑删除',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间  show1 show2 photoShow',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '视频信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shipin
-- ----------------------------
INSERT INTO `shipin` VALUES (1, '账号安全：独立密码与多因素认证', 'upload/security/account.jpg', 'upload/security/account.mp4', 1, '<h3>学习目标</h3><p>能够解释密码复用的风险，并为重要账号完成一次安全设置检查。</p><h3>本课要点</h3><ul><li>不同账号使用不同密码，避免一个账号泄露后牵连其他账号。</li><li>使用可信的密码管理器生成、保存较长且难猜的密码，不用生日或手机号代替密码。</li><li>为邮箱等重要账号开启多因素认证；验证码、恢复码和登录批准都不能交给陌生人。</li><li>收到未经本人发起的登录批准请求时，不要同意，先通过官方入口核实。</li></ul><h3>动手练习</h3><p>选择一个常用账号，通过官方应用检查密码是否独立、多因素认证是否开启、恢复方式是否仍有效。不要在讨论区提交真实密码或验证码。</p><h3>课后自测</h3><p>同一个复杂密码可以在所有网站反复使用吗？不可以，泄露后仍可能产生连锁风险。</p>', '2026-01-01 09:00:00', 1, '2026-01-01 09:00:00');
INSERT INTO `shipin` VALUES (2, '识别网络钓鱼：遇到可疑消息先核实', 'upload/security/phishing.jpg', 'upload/security/phishing.mp4', 2, '<h3>学习目标</h3><p>能够在点击链接或打开附件前，识别常见的可疑信号并选择安全的核验方式。</p><h3>本课要点</h3><ul><li>“账号即将停用”“退款限时领取”等话术可能制造紧迫感，不要被倒计时催着操作。</li><li>显示名称、头像和页面样式都可能被仿冒，应核对实际来源，而不是只看外观。</li><li>不要直接使用可疑消息里的链接、电话或附件；自己打开已知的官方应用或查找官方联系方式。</li><li>发现可疑消息可使用平台举报功能；如果已经泄露密码，应从可信设备进入官方入口修改密码并检查账号活动。</li></ul><h3>动手练习</h3><p>用一条不含个人信息的模拟短信，标出催促话术、敏感信息请求和核验渠道。不要点击真实可疑链接进行练习。</p><h3>课后自测</h3><p>消息里使用了熟悉机构的头像，是否就能信任？不能，头像和显示名称都可能被仿冒。</p>', '2026-01-01 09:00:00', 1, '2026-01-01 09:00:00');
INSERT INTO `shipin` VALUES (3, '个人信息保护：权限只给必要的', 'upload/security/privacy.jpg', 'upload/security/privacy.mp4', 1, '<h3>学习目标</h3><p>能够检查常用应用的权限，识别与服务目的无关的信息请求。</p><h3>本课要点</h3><ul><li>安装应用后按实际用途授予权限，不因为弹窗催促就一次性开放所有权限。</li><li>定位、相机、麦克风和通讯录等权限，应结合正在使用的功能判断是否必要。</li><li>检查锁屏通知和社交账号的可见范围，避免公开验证码、完整证件、住址或行程等敏感内容。</li><li>对不再使用的应用进行清理，并通过系统设置检查仍在保留的权限。</li></ul><h3>动手练习</h3><p>选择三个常用应用，记录用途、申请的权限及是否必要。只分享脱敏后的检查结论，不上传真实证件或聊天记录。</p><h3>课后自测</h3><p>手电筒功能要求访问通讯录时，应直接同意吗？应先判断必要性，并考虑拒绝或选择其他可信工具。</p>', '2026-01-01 09:00:00', 1, '2026-01-01 09:00:00');
INSERT INTO `shipin` VALUES (4, '设备与网络安全：更新、锁屏与可信连接', 'upload/security/devices.jpg', 'upload/security/devices.mp4', 3, '<h3>学习目标</h3><p>能够完成设备更新检查，并识别公共网络和陌生下载带来的风险。</p><h3>本课要点</h3><ul><li>从系统或应用的官方入口安装更新；安全更新有助于修复已知弱点。</li><li>设置自动锁屏，离开设备时主动锁屏，只从可信来源安装应用和获取文件。</li><li>为家庭路由器更换默认管理密码，保持固件更新，并使用设备支持的较强无线加密方式。</li><li>公共网络环境下尽量使用可信网络或个人热点，不随意连接名称相似的热点，不在陌生页面提交重要账号信息。</li></ul><h3>动手练习</h3><p>检查一台自己的设备是否有待安装更新，确认自动锁屏已启用，再查看家庭路由器的更新状态。不要修改不属于自己的设备设置。</p><h3>课后自测</h3><p>电脑能正常使用，是否就可以长期忽略安全更新？不可以，正常运行并不能说明不存在已知弱点。</p>', '2026-01-01 09:00:00', 1, '2026-01-01 09:00:00');
INSERT INTO `shipin` VALUES (5, '数据备份与恢复：让重要文件有退路', 'upload/security/backup.jpg', 'upload/security/backup.mp4', 3, '<h3>学习目标</h3><p>能够为一份重要文件建立备份，并在安全位置完成一次恢复检查。</p><h3>本课要点</h3><ul><li>先列出不可轻易重建的数据，例如学习资料、照片和工作文档，再决定备份频率。</li><li>将副本存放在独立位置；移动硬盘、可信云服务或两者结合，都可以作为备份方案的一部分。</li><li>离线备份设备在不使用时断开连接，备份中的敏感信息也需要妥善保护。</li><li>定期把一个测试文件恢复到新目录并核对内容；存在一个备份文件并不等于一定能够恢复。</li></ul><h3>动手练习</h3><p>选择一份不含敏感信息的测试文档，建立独立副本，再恢复到另一个目录核对。不要用唯一原件做覆盖测试。</p><h3>课后自测</h3><p>只把文件复制到同一块硬盘的另一个文件夹，能完全应对硬盘损坏吗？不能，应保留独立位置的副本。</p>', '2026-01-01 09:00:00', 1, '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `tablename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '表名',
  `role` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色',
  `token` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '新增时间',
  `expiratedtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '过期时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'token表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token
-- ----------------------------



-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `role` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '管理员' COMMENT '角色',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '新增时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'demo-admin', 'ChangeMe-2026!', '管理员', '2026-01-01 09:00:00');

-- ----------------------------
-- Table structure for xuexizuji
-- ----------------------------
DROP TABLE IF EXISTS `xuexizuji`;
CREATE TABLE `xuexizuji`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `shipin_id` int(11) NULL DEFAULT NULL COMMENT '视频',
  `yonghu_id` int(11) NULL DEFAULT NULL COMMENT '用户',
  `xuexizuji_time` timestamp NULL DEFAULT NULL COMMENT '开始时间',
  `xuexizuji_types` int(11) NULL DEFAULT NULL COMMENT '学习状态 Search111',
  `insert_time` timestamp NULL DEFAULT NULL COMMENT '添加时间',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间  show3 listShow',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '学习足迹' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xuexizuji
-- ----------------------------





-- ----------------------------
-- Table structure for yonghu
-- ----------------------------
DROP TABLE IF EXISTS `yonghu`;
CREATE TABLE `yonghu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账户',
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `yonghu_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名 Search111 ',
  `yonghu_phone` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `yonghu_id_number` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户身份证号',
  `yonghu_photo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `sex_types` int(11) NULL DEFAULT NULL COMMENT '性别 Search111',
  `xuexi_number` int(11) NULL DEFAULT NULL COMMENT '学习时长',
  `yonghu_email` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电子邮箱',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yonghu
-- ----------------------------
INSERT INTO `yonghu` VALUES (1, 'demo-user-1', 'ChangeMe-2026!', '演示学员1', NULL, NULL, 'upload/security/avatar-1.png', 1, 0, NULL, '2026-01-01 09:00:00');
INSERT INTO `yonghu` VALUES (2, 'demo-user-2', 'ChangeMe-2026!', '演示学员2', NULL, NULL, 'upload/security/avatar-2.png', 2, 0, NULL, '2026-01-01 09:00:00');
INSERT INTO `yonghu` VALUES (3, 'demo-user-3', 'ChangeMe-2026!', '演示学员3', NULL, NULL, 'upload/security/avatar-3.png', 2, 0, NULL, '2026-01-01 09:00:00');

SET FOREIGN_KEY_CHECKS = 1;
