package com.chatapp.etities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rooms")
public class Room {

    private String id;
    private String roomId;
    @DBRef      // reference to the user who owns this room
    private User owner;
    @DBRef(lazy = true)
    private List<User> participants = new ArrayList<>(); // users in the room
    List<Massage> massages = new ArrayList<>();
}
