package com.toppingdev.MaruHotel.service.interfac;

import com.toppingdev.MaruHotel.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {

    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description);

    List<String> getAllRoomTypes();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(MultipartFile photo, Long roomId, String roomType, BigDecimal roomPrice, String description);

    Response getRoombyId(Long roomId);

    Response getAvailableRoomByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Response getAllAvailableRooms();
}
