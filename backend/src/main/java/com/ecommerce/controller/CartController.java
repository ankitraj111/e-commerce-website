package com.ecommerce.controller;

import com.ecommerce.dto.CartItemDTO;
import com.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // In a real scenario, extract user ID from JWT token
        return 1L; // Placeholder - implement proper user extraction
    }

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCart() {
        return ResponseEntity.ok(cartService.getCartItems(getCurrentUserId()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItemDTO> addToCart(
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cartService.addToCart(getCurrentUserId(), productId, quantity));
    }

    @PutMapping("/update")
    public ResponseEntity<CartItemDTO> updateCartItem(
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(getCurrentUserId(), productId, quantity));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId) {
        cartService.removeFromCart(getCurrentUserId(), productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart(getCurrentUserId());
        return ResponseEntity.noContent().build();
    }
}
