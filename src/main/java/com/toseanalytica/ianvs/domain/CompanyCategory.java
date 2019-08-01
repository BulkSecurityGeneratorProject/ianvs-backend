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
 * A CompanyCategory.
 */
@Entity
@Table(name = "company_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CompanyCategory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company_category")
    private String companyCategory;

    @OneToMany(mappedBy = "companyCategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Company> companyCategories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyCategory() {
        return companyCategory;
    }

    public CompanyCategory companyCategory(String companyCategory) {
        this.companyCategory = companyCategory;
        return this;
    }

    public void setCompanyCategory(String companyCategory) {
        this.companyCategory = companyCategory;
    }

    public Set<Company> getCompanyCategories() {
        return companyCategories;
    }

    public CompanyCategory companyCategories(Set<Company> companies) {
        this.companyCategories = companies;
        return this;
    }

    public CompanyCategory addCompanyCategory(Company company) {
        this.companyCategories.add(company);
        company.setCompanyCategory(this);
        return this;
    }

    public CompanyCategory removeCompanyCategory(Company company) {
        this.companyCategories.remove(company);
        company.setCompanyCategory(null);
        return this;
    }

    public void setCompanyCategories(Set<Company> companies) {
        this.companyCategories = companies;
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
        CompanyCategory companyCategory = (CompanyCategory) o;
        if (companyCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyCategory{" +
            "id=" + getId() +
            ", companyCategory='" + getCompanyCategory() + "'" +
            "}";
    }
}
