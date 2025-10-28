package com.chatapp.controller;

import com.chatapp.etities.Massage;
import com.chatapp.service.RoomService;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        return roomService.createRoom(roomId);
    }


    // Get Room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){
        return roomService.joinRoom(roomId);
    }


    // get massage of rooms
    @GetMapping("/{roomId}/message")
    public ResponseEntity<List<Massage>> getMassage(@PathVariable String roomId ,
                                                    @RequestParam(value = "page" , defaultValue = "0" , required = false) int page ,
                                                    @RequestParam (value = "size" , defaultValue = "20" , required = false) int size
                                                    ){

         return roomService.getMassage(roomId , page , size);
    }
}
