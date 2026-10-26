package com.service;

import java.util.List;
import java.util.Map;

/**
 * AI服务接口
 */
public interface AIService {

    /**
     * 发送消息到AI并获取回复
     * @param message 用户消息
     * @return AI回复内容
     */
    String chat(String message);

    /**
     * 发送带上下文的对话
     * @param messages 消息列表，包含角色和内容
     * @return AI回复内容
     */
    String chatWithContext(List<Map<String, String>> messages);
}
