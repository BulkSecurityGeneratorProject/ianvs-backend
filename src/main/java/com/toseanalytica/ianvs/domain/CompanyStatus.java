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
 * A CompanyStatus.
 */
@Entity
@Table(name = "company_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CompanyStatus implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company_status")
    private String companyStatus;

    @OneToMany(mappedBy = "companyStatus")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Company> companyStatuses = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyStatus() {
        return companyStatus;
    }

    public CompanyStatus companyStatus(String companyStatus) {
        this.companyStatus = companyStatus;
        return this;
    }

    public void setCompanyStatus(String companyStatus) {
        this.companyStatus = companyStatus;
    }

    public Set<Company> getCompanyStatuses() {
        return companyStatuses;
    }

    public CompanyStatus companyStatuses(Set<Company> companies) {
        this.companyStatuses = companies;
        return this;
    }

    public CompanyStatus addCompanyStatus(Company company) {
        this.companyStatuses.add(company);
        company.setCompanyStatus(this);
        return this;
    }

    public CompanyStatus removeCompanyStatus(Company company) {
        this.companyStatuses.remove(company);
        company.setCompanyStatus(null);
        return this;
    }

    public void setCompanyStatuses(Set<Company> companies) {
        this.companyStatuses = companies;
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
        CompanyStatus companyStatus = (CompanyStatus) o;
        if (companyStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyStatus{" +
            "id=" + getId() +
            ", companyStatus='" + getCompanyStatus() + "'" +
            "}";
    }
}
