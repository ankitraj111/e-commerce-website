package com.ecommerce.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private Long categoryId;
    private String categoryName;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPercent;
    private Integer stockQuantity;
    private String imageUrl;
    private BigDecimal rating;
    private Boolean isActive;
    private BigDecimal discountedPrice;
    private Boolean isInStock;
}
