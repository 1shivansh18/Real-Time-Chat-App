package com.chatapp.service;

import com.chatapp.etities.Massage;
import com.chatapp.etities.Room;
import com.chatapp.etities.User;
import com.chatapp.playload.RoomDto;
import com.chatapp.repo.RoomRepository;
import com.chatapp.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepo userRepo;


    public RoomDto createRoom(String roomId , User user) {
        if (roomRepository.findByRoomId(roomId) != null){
            // Room is Already there
            throw  new IllegalArgumentException("Room is Already exists");
        }

        Room room = new Room();
        room.setRoomId(roomId);
        room.setOwner(user);
        roomRepository.save(room);

        if (user.getRooms() != null){
            user.getRooms().add(room);
        }else {
            List<Room> rooms = new ArrayList<>();
            rooms.add(room);
            user.setRooms(rooms);
        }
        userRepo.save(user);
        return new RoomDto(room.getRoomId() , user.getUsername() , 0);
    }

    public RoomDto joinRoom(String roomId , User user) {
        Room room = roomRepository.findByRoomId(roomId);

        if(room == null){
            throw new IllegalArgumentException("Room Not Found");
        }

        if(room.getParticipants() == null){
            room.setParticipants(new ArrayList<>());
        }
        if(!room.getParticipants().contains(user)){
            room.getParticipants().add(user);
            roomRepository.save(room);
        }

        if(user.getRooms() == null){
            user.setRooms(new ArrayList<>());
        }
        if(!user.getRooms().contains(room)){
            user.getRooms().add(room);
            userRepo.save(user);
        }
        int participantCount = room.getParticipants().size();
        return new RoomDto(room.getRoomId(),user.getUsername(),participantCount);
    }

//    public ResponseEntity<List<Massage>> getMassage(String roomId, int page, int size) {
//        Room room = roomRepository.findByRoomId(roomId);
//        if(room == null){
//            return ResponseEntity.badRequest().build();
//        }
//        List<Massage> massages = room.getMassages();
//
//        int start = Math.max(0 , massages.size() - (page + 1) * size );
//        int end = Math.min(massages.size() , start + size);
//        List<Massage> paginatedMassage = massages.subList(start, end);
//
//        return ResponseEntity.ok().body(paginatedMassage);
//    }
public ResponseEntity<List<Massage>> getMassage(String roomId, int page, int size) {
    Room room = roomRepository.findByRoomId(roomId);
    if (room == null) return ResponseEntity.badRequest().build();

    List<Massage> massages = room.getMassages();
    int total = massages.size();

    // reverse pagination: last messages first
    int start = total - (page + 1) * size;
    if (start < 0) start = 0;

    int end = total - page * size;
    if (end > total) end = total;

    if (start >= end) {
        return ResponseEntity.ok(Collections.emptyList()); // page out of range
    }

    List<Massage> paginated = massages.subList(start, end);
    return ResponseEntity.ok(paginated);
}

}
