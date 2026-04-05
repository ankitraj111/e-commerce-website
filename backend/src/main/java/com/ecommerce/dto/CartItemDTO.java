package com.ecommerce.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private BigDecimal price;
    private String imageUrl;
    private Integer quantity;
    private BigDecimal totalPrice;
}
