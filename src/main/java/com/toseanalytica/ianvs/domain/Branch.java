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
 * A Branch.
 */
@Entity
@Table(name = "branch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "address")
    private String address;

    @Column(name = "street")
    private String street;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "registration_date")
    private Instant registrationDate;

    @ManyToOne
    @JsonIgnoreProperties("branchTowns")
    private Town town;

    @ManyToOne
    @JsonIgnoreProperties("branchCompanies")
    private Company company;

    @OneToMany(mappedBy = "branch")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExpenseUpload> uploadBranches = new HashSet<>();
    @OneToMany(mappedBy = "branch")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IncomeCapture> captureBranches = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("branchStatuses")
    private BranchStatus branchStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranchName() {
        return branchName;
    }

    public Branch branchName(String branchName) {
        this.branchName = branchName;
        return this;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getAddress() {
        return address;
    }

    public Branch address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStreet() {
        return street;
    }

    public Branch street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getEmail() {
        return email;
    }

    public Branch email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public Branch mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public Branch registrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Town getTown() {
        return town;
    }

    public Branch town(Town town) {
        this.town = town;
        return this;
    }

    public void setTown(Town town) {
        this.town = town;
    }

    public Company getCompany() {
        return company;
    }

    public Branch company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<ExpenseUpload> getUploadBranches() {
        return uploadBranches;
    }

    public Branch uploadBranches(Set<ExpenseUpload> expenseUploads) {
        this.uploadBranches = expenseUploads;
        return this;
    }

    public Branch addUploadBranch(ExpenseUpload expenseUpload) {
        this.uploadBranches.add(expenseUpload);
        expenseUpload.setBranch(this);
        return this;
    }

    public Branch removeUploadBranch(ExpenseUpload expenseUpload) {
        this.uploadBranches.remove(expenseUpload);
        expenseUpload.setBranch(null);
        return this;
    }

    public void setUploadBranches(Set<ExpenseUpload> expenseUploads) {
        this.uploadBranches = expenseUploads;
    }

    public Set<IncomeCapture> getCaptureBranches() {
        return captureBranches;
    }

    public Branch captureBranches(Set<IncomeCapture> incomeCaptures) {
        this.captureBranches = incomeCaptures;
        return this;
    }

    public Branch addCaptureBranch(IncomeCapture incomeCapture) {
        this.captureBranches.add(incomeCapture);
        incomeCapture.setBranch(this);
        return this;
    }

    public Branch removeCaptureBranch(IncomeCapture incomeCapture) {
        this.captureBranches.remove(incomeCapture);
        incomeCapture.setBranch(null);
        return this;
    }

    public void setCaptureBranches(Set<IncomeCapture> incomeCaptures) {
        this.captureBranches = incomeCaptures;
    }

    public BranchStatus getBranchStatus() {
        return branchStatus;
    }

    public Branch branchStatus(BranchStatus branchStatus) {
        this.branchStatus = branchStatus;
        return this;
    }

    public void setBranchStatus(BranchStatus branchStatus) {
        this.branchStatus = branchStatus;
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
        Branch branch = (Branch) o;
        if (branch.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), branch.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Branch{" +
            "id=" + getId() +
            ", branchName='" + getBranchName() + "'" +
            ", address='" + getAddress() + "'" +
            ", street='" + getStreet() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            "}";
    }
}
