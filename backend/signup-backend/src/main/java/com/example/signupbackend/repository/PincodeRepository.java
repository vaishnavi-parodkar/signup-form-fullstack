package com.example.signupbackend.repository;

import com.example.signupbackend.entity.Pincode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PincodeRepository
        extends JpaRepository<Pincode, Long> {

    Optional<Pincode> findByPincode(String pincode);
}