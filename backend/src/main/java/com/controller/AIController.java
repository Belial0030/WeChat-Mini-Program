package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.service.AIService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.utils.R;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * AI助手
 * 后端接口
 */
@RestController
@Controller
@RequestMapping("/ai")
public class AIController {
    private static final Logger logger = LoggerFactory.getLogger(AIController.class);

    @Autowired
    private AIService aiService;

    /**
     * AI对话接口
     */
    @RequestMapping("/chat")
    public R chat(@RequestBody Map<String, Object> params, HttpServletRequest request) {
        logger.debug("chat方法:,,params:{}", JSONObject.toJSONString(params));
        try {
            String message = (String) params.get("message");
            if (message == null || message.trim().isEmpty()) {
                return R.error("消息不能为空");
            }
            String reply = aiService.chat(message);
            return R.ok().put("data", reply);
        } catch (Exception e) {
            e.printStackTrace();
            return R.error("AI服务异常: " + e.getMessage());
        }
    }

    /**
     * AI带上下文对话接口
     */
    @RequestMapping("/chatWithContext")
    public R chatWithContext(@RequestBody Map<String, Object> params, HttpServletRequest request) {
        logger.debug("chatWithContext方法:,,params:{}", JSONObject.toJSONString(params));
        try {
            List<Map<String, String>> messages = (List<Map<String, String>>) params.get("messages");
            if (messages == null || messages.isEmpty()) {
                return R.error("消息列表不能为空");
            }
            String reply = aiService.chatWithContext(messages);
            return R.ok().put("data", reply);
        } catch (Exception e) {
            e.printStackTrace();
            return R.error("AI服务异常: " + e.getMessage());
        }
    }
}
