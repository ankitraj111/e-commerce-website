package com.ecommerce.service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findByIsActiveTrue(pageable)
                .map(this::toProductDTO);
    }

    public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable)
                .map(this::toProductDTO);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return toProductDTO(product);
    }

    private ProductDTO toProductDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPercent(product.getDiscountPercent())
                .discountedPrice(product.getDiscountedPrice())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .rating(product.getRating())
                .isActive(product.getIsActive())
                .isInStock(product.isInStock())
                .build();
    }
}
