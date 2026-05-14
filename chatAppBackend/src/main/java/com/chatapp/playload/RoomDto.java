package com.chatapp.playload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private String roomId;
    private String ownerUsername;
    private int participantsCount;
}
