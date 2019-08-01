package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company")
    private String company;

    @Column(name = "company_code")
    private String companyCode;

    @Column(name = "pin")
    private String pin;

    @Column(name = "registration_date")
    private Instant registrationDate;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Branch> branchCompanies = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("companyCategories")
    private CompanyCategory companyCategory;

    @ManyToOne
    @JsonIgnoreProperties("companyStatuses")
    private CompanyStatus companyStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public Company company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public Company companyCode(String companyCode) {
        this.companyCode = companyCode;
        return this;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPin() {
        return pin;
    }

    public Company pin(String pin) {
        this.pin = pin;
        return this;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public Company registrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Set<Branch> getBranchCompanies() {
        return branchCompanies;
    }

    public Company branchCompanies(Set<Branch> branches) {
        this.branchCompanies = branches;
        return this;
    }

    public Company addBranchCompany(Branch branch) {
        this.branchCompanies.add(branch);
        branch.setCompany(this);
        return this;
    }

    public Company removeBranchCompany(Branch branch) {
        this.branchCompanies.remove(branch);
        branch.setCompany(null);
        return this;
    }

    public void setBranchCompanies(Set<Branch> branches) {
        this.branchCompanies = branches;
    }

    public CompanyCategory getCompanyCategory() {
        return companyCategory;
    }

    public Company companyCategory(CompanyCategory companyCategory) {
        this.companyCategory = companyCategory;
        return this;
    }

    public void setCompanyCategory(CompanyCategory companyCategory) {
        this.companyCategory = companyCategory;
    }

    public CompanyStatus getCompanyStatus() {
        return companyStatus;
    }

    public Company companyStatus(CompanyStatus companyStatus) {
        this.companyStatus = companyStatus;
        return this;
    }

    public void setCompanyStatus(CompanyStatus companyStatus) {
        this.companyStatus = companyStatus;
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
        Company company = (Company) o;
        if (company.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), company.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", company='" + getCompany() + "'" +
            ", companyCode='" + getCompanyCode() + "'" +
            ", pin='" + getPin() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            "}";
    }
}
