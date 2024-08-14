package com.toppingdev.MaruHotel.service.interfac;

import com.toppingdev.MaruHotel.dto.LoginRequest;
import com.toppingdev.MaruHotel.dto.Response;
import com.toppingdev.MaruHotel.entity.User;

public interface IUserService {

    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);

}
