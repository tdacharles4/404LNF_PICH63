package com.mixa.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mixa.ecommerce.model.Products;

public interface ProductsRepository extends JpaRepository<Products,Long> {
}
