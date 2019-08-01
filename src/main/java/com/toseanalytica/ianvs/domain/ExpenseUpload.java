package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ExpenseUpload.
 */
@Entity
@Table(name = "expense_upload")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpenseUpload implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    //@SequenceGenerator(name = "sequenceGenerator")
    @SequenceGenerator(name="expense_upload_seq",
        sequenceName="expense_upload_seq",
        allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
        generator="expense_upload_seq")
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "status_date")
    private Instant statusDate;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "accounting_date")
    private Instant accountingDate;

    @ManyToOne
    @JsonIgnoreProperties("uploadBranches")
    private Branch branch;

    @ManyToOne
    @JsonIgnoreProperties("uploadUser")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("expenseStatuses")
    private ExpenseStatus expenseStatus;

    @ManyToOne
    @JsonIgnoreProperties("fileTypes")
    private ExpenseCategory expenseCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public ExpenseUpload fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Instant getStatusDate() {
        return statusDate;
    }

    public ExpenseUpload statusDate(Instant statusDate) {
        this.statusDate = statusDate;
        return this;
    }

    public void setStatusDate(Instant statusDate) {
        this.statusDate = statusDate;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public ExpenseUpload photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public ExpenseUpload photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public ExpenseUpload dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getAccountingDate() {
        return accountingDate;
    }

    public ExpenseUpload accountingDate(Instant accountingDate) {
        this.accountingDate = accountingDate;
        return this;
    }

    public void setAccountingDate(Instant accountingDate) {
        this.accountingDate = accountingDate;
    }

    public Branch getBranch() {
        return branch;
    }

    public ExpenseUpload branch(Branch branch) {
        this.branch = branch;
        return this;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public ExpenseStatus getExpenseStatus() {
        return expenseStatus;
    }

    public ExpenseUpload expenseStatus(ExpenseStatus expenseStatus) {
        this.expenseStatus = expenseStatus;
        return this;
    }

    public void setExpenseStatus(ExpenseStatus expenseStatus) {
        this.expenseStatus = expenseStatus;
    }

    public ExpenseCategory getExpenseCategory() {
        return expenseCategory;
    }

    public ExpenseUpload expenseCategory(ExpenseCategory expenseCategory) {
        this.expenseCategory = expenseCategory;
        return this;
    }

    public void setExpenseCategory(ExpenseCategory expenseCategory) {
        this.expenseCategory = expenseCategory;
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
        ExpenseUpload expenseUpload = (ExpenseUpload) o;
        if (expenseUpload.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expenseUpload.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExpenseUpload{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", statusDate='" + getStatusDate() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", accountingDate='" + getAccountingDate() + "'" +
            "}";
    }
}
