package com.ssafy.ssafit.app.user.repository;

import com.ssafy.ssafit.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
    User findByIdAndPassword(String id, String password);
    User findByEmail(String email);
}
