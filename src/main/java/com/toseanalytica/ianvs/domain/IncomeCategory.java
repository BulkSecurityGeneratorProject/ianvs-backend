package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A IncomeCategory.
 */
@Entity
@Table(name = "income_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IncomeCategory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(mappedBy = "incomeCategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IncomeCapture> captureCategories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public IncomeCategory categoryName(String categoryName) {
        this.categoryName = categoryName;
        return this;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Set<IncomeCapture> getCaptureCategories() {
        return captureCategories;
    }

    public IncomeCategory captureCategories(Set<IncomeCapture> incomeCaptures) {
        this.captureCategories = incomeCaptures;
        return this;
    }

    public IncomeCategory addCaptureCategory(IncomeCapture incomeCapture) {
        this.captureCategories.add(incomeCapture);
        incomeCapture.setIncomeCategory(this);
        return this;
    }

    public IncomeCategory removeCaptureCategory(IncomeCapture incomeCapture) {
        this.captureCategories.remove(incomeCapture);
        incomeCapture.setIncomeCategory(null);
        return this;
    }

    public void setCaptureCategories(Set<IncomeCapture> incomeCaptures) {
        this.captureCategories = incomeCaptures;
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
        IncomeCategory incomeCategory = (IncomeCategory) o;
        if (incomeCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incomeCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IncomeCategory{" +
            "id=" + getId() +
            ", categoryName='" + getCategoryName() + "'" +
            "}";
    }
}
