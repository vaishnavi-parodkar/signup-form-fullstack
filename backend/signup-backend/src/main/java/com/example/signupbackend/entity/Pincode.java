package com.example.signupbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pincodes")
public class Pincode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String pincode;

    public Pincode() {
    }

    public Pincode(String pincode) {
        this.pincode = pincode;
    }

    public Long getId() {
        return id;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
}