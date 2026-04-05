package com.ecommerce.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private String orderNumber;
    private BigDecimal totalPrice;
    private BigDecimal discountAmount;
    private BigDecimal taxAmount;
    private String paymentMethod;
    private String paymentStatus;
    private String orderStatus;
    private AddressDTO shippingAddress;
    private List<OrderItemDTO> orderItems;
    private LocalDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDTO {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal totalPrice;
    }
}
