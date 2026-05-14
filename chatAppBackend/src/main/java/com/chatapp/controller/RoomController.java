package com.chatapp.controller;

import com.chatapp.etities.Massage;
import com.chatapp.etities.Room;
import com.chatapp.etities.User;
import com.chatapp.playload.RoomDto;
import com.chatapp.service.RoomService;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    private RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // Create room

    @PostMapping
    public ResponseEntity<RoomDto> createRoom(@RequestBody String roomId , @AuthenticationPrincipal User user){
        RoomDto roomDTO = roomService.createRoom(roomId, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(roomDTO);
    }


    // Get Room
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDto> joinRoom(@PathVariable String roomId , @AuthenticationPrincipal User user){
        RoomDto roomDTO = roomService.joinRoom(roomId, user);
        return ResponseEntity.ok(roomDTO);
    }


    // get massage of rooms
    @GetMapping("/{roomId}/message")
    public ResponseEntity<List<Massage>> getMassage(@PathVariable String roomId ,
                                                    @RequestParam(value = "page" , defaultValue = "0" , required = false) int page ,
                                                    @RequestParam (value = "size" , defaultValue = "20" , required = false) int size
                                                    ){

         return roomService.getMassage(roomId , page , size);
    }

    @GetMapping("/my-rooms")
    public ResponseEntity<List<RoomDto>> getMyRooms(@AuthenticationPrincipal User user) {
        List<RoomDto> myRooms = user.getRooms().stream()
                .map(room -> new RoomDto(room.getRoomId(), room.getOwner().getUsername(), room.getParticipants().size()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(myRooms);
    }
}
