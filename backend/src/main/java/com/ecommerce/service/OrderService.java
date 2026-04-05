package com.ecommerce.service;

import com.ecommerce.dto.OrderDTO;
import com.ecommerce.model.*;
import com.ecommerce.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public OrderDTO createOrder(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> {
                    Product product = cartItem.getProduct();
                    BigDecimal unitPrice = product.getDiscountedPrice();
                    BigDecimal itemTotal = unitPrice.multiply(new BigDecimal(cartItem.getQuantity()));

                    return OrderItem.builder()
                            .product(product)
                            .quantity(cartItem.getQuantity())
                            .unitPrice(unitPrice)
                            .totalPrice(itemTotal)
                            .build();
                })
                .collect(Collectors.toList());

        for (OrderItem item : orderItems) {
            totalPrice = totalPrice.add(item.getTotalPrice());
        }

        String orderNumber = "ORD-" + System.currentTimeMillis();
        Order order = Order.builder()
                .user(user)
                .orderNumber(orderNumber)
                .totalPrice(totalPrice)
                .discountAmount(BigDecimal.ZERO)
                .taxAmount(BigDecimal.ZERO)
                .shippingAddress(address)
                .paymentMethod("PENDING")
                .paymentStatus("PENDING")
                .orderStatus("PENDING")
                .build();

        order = orderRepository.save(order);

        for (OrderItem item : orderItems) {
            item.setOrder(order);
        }

        order.setOrderItems(orderItems);
        order = orderRepository.save(order);

        cartItemRepository.deleteByUserId(userId);

        return toOrderDTO(order);
    }

    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return toOrderDTO(order);
    }

    public Page<OrderDTO> getUserOrders(Long userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable)
                .map(this::toOrderDTO);
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status);
        order = orderRepository.save(order);
        return toOrderDTO(order);
    }

    @Transactional
    public OrderDTO updatePaymentStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setPaymentStatus(status);
        order = orderRepository.save(order);
        return toOrderDTO(order);
    }

    private OrderDTO toOrderDTO(Order order) {
        List<OrderDTO.OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(item -> OrderDTO.OrderItemDTO.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .totalPrice(item.getTotalPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderDTO.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .totalPrice(order.getTotalPrice())
                .discountAmount(order.getDiscountAmount())
                .taxAmount(order.getTaxAmount())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .orderItems(itemDTOs)
                .createdAt(order.getCreatedAt())
                .build();
    }
}
