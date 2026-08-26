package com.example.signupbackend.service;

import com.example.signupbackend.dto.RegistrationRequest;
import com.example.signupbackend.entity.Pincode;
import com.example.signupbackend.entity.User;
import com.example.signupbackend.repository.PincodeRepository;
import com.example.signupbackend.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PincodeRepository pincodeRepository;

    public UserService(
            UserRepository userRepository,
            PincodeRepository pincodeRepository
    ) {
        this.userRepository = userRepository;
        this.pincodeRepository = pincodeRepository;
    }

    public User registerUser(RegistrationRequest request) {

        // Validate First Name
        validateFirstName(request.getFirstName());

        // Validate Last Name
        validateLastName(request.getLastName());

        // Validate Email
        validateEmail(request.getEmail());

        // Validate Phone
        validatePhone(request.getPhone());

        // Validate Password
        validatePassword(request.getPassword());

        // Validate Repeat Password
        validateRepeatPassword(
                request.getPassword(),
                request.getRepeatPassword()
        );

        // Validate Pincode
        validatePincode(request.getPincode());

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "Email is already registered."
            );
        }

        // Find pincode from database
        Pincode pincode = pincodeRepository
                .findByPincode(request.getPincode())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid pincode."
                        )
                );

        // Create User
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        // As requested, password is stored directly
        user.setPassword(request.getPassword());

        user.setPincode(pincode.getPincode());

        // Save user to database
        return userRepository.save(user);
    }


    // =========================================================
    // FIRST NAME
    // =========================================================

    private void validateFirstName(String firstName) {

        if (firstName == null ||
                !firstName.matches("[A-Za-z]+")) {

            throw new RuntimeException(
                    "First name must contain alphabets only."
            );
        }
    }


    // =========================================================
    // LAST NAME
    // =========================================================

    private void validateLastName(String lastName) {

        if (lastName == null ||
                !lastName.matches("[A-Za-z]+")) {

            throw new RuntimeException(
                    "Last name must contain alphabets only."
            );
        }
    }


    // =========================================================
    // EMAIL
    // =========================================================

    private void validateEmail(String email) {

        if (email == null ||
                !email.matches(
                        "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
                )) {

            throw new RuntimeException(
                    "Please enter a valid email address."
            );
        }
    }


    // =========================================================
    // PHONE
    // =========================================================

    private void validatePhone(String phone) {

        if (phone == null || phone.isBlank()) {

            throw new RuntimeException(
                    "Phone number is required."
            );
        }

        /*
         * With +
         * Exactly 13 digits after +
         *
         * Example:
         * +9198765432101
         */

        if (phone.startsWith("+")) {

            String digits = phone.substring(1);

            // Only numbers and exactly 13 digits
            if (!digits.matches("[0-9]{13}")) {

                throw new RuntimeException(
                        "Phone number with + must contain exactly 13 digits."
                );
            }

            // Cannot start with 0
            if (digits.startsWith("0")) {

                throw new RuntimeException(
                        "Phone number must not start with 0."
                );
            }

        } else {

            /*
             * Without +
             * Exactly 10 digits
             *
             * Example:
             * 9876543210
             */

            if (!phone.matches("[0-9]{10}")) {

                throw new RuntimeException(
                        "Phone number without + must contain exactly 10 digits."
                );
            }

            // Cannot start with 0
            if (phone.startsWith("0")) {

                throw new RuntimeException(
                        "Phone number must not start with 0."
                );
            }
        }
    }


    // =========================================================
    // PASSWORD
    // =========================================================

    private void validatePassword(String password) {

        // Minimum 6 characters
        if (password == null ||
                password.length() < 6) {

            throw new RuntimeException(
                    "Password must contain at least 6 characters."
            );
        }

        // At least one alphabet
        if (!password.matches(".*[A-Za-z].*")) {

            throw new RuntimeException(
                    "Password must contain at least one alphabet."
            );
        }

        // At least one number
        if (!password.matches(".*[0-9].*")) {

            throw new RuntimeException(
                    "Password must contain at least one number."
            );
        }

        // At least one special character: @ # $ & !
        if (!password.matches(".*[@#$&!].*")) {

            throw new RuntimeException(
                    "Password must contain at least one special character from @#$&!."
            );
        }
    }


    // =========================================================
    // REPEAT PASSWORD
    // =========================================================

    private void validateRepeatPassword(
            String password,
            String repeatPassword
    ) {

        if (password == null ||
                repeatPassword == null ||
                !password.equals(repeatPassword)) {

            throw new RuntimeException(
                    "Passwords do not match."
            );
        }
    }


    // =========================================================
    // PINCODE
    // =========================================================

    private void validatePincode(String pincode) {

        // Must contain exactly 6 digits
        if (pincode == null ||
                !pincode.matches("[0-9]{6}")) {

            throw new RuntimeException(
                    "Pincode must contain exactly 6 digits."
            );
        }

        /*
         * Check whether the pincode exists
         * in the pincodes table.
         */

        if (!pincodeRepository
                .findByPincode(pincode)
                .isPresent()) {

            throw new RuntimeException(
                    "Invalid pincode. Pincode does not exist in database."
            );
        }
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    public User getUserById(Long id) {

        return userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        )
                );
    }
}