package com.chatapp.controller;

import com.chatapp.playload.LoginResponseDto;
import com.chatapp.playload.LonginRequestDto;
import com.chatapp.playload.SignupResponseDto;
import com.chatapp.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:5173") // ✅ this is okay
public class AuthController {
    final private AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LonginRequestDto longinRequestDto){
        return ResponseEntity.ok(authService.login(longinRequestDto));
    }
    @PostMapping("signup")
    public ResponseEntity<SignupResponseDto> signup(@RequestBody LonginRequestDto signupResponseDto){
        return ResponseEntity.ok(authService.signup(signupResponseDto));
    }
}
