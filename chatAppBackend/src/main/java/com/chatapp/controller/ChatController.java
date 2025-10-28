package com.chatapp.controller;

import com.chatapp.etities.Massage;
import com.chatapp.playload.MessageRequest;
import com.chatapp.service.ChatService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Massage sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request){
        return chatService.sendMessage(roomId ,request);
    }

}
