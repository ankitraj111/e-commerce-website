package com.ecommerce.controller;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@CrossOrigin
public class PaymentController {
    @Value("${stripe.api-key}")
    private String stripeApiKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest request) {
        try {
            Stripe.apiKey = stripeApiKey;

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) (request.getAmount() * 100)) // Amount in cents
                    .setCurrency("usd")
                    .setDescription(request.getDescription())
                    .putMetadata("orderId", request.getOrderId())
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            return ResponseEntity.ok(new PaymentResponse(
                    paymentIntent.getId(),
                    paymentIntent.getClientSecret(),
                    paymentIntent.getStatus()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Payment processing failed: " + e.getMessage()));
        }
    }

    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(@RequestBody ConfirmPaymentRequest request) {
        try {
            Stripe.apiKey = stripeApiKey;

            PaymentIntent paymentIntent = PaymentIntent.retrieve(request.getPaymentIntentId());

            if (paymentIntent.getStatus().equals("succeeded")) {
                // Update order status in database
                return ResponseEntity.ok(new PaymentResponse(
                        paymentIntent.getId(),
                        paymentIntent.getClientSecret(),
                        paymentIntent.getStatus()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse("Payment not completed"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Payment confirmation failed: " + e.getMessage()));
        }
    }

    @Data
    @AllArgsConstructor
    public static class PaymentRequest {
        private double amount;
        private String currency;
        private String description;
        private String orderId;
    }

    @Data
    @AllArgsConstructor
    public static class ConfirmPaymentRequest {
        private String paymentIntentId;
    }

    @Data
    @AllArgsConstructor
    public static class PaymentResponse {
        private String paymentIntentId;
        private String clientSecret;
        private String status;
    }

    @Data
    @AllArgsConstructor
    public static class ErrorResponse {
        private String error;
    }
}
