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
 * A IncomeCapture.
 */
@Entity
@Table(name = "income_capture")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IncomeCapture implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sales_code")
    private String salesCode;

    @Column(name = "document_date")
    private Instant documentDate;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "customer_mobile")
    private String customerMobile;

    @Column(name = "customer_address")
    private String customerAddress;

    @Column(name = "date_uploaded")
    private Instant dateUploaded;

    @ManyToOne
    @JsonIgnoreProperties("captureBranches")
    private Branch branch;

    @OneToMany(mappedBy = "incomeCapture")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IncomeDetails> captureParents = new HashSet<>();
    @OneToMany(mappedBy = "incomeCapture")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IncomePayments> incomePayments = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("captureCategories")
    private IncomeCategory incomeCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSalesCode() {
        return salesCode;
    }

    public IncomeCapture salesCode(String salesCode) {
        this.salesCode = salesCode;
        return this;
    }

    public void setSalesCode(String salesCode) {
        this.salesCode = salesCode;
    }

    public Instant getDocumentDate() {
        return documentDate;
    }

    public IncomeCapture documentDate(Instant documentDate) {
        this.documentDate = documentDate;
        return this;
    }

    public void setDocumentDate(Instant documentDate) {
        this.documentDate = documentDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public IncomeCapture customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public IncomeCapture customerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
        return this;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerMobile() {
        return customerMobile;
    }

    public IncomeCapture customerMobile(String customerMobile) {
        this.customerMobile = customerMobile;
        return this;
    }

    public void setCustomerMobile(String customerMobile) {
        this.customerMobile = customerMobile;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public IncomeCapture customerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
        return this;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public Instant getDateUploaded() {
        return dateUploaded;
    }

    public IncomeCapture dateUploaded(Instant dateUploaded) {
        this.dateUploaded = dateUploaded;
        return this;
    }

    public void setDateUploaded(Instant dateUploaded) {
        this.dateUploaded = dateUploaded;
    }

    public Branch getBranch() {
        return branch;
    }

    public IncomeCapture branch(Branch branch) {
        this.branch = branch;
        return this;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public Set<IncomeDetails> getCaptureParents() {
        return captureParents;
    }

    public IncomeCapture captureParents(Set<IncomeDetails> incomeDetails) {
        this.captureParents = incomeDetails;
        return this;
    }

    public IncomeCapture addCaptureParent(IncomeDetails incomeDetails) {
        this.captureParents.add(incomeDetails);
        incomeDetails.setIncomeCapture(this);
        return this;
    }

    public IncomeCapture removeCaptureParent(IncomeDetails incomeDetails) {
        this.captureParents.remove(incomeDetails);
        incomeDetails.setIncomeCapture(null);
        return this;
    }

    public void setCaptureParents(Set<IncomeDetails> incomeDetails) {
        this.captureParents = incomeDetails;
    }

    public Set<IncomePayments> getIncomePayments() {
        return incomePayments;
    }

    public IncomeCapture incomePayments(Set<IncomePayments> incomePayments) {
        this.incomePayments = incomePayments;
        return this;
    }

    public IncomeCapture addIncomePayments(IncomePayments incomePayments) {
        this.incomePayments.add(incomePayments);
        incomePayments.setIncomeCapture(this);
        return this;
    }

    public IncomeCapture removeIncomePayments(IncomePayments incomePayments) {
        this.incomePayments.remove(incomePayments);
        incomePayments.setIncomeCapture(null);
        return this;
    }

    public void setIncomePayments(Set<IncomePayments> incomePayments) {
        this.incomePayments = incomePayments;
    }

    public IncomeCategory getIncomeCategory() {
        return incomeCategory;
    }

    public IncomeCapture incomeCategory(IncomeCategory incomeCategory) {
        this.incomeCategory = incomeCategory;
        return this;
    }

    public void setIncomeCategory(IncomeCategory incomeCategory) {
        this.incomeCategory = incomeCategory;
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
        IncomeCapture incomeCapture = (IncomeCapture) o;
        if (incomeCapture.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incomeCapture.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IncomeCapture{" +
            "id=" + getId() +
            ", salesCode='" + getSalesCode() + "'" +
            ", documentDate='" + getDocumentDate() + "'" +
            ", customerName='" + getCustomerName() + "'" +
            ", customerEmail='" + getCustomerEmail() + "'" +
            ", customerMobile='" + getCustomerMobile() + "'" +
            ", customerAddress='" + getCustomerAddress() + "'" +
            ", dateUploaded='" + getDateUploaded() + "'" +
            "}";
    }
}
