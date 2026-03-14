package com.mixa.ecommerce.service;

import com.mixa.ecommerce.model.Products;
import com.mixa.ecommerce.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {

    private final ProductsRepository productsRepository;

    @Autowired
    public ProductsService(ProductsRepository productsRepository){
        this.productsRepository=productsRepository;
    }

    public List<Products> getAllProducts() {return productsRepository.findAll();}

    public Products getProductById(Long Id){return productsRepository.findById(Id).orElseThrow(
            ()-> new IllegalArgumentException("No existe un producto para ese ID")
    );}

    public Products addProduct(Products product){return productsRepository.save(product);}

    public Products deleteProductById(Long id){
        // Inicializar la variable en null por precaucion, revisar si existe, retornar excepcion si no existe
        Products tmp = null;
        if(productsRepository.existsById(id)) throw new IllegalArgumentException("No existe un producto para ese ID");

        // Existe producto para ese id. Almacenar exterior y temporalmente, eliminar.
        tmp = productsRepository.findById(id).get();
        productsRepository.deleteById(id);

        // Mostrar el producto almacenado temporalmente para desplegar que fue lo que se elimino
        return tmp;
    }

    public Products updateProductById(Long id, Products productUpdates){
        Optional<Products> optionalProduct = productsRepository.findById(id);
        if(optionalProduct.isEmpty())throw new IllegalArgumentException("Nao nao");
        Products originalProduct = optionalProduct.get();

        if(productUpdates.getSku() != null) originalProduct.setSku(productUpdates.getSku());
        if(productUpdates.getNombre() != null) originalProduct.setNombre(productUpdates.getNombre());
        if(productUpdates.getDescripcion() != null) originalProduct.setDescripcion(productUpdates.getDescripcion());
        if(productUpdates.getPrecio() != null) originalProduct.setPrecio(productUpdates.getPrecio());
        if(productUpdates.getStock() != null) originalProduct.setStock(productUpdates.getStock());
        if(productUpdates.getCategoria_id()!=null)originalProduct.setCategoria_id(productUpdates.getCategoria_id());
        if(productUpdates.getImagenes() != null) originalProduct.setImagenes(productUpdates.getImagenes());
        if(productUpdates.getMaterial_id() != null) originalProduct.setMaterial_id(productUpdates.getMaterial_id());
        if(productUpdates.getEstado_id()!=null)originalProduct.setEstado_id(productUpdates.getEstado_id());

        return productsRepository.save(originalProduct);
    }

}