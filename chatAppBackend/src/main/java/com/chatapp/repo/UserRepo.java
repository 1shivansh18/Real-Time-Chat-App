package com.chatapp.repo;

import com.chatapp.etities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User,String> {

    Optional<User> findByUsername(String username);
}
