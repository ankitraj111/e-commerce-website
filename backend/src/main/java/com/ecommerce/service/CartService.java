package com.ecommerce.service;

import com.ecommerce.dto.CartItemDTO;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public CartItemDTO addToCart(Long userId, Long productId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(CartItem.builder()
                        .user(user)
                        .product(product)
                        .quantity(0)
                        .build());

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItem = cartItemRepository.save(cartItem);

        return toCartItemDTO(cartItem);
    }

    public List<CartItemDTO> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId)
                .stream()
                .map(this::toCartItemDTO)
                .collect(Collectors.toList());
    }

    public void removeFromCart(Long userId, Long productId) {
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    public CartItemDTO updateCartItem(Long userId, Long productId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        cartItem.setQuantity(quantity);
        cartItem = cartItemRepository.save(cartItem);

        return toCartItemDTO(cartItem);
    }

    private CartItemDTO toCartItemDTO(CartItem cartItem) {
        Product product = cartItem.getProduct();
        BigDecimal totalPrice = product.getDiscountedPrice().multiply(new BigDecimal(cartItem.getQuantity()));

        return CartItemDTO.builder()
                .id(cartItem.getId())
                .productId(product.getId())
                .productName(product.getName())
                .price(product.getDiscountedPrice())
                .imageUrl(product.getImageUrl())
                .quantity(cartItem.getQuantity())
                .totalPrice(totalPrice)
                .build();
    }
}
