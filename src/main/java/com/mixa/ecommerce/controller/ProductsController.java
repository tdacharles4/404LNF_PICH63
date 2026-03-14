package com.mixa.ecommerce.controller;

import com.mixa.ecommerce.model.Products;
import com.mixa.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/products") // http://localhost:8080/api/products
public class ProductsController {

    private final ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping
    public List<Products> getAllProducts(){
        return productsService.getAllProducts();
    }

    @GetMapping(path = "/{productId}")
    public Products getProductById(@PathVariable("productId")Long id){return productsService.getProductById(id);}

    @PostMapping
    public Products addProduct(@RequestBody Products product){
        return productsService.addProduct(product);
    };

    @DeleteMapping(path = "/{productId}")
    public Products deleteProduct(@PathVariable("productId")Long id){return productsService.deleteProductById(id);}

    @PutMapping(path = "/{productId}")
    public Products updateProduct(@PathVariable("productId")Long id, @RequestBody Products productUpdates){
        return productsService.updateProductById(id, productUpdates);
    }

}