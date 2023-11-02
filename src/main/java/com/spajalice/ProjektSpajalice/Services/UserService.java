package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.Role;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public Optional<List<User>> getAllOrganisers(){
        return userRepository.findByRole(Role.ORGANIZER);
    }

}
