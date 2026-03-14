package com.mixa.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Products {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column private String sku;
    @Column(nullable = false) private String nombre;
    @Column(nullable = false, columnDefinition = "TEXT") private String descripcion;
    @Column(nullable = false) private Double precio;
    @Column(nullable = false) private Integer stock;
    @Column private String imagenes;
    @Column(nullable = false) private boolean activo = true;
    @Column(name = "categoria_id") private Integer categoria_id;
    @Column(name = "material_id") private Integer material_id;
    @Column(name = "estado_id") private Integer estado_id;

}