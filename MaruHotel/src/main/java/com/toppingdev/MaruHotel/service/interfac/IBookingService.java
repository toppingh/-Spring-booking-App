package com.toppingdev.MaruHotel.service.interfac;

import com.toppingdev.MaruHotel.dto.Response;
import com.toppingdev.MaruHotel.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
