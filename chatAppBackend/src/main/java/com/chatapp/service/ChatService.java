package com.chatapp.service;

import com.chatapp.etities.Massage;
import com.chatapp.etities.Room;
import com.chatapp.playload.MessageRequest;
import com.chatapp.repo.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Service
public class ChatService {

    private RoomRepository roomRepository;

    public ChatService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }


    public Massage sendMessage(String roomId, MessageRequest request) {
        Room room = roomRepository.findByRoomId(request.getRoomId());

        Massage massage = new Massage();

        massage.setContent(request.getContent());
        massage.setSender(request.getSender());
        massage.setTimeStamp(LocalDateTime.now());

        if (room != null){
            room.getMassages().add(massage);
            roomRepository.save(room);
        }else {
            throw  new RuntimeException("Room not found");
        }

        return massage;
    }
}
