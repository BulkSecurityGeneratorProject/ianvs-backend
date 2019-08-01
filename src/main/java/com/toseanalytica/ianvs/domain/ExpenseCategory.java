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
 * A ExpenseCategory.
 */
@Entity
@Table(name = "expense_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpenseCategory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "expense_category")
    private String expenseCategory;

    @OneToMany(mappedBy = "expenseCategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExpenseUpload> fileTypes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpenseCategory() {
        return expenseCategory;
    }

    public ExpenseCategory expenseCategory(String expenseCategory) {
        this.expenseCategory = expenseCategory;
        return this;
    }

    public void setExpenseCategory(String expenseCategory) {
        this.expenseCategory = expenseCategory;
    }

    public Set<ExpenseUpload> getFileTypes() {
        return fileTypes;
    }

    public ExpenseCategory fileTypes(Set<ExpenseUpload> expenseUploads) {
        this.fileTypes = expenseUploads;
        return this;
    }

    public ExpenseCategory addFileType(ExpenseUpload expenseUpload) {
        this.fileTypes.add(expenseUpload);
        expenseUpload.setExpenseCategory(this);
        return this;
    }

    public ExpenseCategory removeFileType(ExpenseUpload expenseUpload) {
        this.fileTypes.remove(expenseUpload);
        expenseUpload.setExpenseCategory(null);
        return this;
    }

    public void setFileTypes(Set<ExpenseUpload> expenseUploads) {
        this.fileTypes = expenseUploads;
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
        ExpenseCategory expenseCategory = (ExpenseCategory) o;
        if (expenseCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expenseCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExpenseCategory{" +
            "id=" + getId() +
            ", expenseCategory='" + getExpenseCategory() + "'" +
            "}";
    }
}
