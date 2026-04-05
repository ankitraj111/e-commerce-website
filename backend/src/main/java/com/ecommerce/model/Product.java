package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "discount_percent", columnDefinition = "DECIMAL(5,2) DEFAULT 0")
    private BigDecimal discountPercent;

    @Column(name = "stock_quantity", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer stockQuantity;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(columnDefinition = "DECIMAL(3,2) DEFAULT 0")
    private BigDecimal rating;

    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean isActive;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        isActive = true;
        if (discountPercent == null) {
            discountPercent = BigDecimal.ZERO;
        }
        if (rating == null) {
            rating = BigDecimal.ZERO;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public BigDecimal getDiscountedPrice() {
        if (discountPercent.compareTo(BigDecimal.ZERO) > 0) {
            return price.multiply(BigDecimal.ONE.subtract(discountPercent.divide(new BigDecimal(100))));
        }
        return price;
    }

    public boolean isInStock() {
        return stockQuantity != null && stockQuantity > 0;
    }
}
