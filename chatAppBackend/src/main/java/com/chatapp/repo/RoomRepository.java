package com.chatapp.repo;

import com.chatapp.etities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends MongoRepository<Room , String> {

    // get Room by roomId
    Room findByRoomId(String roomId);
}
