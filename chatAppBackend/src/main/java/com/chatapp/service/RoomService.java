package com.chatapp.service;

import com.chatapp.etities.Massage;
import com.chatapp.etities.Room;
import com.chatapp.repo.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public ResponseEntity<?> createRoom(String roomId) {
        if (roomRepository.findByRoomId(roomId) != null){
            // Room is Already there
            return ResponseEntity.badRequest().body("Room is Already exists");
        }

        Room room = new Room();
        room.setRoomId(roomId);
        roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    public ResponseEntity<?> joinRoom(String roomId) {
        Room room = roomRepository.findByRoomId(roomId);

        if(room == null){
            return ResponseEntity.badRequest().body("Room Not Found");
        }
        return ResponseEntity.ok().body(room);
    }

    public ResponseEntity<List<Massage>> getMassage(String roomId, int page, int size) {
        Room room = roomRepository.findByRoomId(roomId);
        if(room == null){
            return ResponseEntity.badRequest().build();
        }
        List<Massage> massages = room.getMassages();

        int start = Math.max(0 , massages.size() - (page + 1) * size );
        int end = Math.min(massages.size() , start + size);
        List<Massage> paginatedMassage = massages.subList(start, end);

        return ResponseEntity.ok().body(paginatedMassage);
    }
}
