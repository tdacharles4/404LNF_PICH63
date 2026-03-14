package com.mixa.ecommerce.configuration;

import com.mixa.ecommerce.model.ProductStatus;
import com.mixa.ecommerce.model.Products;
import com.mixa.ecommerce.repository.ProductsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductsRepository productsRepository;

    public DataSeeder(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public void run(String... args) throws Exception{
        if (productsRepository.count()==0){
            System.out.println("Tabla productos vacio. Populando...");
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = DataSeeder.class.getResourceAsStream("/static/data/products.json");
            try{
                DataJson data = objectMapper.readValue(inputStream, DataJson.class);
                List<Products> productsToSave = new ArrayList<>();
                for (ProductJson p : data.catalogo.productos) {
                    Products product = new Products();


                    product.setNombre(p.nombre);
                    product.setDescripcion(p.descripcion);
                    product.setPrecio(p.precio); // Using Double, as requested
                    product.setStock(p.stock);
                    product.setImagenes(p.imagenes);
                    product.setSku(p.sku);
                    product.setActivo(p.activo);
                    product.setCategoria_id(p.categoria_id);
                    product.setMaterial_id(p.material_id);
                    product.setEstado_id(p.estado_id);

                    productsToSave.add(product);
                }
                productsRepository.saveAll(productsToSave);
                System.out.println(productsToSave.size() + " products have been successfully seeded!");
            } catch (Exception e){
                System.out.println("No se pudo jefe: " + e.getMessage());
            }
        } else{System.out.println("Tabla productos populada. No se correra el script.");}
    }
    private static class ProductJson {
        public int id;
        public String sku;
        public String nombre;
        public String descripcion;
        public double precio;
        public int stock;
        public int categoria_id;
        public String imagenes;
        public boolean activo;
        public int material_id;
        public int estado_id;
    }
    private static class CatalogoJson { public List<ProductJson> productos; }
    private static class DataJson { public CatalogoJson catalogo; }
}