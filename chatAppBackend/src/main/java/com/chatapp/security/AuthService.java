package com.chatapp.security;

import com.chatapp.etities.User;
import com.chatapp.playload.LoginResponseDto;
import com.chatapp.playload.LonginRequestDto;
import com.chatapp.playload.SignupResponseDto;
import com.chatapp.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDto login(LonginRequestDto longinRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(longinRequestDto.getUsername() , longinRequestDto.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = authUtil.generateAccessToken(user);

        return new LoginResponseDto(token , user.getId());
    }

    public SignupResponseDto signup(LonginRequestDto signupResponseDto) {
        User user = userRepo.findByUsername(signupResponseDto.getUsername()).orElse(null);

        if(user != null) throw new IllegalArgumentException("User Already Exists");

        user = userRepo.save(User.builder()
                .username(signupResponseDto.getUsername())
                .password(passwordEncoder.encode(signupResponseDto.getPassword()))
                .build()
        );

        return new SignupResponseDto(user.getId(),user.getUsername());
    }
}
