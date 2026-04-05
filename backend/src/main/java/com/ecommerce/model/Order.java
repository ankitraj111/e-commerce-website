package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "discount_amount", columnDefinition = "DECIMAL(10,2) DEFAULT 0")
    private BigDecimal discountAmount;

    @Column(name = "tax_amount", columnDefinition = "DECIMAL(10,2) DEFAULT 0")
    private BigDecimal taxAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_address_id")
    private Address shippingAddress;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "payment_status", columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private String paymentStatus;

    @Column(name = "order_status", columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private String orderStatus;

    @Column(name = "stripe_payment_id")
    private String stripePaymentId;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (paymentStatus == null) {
            paymentStatus = "PENDING";
        }
        if (orderStatus == null) {
            orderStatus = "PENDING";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
