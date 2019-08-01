package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IncomeDetails.
 */
@Entity
@Table(name = "income_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IncomeDetails implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "unit_price")
    private Float unitPrice;

    @Column(name = "quantity")
    private Float quantity;

    @Column(name = "total_vat")
    private Float totalVat;

    @Column(name = "total_price")
    private Float totalPrice;

    @ManyToOne
    @JsonIgnoreProperties("captureParents")
    private IncomeCapture incomeCapture;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public IncomeDetails itemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
        return this;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public IncomeDetails unitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getQuantity() {
        return quantity;
    }

    public IncomeDetails quantity(Float quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Float quantity) {
        this.quantity = quantity;
    }

    public Float getTotalVat() {
        return totalVat;
    }

    public IncomeDetails totalVat(Float totalVat) {
        this.totalVat = totalVat;
        return this;
    }

    public void setTotalVat(Float totalVat) {
        this.totalVat = totalVat;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public IncomeDetails totalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public IncomeCapture getIncomeCapture() {
        return incomeCapture;
    }

    public IncomeDetails incomeCapture(IncomeCapture incomeCapture) {
        this.incomeCapture = incomeCapture;
        return this;
    }

    public void setIncomeCapture(IncomeCapture incomeCapture) {
        this.incomeCapture = incomeCapture;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IncomeDetails incomeDetails = (IncomeDetails) o;
        if (incomeDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incomeDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IncomeDetails{" +
            "id=" + getId() +
            ", itemDescription='" + getItemDescription() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", quantity=" + getQuantity() +
            ", totalVat=" + getTotalVat() +
            ", totalPrice=" + getTotalPrice() +
            "}";
    }
}
